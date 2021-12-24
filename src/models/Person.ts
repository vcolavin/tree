import { BaseThing } from "./BaseThing.ts";

export interface Person extends BaseThing {
  type: "person";
  name: string;
}
