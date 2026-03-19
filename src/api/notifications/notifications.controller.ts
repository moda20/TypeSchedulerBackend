import { t } from "elysia";

import { ObjectifyFlattenedProperties } from "@config/config.service";
import { basePrisma } from "@initialization/index";
import { getAllConfigs } from "@repositories/configs";
import {
  addNotificationService,
  addOrUpdateGlobalEventHandler,
  addOrUpdateJobEventHandler,
  attachAServiceToJob,
  cloneNotificationService,
  deleteGlobalEventHandler,
  deleteJobEventHandler,
  deleteNotificationService,
  detachServiceFromAllJobs,
  getAllGlobalEventHandlers,
  getAllJobsForAService,
  getAllNotificationServices,
  getAvailableExternalServices,
  getNotificationService,
  InitializeServiceConfig,
  safeUpdateServiceConfig,
  updateNotificationService,
  validateInputConfigAgainstSchema,
  verifyIfNotificationServiceCanBeDeleted,
} from "@repositories/notificationServices";
import {
  jobEventNotificationConfigAPISchema,
  notificationCreationSchema,
  notificationUpdateSchema,
} from "@typesDef/notifications";
import { createElysia } from "@utils/createElysia";
import { APIError } from "@utils/ErrorHandler";
import { deletePublicImage, savePublicImage } from "@utils/fileUtils";
import qs from "qs";
import { z } from "zod";

