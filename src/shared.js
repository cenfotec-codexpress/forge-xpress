import { fakerES as faker } from "@faker-js/faker";

export const generateObjectId = () => {
  return faker.database.mongodbObjectId();
};

export const generateEmail = () => {
  return faker.internet.email().toLowerCase();
};

export const generatePhoneNumber = () => {
  return faker.number.int({ min: 80000000, max: 89999999 });
};

export const generateRandomLocalAddress = () => {
  const addresses = [
    "San José, San José, Costa Rica",
    "Escazú, San José, Costa Rica",
    "Desamparados, San José, Costa Rica",
    "Alajuela, Alajuela, Costa Rica",
    "Cartago, Cartago, Costa Rica",
    "Heredia, Heredia, Costa Rica",
    "Liberia, Guanacaste, Costa Rica",
    "Nicoya, Guanacaste, Costa Rica",
    "Puntarenas, Puntarenas, Costa Rica",
    "Quepos, Puntarenas, Costa Rica",
    "Limón, Limón, Costa Rica",
    "Cahuita, Limón, Costa Rica",
  ];

  return faker.helpers.arrayElement(addresses);
};
