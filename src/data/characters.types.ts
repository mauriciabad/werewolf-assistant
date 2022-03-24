import type { TeamId } from "./teams.types";

export type CharacterId =
  | "werewolf"
  | "villager"
  | "villager-villager"
  | "seer";

export interface Character<Id extends CharacterId = CharacterId> {
  id: Id;
  name: string;
  description: string;
  image?: string;
  team: TeamId;
}
