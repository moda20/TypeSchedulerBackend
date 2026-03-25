import bun from "bun";
import { promises } from "fs";
import { join, parse, resolve, sep } from "path";

export const saveToPublicFolder = async ({
  filename,
  data,
}: {
  filename: string;
  data: any;
}) => {
  const fullPath = resolveFilePath(join("..", "public", filename));
  const targetPath = join("public", filename);
  return promises.writeFile(fullPath, data).then(() => targetPath);
};

export const savePublicImage = ({
  filename,
  data,
  unique,
}: {
  filename: string;
  data: any;
  unique?: boolean;
}) => {
  let sanitizedFileName = filename.replace(/\s/g, "");
  if (unique) {
    const parsedFileName = parse(sanitizedFileName);
    sanitizedFileName = `${parsedFileName.name}_${Date.now()}${parsedFileName.ext}`;
  }
  return saveToPublicFolder({
    filename: join("/images", sanitizedFileName),
    data,
  });
};
export const deletePublicImage = async ({ filename }: { filename: string }) => {
  const targetFileName = filename.split("/").pop();
  if (targetFileName) {
    const targetPath = join(
      __dirname,
      "../..",
      "public/images",
      targetFileName,
    );
    return promises.rm(targetPath);
  }

  return Promise.reject("no file found");
};

// resolve file path from the src folder
export const resolveFilePath = (filePath: string) => {
  const srcRoot = resolve(parse(bun.main).dir);
  const root = join(srcRoot, "..");
  const fullPath = resolve(srcRoot, filePath);
  if (!fullPath.startsWith(root + sep)) {
    throw new Error("Invalid file path");
  }
  return fullPath;
};
