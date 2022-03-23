import type { Team } from "./teams.types";

const teams: Team[] = [
  {
    id: "werewolfs",
    name: "Werewolfs",
    description:
      "The werewolfs are the bad guys. They are the ones who kill the villagers.",
    image:
      "https://static.wikia.nocookie.net/powerlisting/images/c/c6/Gadreal2.jpg/revision/latest?cb=20210529045015",
  },
  {
    id: "villagers",
    name: "Villagers",
    description:
      "The villagers are the good guys. They are the ones who survive the night.",
    image: "https://static1.bigstockphoto.com/6/7/2/large1500/276917269.jpg",
  },
];

export default teams;
