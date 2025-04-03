import {
  DiagramClass,
  DiagramClassAttribute,
} from "@/types/figure";
import { faker } from "@faker-js/faker";

export const createClassAttributes = (count: number) => {
  return faker.helpers.multiple(
    (): DiagramClassAttribute => {
      return {
        name: faker.hacker.noun(),
        type: faker.helpers.arrayElement([
          "integer",
          "string",
          "boolean",
        ]),
        accessLevel: faker.helpers.arrayElement([
          "+",
          "-",
          "#",
        ]),
      };
    },
    { count }
  );
};

export const createUMLClass = (count: number) => {
  return faker.helpers.multiple(
    (): DiagramClass => {
      return {
        attributes: createClassAttributes(5),
        className: faker.hacker.noun(),
      };
    },
    { count }
  );
};
