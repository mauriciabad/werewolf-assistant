import type { AbilityId } from "./abilities.types";
import type { CharacterId } from "./characters.types";

export type Action = {
  name: string;
  description: string;
  requiredCharacters?: CharacterId[];
  requiredAbilities?: AbilityId[];
};
