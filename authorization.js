const { GRPC } = require("@cerbos/grpc");
const db = require("./db"); // Make sure you correctly require the db module

// The Cerbos PDP instance
const cerbos = new GRPC("localhost:3593", {
  tls: false,
});

const SHOW_PDP_REQUEST_LOG = false;

module.exports = async (userName, action, resourceAtrr = {}) => {
  const user = db.users.find(u => u.name.toLowerCase() === userName.toLowerCase());
  if (!user) {
    throw new Error("User not found");
  }

  const cerbosObject = {
    resource: {
      kind: "todos",
      policyVersion: "default",
      id: resourceAtrr.id + "" || "new",
      attributes: resourceAtrr,
    },
    principal: {
      id: user.name, // Changed from principalId to user.name
      policyVersion: "default",
      roles: [user?.role || "unknown"],
      attributes: user,
    },
    actions: [action],
  };

  if (SHOW_PDP_REQUEST_LOG) {
    console.log("cerbosObject \n", JSON.stringify(cerbosObject, null, 4));
  }

  const cerbosCheck = await cerbos.checkResource(cerbosObject);

  const isAuthorized = cerbosCheck.isAllowed(action);

  if (!isAuthorized)
    throw new Error("You are not authorized to visit this resource");
  return true;
};
