import { fakerES as faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { generateEmail, generateObjectId } from "../shared.js";

export default class UserForge {
  static async create() {
    const { salt, hash } = await this.generateHashAndSalt();

    return {
      _id: { $oid: generateObjectId() },
      identification: this.generateNationalLikeId(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dateOfBirth: faker.date.birthdate().getTime().toString(),
      email: generateEmail(),
      passwordHash: hash,
      passwordSalt: salt,
      homeAddress: this.generateRandomLocalAddress(),
      phoneNumber: {
        $numberInt: faker.number.int({ min: 80000000, max: 89999999 }),
      },
      role: "Traveler",
      paymentMethods: this.generateRandomPaymentMethods(),
      reservations: [],
    };
  }

  static async generateHashAndSalt() {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash("user@123", salt);

    return {
      salt,
      hash,
    };
  }

  static generateRandomPaymentMethods() {
    const paymentTypes = ["CREDIT_CARD", "PAYPAL", "BOTH", "NONE"];
    const randomType = faker.helpers.arrayElement(paymentTypes);
    const paymentMethods = [];

    if (randomType === "CREDIT_CARD" || randomType === "BOTH") {
      paymentMethods.push({
        _id: { $oid: generateObjectId() },
        type: "Tarjeta de crédito",
        details: "**** **** **** " + faker.number.int({ min: 1000, max: 9999 }),
      });
    }

    if (randomType === "PAYPAL" || randomType === "BOTH") {
      paymentMethods.push({
        _id: { $oid: generateObjectId() },
        type: "PayPal",
        details: generateEmail(),
      });
    }

    return paymentMethods;
  }

  static generateNationalLikeId() {
    return `${faker.number.int({
      min: 1,
      max: 9,
    })}0${faker.number.int({ min: 100, max: 999 })}0${faker.number.int({
      min: 100,
      max: 999,
    })}`;
  }

  static generateRandomLocalAddress() {
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
  }
}
