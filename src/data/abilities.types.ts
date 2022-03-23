export type AbilityId = "extra-life" | "extra-vote";

export interface Ability<Id extends AbilityId = AbilityId> {
  id: Id;
  name: string;
  description: string;
  image?: string;
}
