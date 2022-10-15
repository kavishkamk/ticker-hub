import express from "express";
import { json } from "body-parser";

const app = express();

const port = 4000;

app.use(json());

app.listen(port, () => {
    console.log("server start on port : " + port);
});