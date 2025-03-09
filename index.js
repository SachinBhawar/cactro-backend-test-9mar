// import modules and liabraries
import express, { json } from "express";
import cookieParcer from "cookie-parser";
// import swagger from "swagger-ui-express";
// import apiDocs from "./swagger.json" assert { type: "json" };

import {
    createIssueController,
    getRepoDetailsController,
    getUserDetailsController,
} from "./src/Controller/controller.js";
import { errorHandlerMiddleware } from "./src/Middlewares/ApplicationError.js";

// rest api
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParcer());

app.get("/github", getUserDetailsController);
app.get("/github/:repoName", getRepoDetailsController);
app.post("/github/:repoName/issues", createIssueController);

app.use(errorHandlerMiddleware);

// Swagger documentation
// app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

app.all("*", (req, res) => {
    res.status(404).send({
        success: false,
        msg: "This route is not Supported by this app.",
    });
});

export default app;
