import { t } from "elysia";

import { ObjectifyFlattenedProperties } from "@config/config.service";
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
    const image = formData.get("image") as File;
    const imageName = formData.get("imageName");
    const name = formData.get("name");
    const description = formData.get("description");
    const entryPoint = formData.get("entryPoint");
    const userId = set.headers["x-user-id"];
    const jobs = formData.get("jobs")?.toString()?.split(",")?.map(Number);
    return savePublicImage({
      filename: imageName,
      data: await image.arrayBuffer(),
      unique: true,
    })
      .then((fullSavedImagePath) => {
        return addNotificationService({
          name,
          description,
          entryPoint,
          image: fullSavedImagePath,
        });
      })
      .then((savedData) => attachAServiceToJob(jobs, savedData.id))
      .then(() => InitializeServiceConfig(name, entryPoint, userId));
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
    const image = formData.get("image") as File;
    const id = formData.get("id");
    const imageName = formData.get("imageName");
    const name = formData.get("name");
    const description = formData.get("description");
    const entryPoint = formData.get("entryPoint");
    const jobs = formData.get("jobs")?.split(",")?.map(Number);

    if (!id) {
      throw new Error("service id is required");
    }
    const updateObject = {} as any;
    updateObject["name"] = name;
    updateObject["id"] = Number(id);
    updateObject["description"] = description;
    updateObject["entryPoint"] = entryPoint;

    if (image) {
      updateObject["image"] = await savePublicImage({
        filename: imageName,
        data: await image.arrayBuffer(),
      });
      const targetService = await getNotificationService(Number(id));
      if (targetService?.image) {
        await deletePublicImage({
          filename: targetService.image,
        });
      }
    }

    return updateNotificationService(updateObject).then((savedData) => {
      if (jobs?.length) {
        return attachAServiceToJob(jobs, savedData.id);
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
        id: t.String(),
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
