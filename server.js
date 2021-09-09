const mongoose = require("mongoose");

const dotenv = require("dotenv");
const app = require("./app");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log("DB connections succesfull...");
  })
  .catch((err) => {
    console.log(err.message);
  });

//----------creating a server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port: ${port}...`);
});
