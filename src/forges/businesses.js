import { fakerES as faker } from "@faker-js/faker";
import BUSINESS_OWNER_IDS from "../base/business-owners.json" assert { type: "json" };
import CATEGORY_IDS from "../base/categories.json" assert { type: "json" };
import {
  generateObjectId,
  generatePhoneNumber,
  generateRandomLocalAddress,
} from "../shared.js";

export default class BusinessForge {
  static async create() {
    return {
      _id: { $oid: generateObjectId() },
      name: faker.company.name(),
      owner: { $oid: this.getRandomOwnerId() },
      address: generateRandomLocalAddress(),
      categories: this.getRandomCategoryIds().map((id) => ({ $oid: id })),
      description: faker.lorem.paragraph(),
      images: [],
      isApproved: faker.datatype.boolean(),
      phoneNumber: { $numberInt: generatePhoneNumber() },
      price: {
        $numberDouble: faker.number.float({
          min: 5000,
          max: 20000,
          precision: 2,
        }),
      },
      reservations: [],
      reviews: [],
    };
  }

  static getRandomOwnerId() {
    return faker.helpers.arrayElement(BUSINESS_OWNER_IDS);
  }

  static getRandomCategoryIds() {
    const shuffled = faker.helpers.shuffle(CATEGORY_IDS);
    return shuffled.slice(0, faker.number.int({ min: 1, max: 3 }));
  }
}
