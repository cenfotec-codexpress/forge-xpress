import UserForge from "./forges/users.js";

const main = async () => {
  console.log(await UserForge.create());
};

main();
