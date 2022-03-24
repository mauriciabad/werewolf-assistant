import type { TeamId } from "./teams.types";

export type CharacterId =
  | "werewolf"
  | "villager"
  | "villager-villager"
  | "seer"
  | "suicide"
  | "witch"
  | "doctor"
  | "triplet"
  | "baker"
  | "feral-kid"
  | "twin";

export interface Character<Id extends CharacterId = CharacterId> {
  id: Id;
  name: string;
  description: string;
  image?: string;
  team: TeamId;
}
