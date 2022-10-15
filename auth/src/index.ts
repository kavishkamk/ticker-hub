import express from "express";
import { json } from "body-parser";

const app = express();

const port = 4000;

app.use(json());

app.get("/api/users/currentuser", (req, res, next) => {
    res.send("hiii");
})

app.listen(port, () => {
    console.log("server listen on port : " + port);
});