import type { Character, CharacterId } from "./characters.types";

const characters: Character[] = [
  {
    id: "werewolf",
    name: "Werewolf",
    description:
      "During the night votes to kill someone with the other wolfs in secret. \nYour objective is to reduce the number of villagers to the same as werewolfs.",
    team: "werewolfs",
    image:
      "https://www.storynory.com/wp-content/uploads/2021/08/howling-werewolf.jpg",
  },
  {
    id: "villager",
    name: "Villager",
    description:
      "During the day votes to kill someone with everyone. \nYour objective is to kill all werewolfs.",
    team: "villagers",
    image:
      "https://static.turbosquid.com/Preview/2019/01/16__08_45_08/1.pngC5B98C2C-BEF9-4171-BF71-56B581223F17Large.jpg",
  },
  {
    id: "villager-villager",
    name: "Villager-Villager",
    description:
      "Everyone knows your role, you have to tell you're the Villager-Villager.",
    team: "villagers",
    image:
      "https://thecamford.org/wp-content/uploads/2021/07/top-and-best-CBSE-school-in-Coimbatore_honesty-is-the-best-policy_The-Camford-International-School.jpeg",
  },
  {
    id: "seer",
    name: "Seer",
    description: "You can see the role of a player during the night.",
    team: "villagers",
  },
];

export function getCharacter(id: CharacterId): Character;
export function getCharacter(id: string): Character | undefined;
export function getCharacter(id: string): Character | undefined {
  return characters.find((character) => character.id === id);
}

export default characters;
