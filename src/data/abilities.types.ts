export type AbilityId = "extra-life" | "extra-vote" | "cupid" | "major";

export interface Ability<Id extends AbilityId = AbilityId> {
  id: Id;
  name: string;
  description: string;
  image?: string;
}
