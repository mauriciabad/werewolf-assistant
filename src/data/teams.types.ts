export type TeamId = "werewolfs" | "villagers" | "alone" | "other";

export interface Team<T extends TeamId = TeamId> {
  id: T;
  name: string;
  description: string;
  image?: string;
}
