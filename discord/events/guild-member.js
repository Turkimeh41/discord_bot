const db = require("../../database/database");
const guestRole = "1134804394639114290";

const memberAddEvent = async (member) => {
  const role = member.guild.roles.cache.get(guestRole);
  member.roles.add(role);
};

const memberRemoveEvent = async (member) => {
  console.log(
    `${member.user.username} has left the server, lets wish him goodbye!`
  );
  const memberID = member.user.id;
  console.log("deleting member from the mongo database...");
  await db.removeMember(memberID);

  console.log("deleted!");
};

module.exports.memberAddEvent = memberAddEvent;
module.exports.memberRemoveEvent = memberRemoveEvent;
