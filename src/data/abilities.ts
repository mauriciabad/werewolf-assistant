import type { Ability, AbilityId } from "./abilities.types";

const abilities: Ability[] = [
  {
    id: "extra-life",
    name: "Extra life",
    description: "When you die, you can get an extra life. \n1 usage.",
  },
  {
    id: "extra-vote",
    name: "Extra vote",
    description: "In one voting session, you can emit another vote. \n1 usage.",
  },
];

export function getAbility(id: AbilityId): Ability;
export function getAbility(id: string): Ability | undefined {
  return abilities.find((ability) => ability.id === id);
}

export default abilities;
