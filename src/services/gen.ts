import {
  AccessLevel,
  DiagramClass,
  DiagramClassAttribute,
  DiagramClassMethod,
} from "@/types/figure";
import { faker } from "@faker-js/faker";

export const createClassAttributes = (count: number) => {
  return faker.helpers.multiple(
    (): DiagramClassAttribute => {
      return {
        primary: faker.hacker.noun(),
        secondary: faker.helpers.arrayElement([
          "integer",
          "string",
          "boolean",
        ]),
        access_: faker.helpers.arrayElement(
          Object.values(AccessLevel)
        ),
      };
    },
    { count }
  );
};

export const createClassMethod = (count: number) => {
  return faker.helpers.multiple(
    (): DiagramClassMethod => {
      return {
        primary: faker.hacker.noun() + "()",
        secondary: "void",
        access_: faker.helpers.arrayElement(
          Object.values(AccessLevel)
        ),
      };
    },
    { count }
  );
};

export const createUMLClass = (count: number) => {
  return faker.helpers.multiple(
    (): DiagramClass => {
      return {
        name: faker.hacker.noun(),
        attributes: createClassAttributes(5),
        methods: createClassMethod(5),
      };
    },
    { count }
  );
};
