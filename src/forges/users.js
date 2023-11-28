import { fakerES as faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import {
  generateEmail,
  generateObjectId,
  generatePhoneNumber,
  generateRandomLocalAddress,
} from "../shared.js";

export default class UserForge {
  static async create() {
    const { salt, hash } = await this.generateHashAndSalt();

    return {
      _id: { $oid: generateObjectId() },
      identification: this.generateNationalLikeId(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dateOfBirth: {
        $date: {
          $numberLong: this.generateDateOfBirth(),
        },
      },
      email: generateEmail(),
      passwordHash: hash,
      passwordSalt: salt,
      homeAddress: generateRandomLocalAddress(),
      phoneNumber: {
        $numberInt: generatePhoneNumber(),
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

  static generateDateOfBirth() {
    return faker.date
      .between({ from: "1950-01-01", to: "2003-12-31" })
      .getTime()
      .toString();
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
}
