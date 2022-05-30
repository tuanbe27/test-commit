const express = require("express");
const app = express();
require("dotenv").config({ path: "backend/config/config.env" });
require("./config/database")();
const authRoute = require("./routes/auth.route");

const PORT = process.env.PORT || 3001;

app.use(express.static(process.cwd() + "/server/public"));

app.get("/", (_, res) => {
  res.send("<h1>Wellcome to my chat application</h1>");
});
app.use("/api/messenger", authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
