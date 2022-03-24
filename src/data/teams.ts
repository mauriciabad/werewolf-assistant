import type { Team } from "./teams.types";

const teams: Team[] = [
  {
    id: "werewolfs",
    name: "Werewolfs",
    description:
      "The werewolfs are the bad guys. They are the ones who kill the villagers.",
    objective: "Reduce the number of villagers to the same as werewolfs.",
    image:
      "https://www.storynory.com/wp-content/uploads/2021/08/howling-werewolf.jpg",
  },
  {
    id: "villagers",
    name: "Villagers",
    description:
      "The villagers are the good guys. They are the ones who survive the night.",
    objective: "Kill all werewolfs",
    image:
      "https://static.turbosquid.com/Preview/2019/01/16__08_45_08/1.pngC5B98C2C-BEF9-4171-BF71-56B581223F17Large.jpg",
  },
];

export default teams;
