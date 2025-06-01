import config from "@config/config";
import { basePrisma } from "@initialization/index";
import { NewUserConfig, SignInUserDto } from "@typesDef/models/user";

export const createUser = async (user: NewUserConfig) => {
  return basePrisma.user.create({
    data: {
      username: user.username,
      email: user.email,
      password: await getEncryptedPassword(user.password),
    },
  });
};

export const findUserById = (id: number) => {
  return basePrisma.user.findUnique({
    where: {
      id: id,
    },
  });
};
export const findUserByEmail = (email: string) => {
  return basePrisma.user.findUnique({
    where: {
      email: email,
    },
  });
};

export const updateUserPassword = async (id: number, newPassword: string) => {
  return basePrisma.user.update({
    where: {
      id: id,
    },
    data: {
      password: await getEncryptedPassword(newPassword),
    },
  });
};

export const validateUser = async (user: SignInUserDto) => {
  const dbUSer = await findUserByEmail(user.email);
  if (!dbUSer) throw new Error("User not found");
  const isPasswordValid = await compareEncryptedPassword(
    user.password,
    dbUSer.password,
  );
  if (!isPasswordValid) throw new Error("Incorrect password");
  return dbUSer;
};

export const registerUser = async (user: NewUserConfig) => {
  const dbUSer = await findUserByEmail(user.email);
  if (dbUSer) throw new Error("User already exists");
  return createUser(user);
};

export const getEncryptedPassword = (password: string) => {
  return Bun.password.hash(password, {
    algorithm: "bcrypt",
    cost: config.get("baseDB.passwordSaltRounds"),
  });
};

const compareEncryptedPassword = (password: string, passwordHash: string) => {
  return Bun.password.verify(password, passwordHash);
};
export const compareEncryptedPasswords = (id: number, password: string) => {
  return basePrisma.user
    .findUnique({
      where: {
        id: id,
      },
      select: {
        password: true,
      },
    })
    .then((user) => {
      if (!user) return false;
      return compareEncryptedPassword(password, user.password);
    });
};
