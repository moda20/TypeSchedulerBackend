import { t } from "elysia";

import { ObjectifyFlattenedProperties } from "@config/config.service";
import { basePrisma } from "@initialization/index";
import { getAllConfigs } from "@repositories/configs";
import {
  addNotificationService,
  attachAServiceToJob,
  deleteNotificationService,
  detachServiceFromAllJobs,
  getAllJobsForAService,
  getAllNotificationServices,
  getAvailableExternalServices,
  getNotificationService,
  InitializeServiceConfig,
  safeUpdateServiceConfig,
  updateNotificationService,
  validateInputConfigAgainstSchema,
} from "@repositories/notificationServices";
import {
  notificationCreationSchema,
  notificationUpdateSchema,
} from "@typesDef/notifications";
import { createElysia } from "@utils/createElysia";
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
      const { limit, offset } = query;
      return getAllNotificationServices({ limit, offset });
    },
    {
      query: t.Object({
        limit: t.Optional(t.Number()),
        offset: t.Optional(t.Number()),
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
        throw new Error(`Service ${inputValues.name} already exists`);
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
  );