export const notificationsController = createElysia({
  prefix: "/notifications",
})
  .onBeforeHandle(({ set, path }) => {
    if (!path?.toLowerCase().includes("download")) {
      set.headers["content-type"] = "application/json; charset=utf-8";
    }
  })
  .onTransform((ctx) => {
    // @ts-ignore
    ctx.query = qs.parse(new URL(ctx.request.url).search.slice(1));
  })
  .get(
    "/allNotifications",
    ({ query }) => {
      const { limit, offset, inputIds } = query;
      return getAllNotificationServices({ limit, offset, inputIds });
    },
    {
      query: t.Object({
        limit: t.Optional(t.Number()),
        offset: t.Optional(t.Number()),
        inputIds: t.Optional(t.Array(t.Number())),
      }),
    },
  )
  .get("/allExternalFiles", () => {
    return getAvailableExternalServices();
  })
  .post("/addNotificationService", async ({ request, set }) => {
    const formData = await request.formData();
    const userId = set.headers["x-user-id"];
    const inputValues = notificationCreationSchema.parse(
      Object.fromEntries(formData.entries()),
    );
    const existingNotificationService = await getNotificationService(
      0,
      inputValues.name,
    );
    return basePrisma.$transaction(async (tx) => {
      if (existingNotificationService) {
        throw new APIError(`Service ${inputValues.name} already exists`);
      }
      const fullSavedImagePath = inputValues.image
        ? await savePublicImage({
            filename: inputValues.imageName,
            data: await inputValues.image?.arrayBuffer(),
            unique: true,
          })
        : undefined;

      return addNotificationService(
        {
          name: inputValues.name,
          description: inputValues.description,
          entryPoint: inputValues.entryPoint,
          image: fullSavedImagePath,
        },
        tx,
      )
        .then((savedData) => {
          if (inputValues.jobs?.length) {
            return attachAServiceToJob(inputValues.jobs, savedData.id, tx);
          }
        })
        .then(() =>
          InitializeServiceConfig(
            inputValues.name,
            inputValues.entryPoint,
            Number(userId),
          ),
        );
    });
  })
  .post(
    "/cloneNotificationService",
    async ({ body, set }) => {
      const { serviceId, name } = body;
      const userId = set.headers["x-user-id"];
      return cloneNotificationService(serviceId, name, Number(userId));
    },
    {
      body: t.Object({
        serviceId: t.Number(),
        name: t.String(),
      }),
    },
  )
  .put(
    "/updateNotificationServiceConfig",
    async ({ body, set }) => {
      const userId = set.headers["x-user-id"];
      const { name, config } = body;
      const service = await getNotificationService(0, name);
      if (!service) {
        throw new Error(`Service ${name} not found`);
      }
      const isValidConfig = validateInputConfigAgainstSchema(
        service.entryPoint,
        config,
        "",
      );
      if (!isValidConfig.success) {
        return Response.json(
          {
            errors: z.treeifyError(isValidConfig.error),
          },
          {
            status: 400,
          },
        );
      }

      return await safeUpdateServiceConfig(
        config,
        service.name,
        Number(userId),
        false,
      );
    },
    {
      body: t.Object({
        name: t.String(),
        config: t.Record(
          t.String(),
          t.Object(
            {
              value: t.String(),
            },
            {
              additionalProperties: false,
            },
          ),
        ),
      }),
    },
  )
  .get(
    "/getNotificationServiceConfigurations",
    async ({ query }) => {
      const { name } = query;
      const rawConfig = await getAllConfigs(
        undefined,
        undefined,
        undefined,
        `notifications_${name}`,
        true,
      );
      if (!rawConfig.length) throw new Error(`Service ${name} not found`);
      return ObjectifyFlattenedProperties(
        rawConfig.reduce(
          (p, c) => {
            p[c.key] = {
              value: c.value,
              is_encrypted: c.is_encrypted,
            };
            return p;
          },
          {} as { [key: string]: { value: any; is_encrypted: boolean } },
        ),
      );
    },
    {
      query: t.Object(
        {
          name: t.String(),
        },
        {
          additionalProperties: true,
        },
      ),
    },
  )
  .put("/updateNotificationService", async ({ request }) => {
    const formData = await request.formData();
    const inputValues = notificationUpdateSchema.parse(
      Object.fromEntries(formData.entries()),
    );

    if (!inputValues.id) {
      throw new Error("service id is required");
    }
    const updateObject = {} as any;
    updateObject["name"] = inputValues.name;
    updateObject["id"] = inputValues.id;
    updateObject["description"] = inputValues.description;
    updateObject["entryPoint"] = inputValues.entryPoint;

    if (inputValues.image) {
      updateObject["image"] = await savePublicImage({
        filename: inputValues.imageName,
        data: await inputValues.image?.arrayBuffer(),
        unique: true,
      });
      const targetService = await getNotificationService(inputValues.id);
      if (targetService?.image) {
        await deletePublicImage({
          filename: targetService.image,
        });
      }
    }

    return updateNotificationService(updateObject).then((savedData) => {
      if (inputValues?.jobs?.length) {
        return attachAServiceToJob(inputValues.jobs, savedData.id);
      }
    });
  })
  .delete(
    "/deleteNotificationService",
    async ({ query }) => {
      const { id } = query;
      await verifyIfNotificationServiceCanBeDeleted(Number(id));
      await detachServiceFromAllJobs(Number(id));
      return deleteNotificationService(Number(id));
    },
    {
      query: t.Object({
        id: t.Number(),
      }),
    },
  )
  .post(
    "/attachServiceToJob",
    async ({ body }) => {
      const { jobId, serviceId } = body;
      await attachAServiceToJob(jobId, serviceId);
      return true;
    },
    {
      body: t.Object({
        jobId: t.Union([t.Number(), t.Array(t.Number())]),
        serviceId: t.Union([t.Number(), t.Array(t.Number())]),
      }),
    },
  )
  .get(
    "/getAttachedJobs",
    async ({ query }) => {
      const { serviceId } = query;
      return getAllJobsForAService(Number(serviceId));
    },
    {
      query: t.Object({
        serviceId: t.Number(),
      }),
    },
  )
  .post(
    "/updateJobEventHandlers",
    ({ body }) => {
      return addOrUpdateJobEventHandler({
        handler: body.handler,
        jobId: body.jobId,
      });
    },
    {
      body: z.object({
        handler: jobEventNotificationConfigAPISchema,
        jobId: z.number({ message: "job id is required" }),
      }),
    },
  )
  .delete(
    "/deleteJobEventHandler",
    ({ query }) => {
      const { jobId, configId } = query;
      return deleteJobEventHandler({
        configId,
        jobId,
      });
    },
    {
      query: z.object({
        jobId: z.coerce.number({ message: "job id is required" }),
        configId: z.string({ message: "config id is required" }),
      }),
    },
  )
  .get("/globalEventHandlers", () => {
    return getAllGlobalEventHandlers();
  })
  .put(
    "/updateGlobalHandlers",
    ({ body, set }) => {
      const { configId, handler } = body;
      const userId = set.headers["x-user-id"];
      return addOrUpdateGlobalEventHandler({
        configId,
        handler,
        userId: Number(userId),
      });
    },
    {
      body: z.object({
        configId: z.string().optional(),
        handler: jobEventNotificationConfigAPISchema,
      }),
    },
  )
  .delete(
    "/deleteGlobalHandlers",
    ({ query, set }) => {
      const { configId } = query;
      const userId = set.headers["x-user-id"];
      return deleteGlobalEventHandler({ configId, userId: Number(userId) });
    },
    {
      query: z.object({
        configId: z.string({ message: "config id is required" }),
      }),
    },
  );
