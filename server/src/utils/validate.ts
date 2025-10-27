import { ZodSchema } from "zod";
export function parse<T>(schema: ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}
