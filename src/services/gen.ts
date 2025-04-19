import {
  AccessLevel,
  DiagramNodeData,
  DiagramNodeMethodData,
} from "@/types/figure";
import { faker } from "@faker-js/faker";
import {
  createDiagramNodeAttributeData,
  createDiagramNodeMethodData,
} from "./models";

export const createRandomClassAttributes = (
  count: number
) => {
  return faker.helpers.multiple(
    () =>
      createDiagramNodeAttributeData({
        primary: faker.hacker.noun(),
        secondary: faker.helpers.arrayElement([
          "integer",
          "string",
          "boolean",
        ]),
        access_: faker.helpers.arrayElement(
          Object.values(AccessLevel)
        ),
      }),
    { count }
  );
};

export const createRandomClassMethods = (count: number) => {
  return faker.helpers.multiple(
    (): DiagramNodeMethodData => {
      return createDiagramNodeMethodData({
        primary: faker.hacker.noun() + "()",
        secondary: "void",
        access_: faker.helpers.arrayElement(
          Object.values(AccessLevel)
        ),
      });
    },
    { count }
  );
};

export const createUMLClass = (count: number) => {
  return faker.helpers.multiple(
    (): DiagramNodeData => {
      return {
        name: faker.hacker.noun(),
        attributes: createRandomClassAttributes(5),
        methods: createRandomClassMethods(5),
      };
    },
    { count }
  );
};
