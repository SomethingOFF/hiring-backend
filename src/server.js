const app = require("./app");
const ConnectDB = require("./lib/database");

process.on("uncaughtException", (err) => {
  console.log("Error :" + err.message);
  console.log(`unCaught exeception check it out. define property well!`);
  process.exit(1);
});

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "" });
}

ConnectDB();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on the ${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log("Error :" + err);
  console.log(
    "Server is down due to the unhandled rejection. something stupid you did!"
  );
  server.close(() => {
    process.exit(1);
  });
});
