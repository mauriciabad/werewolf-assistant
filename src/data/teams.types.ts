export type TeamId = "werewolfs" | "villagers";

export interface Team<T extends TeamId = TeamId> {
  id: T;
  name: string;
  description: string;
  image?: string;
}
