import express from "express";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));


app.get("/", async (req, resp) => {
  const result = await axios.get("https://secrets-api.appbrewery.com/random");
  try {
    resp.render("index.ejs", {
      secret: result.data.secret,
      user: result.data.username,
    });
  } catch (error) {
    console.log(error.data);
    resp.status(500);
  }
});

app.listen(port, () => {
  console.log(`The app is running on ${port}`);
});
