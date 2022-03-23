import type { Ability } from "./abilities.types";

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

export default abilities;
