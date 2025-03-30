import {
  UMLClassAttribute,
  UMLClassData,
} from "@/types/figure";
import { faker } from "@faker-js/faker";

export const createClassAttributes = (count: number) => {
  return faker.helpers.multiple(
    (): UMLClassAttribute => {
      return {
        name: faker.hacker.noun(),
        type: faker.helpers.arrayElement([
          "integer",
          "string",
          "boolean",
        ]),
      };
    },
    { count }
  );
};

export const createUMLClass = (count: number) => {
  return faker.helpers.multiple(
    (): UMLClassData => {
      return {
        attributes: createClassAttributes(5),
        className: faker.hacker.noun(),
      };
    },
    { count }
  );
};
