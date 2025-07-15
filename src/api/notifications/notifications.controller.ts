import { t } from "elysia";

import {
  addNotificationService,
  attachAServiceToJob,
  deleteNotificationService,
  detachServiceFromAllJobs,
  getAllJobsForAService,
  getAllNotificationServices,
  getAvailableExternalServices,
  getNotificationService,
  updateNotificationService,
} from "@repositories/notificationServices";
import { createElysia } from "@utils/createElysia";
import { deletePublicImage, savePublicImage } from "@utils/fileUtils";
import qs from "qs";

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
  .post("/addNotificationService", async ({ request }) => {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const imageName = formData.get("imageName");
    const name = formData.get("name");
    const description = formData.get("description");
    const entryPoint = formData.get("entryPoint");
    const jobs = formData.get("jobs")?.split(",")?.map(Number);
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
      .then((savedData) => {
        attachAServiceToJob(jobs, savedData.id);
      });
  })
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
  .delete("/deleteNotificationService", async ({ query }) => {
    const { id } = query;
    await detachServiceFromAllJobs(Number(id));
    return deleteNotificationService(Number(id));
  })
  .post("/attachServiceToJob", async ({ body }) => {
    const { jobId, serviceId } = body;
    await attachAServiceToJob(jobId, serviceId);
    return true;
  })
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
