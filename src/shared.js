import { fakerES as faker } from "@faker-js/faker";

export const generateObjectId = () => {
  return faker.database.mongodbObjectId();
};

export const generateEmail = () => {
  return faker.internet.email().toLowerCase();
};
