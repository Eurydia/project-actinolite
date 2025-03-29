import { FieldItem } from "@/types/fields";
import { faker } from "@faker-js/faker";
export const createFieldItems = (count: number) => {
  return faker.helpers.multiple(
    (): FieldItem => {
      return {
        accessLevel: faker.helpers.arrayElement([
          "private",
          "public",
          "protected",
          "package protected",
        ]),
        name: faker.person.firstName(),
        other: "",
        type: faker.person.firstName(),
      };
    },
    { count }
  );
};
