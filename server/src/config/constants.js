const PORT = process.env.PORT || 3000;
const AccessControlAllowOrigin =
  process.env.AccessControlAllowOrigin || "http://localhost:3000";

module.exports = {
  PORT,
  AccessControlAllowOrigin,
};
