import {
  AccessLevel,
  DiagramNodeAttributeData,
  DiagramNodeData,
} from "@/types/figure";
import { Node } from "@xyflow/react";
import { z } from "zod";

const diagramClassMethodSchema = z
  .object({
    id: z.number().int().nonnegative(),
    access_: z.nativeEnum(AccessLevel),
    primary: z.string(),
    secondary: z.string(),
  })
  .strict()
  .required();

const diagramClassAttributeSchema = z
  .object<DiagramNodeAttributeData>({
    id: z.number().int().nonnegative(),
    access_: z.nativeEnum(AccessLevel),
    primary: z.string(),
    secondary: z.string(),
  })
  .strict()
  .required();

const hexColorSchema = /^#[A-Fa-f0-9]{6}/;

const diagramClassSchema = z
  .object({
    name: z.string(),
    attributes: z.array(diagramClassAttributeSchema),
    methods: z.array(diagramClassMethodSchema),
    color: z
      .string()
      .refine((value) => hexColorSchema.test(value)),
  })
  .strict()
  .required();

const flowNodeSchema = z.object<Node<DiagramNodeData>>({});

const validateSessionDataObject = (data: unknown) => {
  const result = diagramClassSchema.safeParse(data);
  if (result.success) {
    return result.data;
  }
  return null;
};
