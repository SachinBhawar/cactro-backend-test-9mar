import { configDotenv } from "dotenv";
import axios from "axios";
import { createIssue, getGithubUserDetails, getRepoDetails } from "../Model/Repository.js";
import { ApplicationError } from "../Middlewares/ApplicationError.js";

configDotenv();
const userName = process.env.NAME;
const gitToken = process.env.GITHUB_TOKEN;

export const getUserDetailsController = async (req, res) => {
    try {
        const responce = await getGithubUserDetails(userName, gitToken);
        return res
            .status(200)
            .json({ success: true, msg: "Details of github user fetched successfully", data: responce });
    } catch (err) {
        if (err instanceof ApplicationError) {
            return res.status(err.code).json({ success: false, msg: `${err.message}` });
        }
        return res.status(500).json({ success: false, msg: "Something went wrong" });
    }
};

export const getRepoDetailsController = async (req, res) => {
    const repoName = req.params.repoName;
    console.log(repoName);
    try {
        const responce = await getRepoDetails(userName, repoName, gitToken);
        return res.status(200).json({
            success: true,
            msg: `Details of repository '${repoName}' fetched successfully`,
            data: responce,
        });
    } catch (err) {
        if (err instanceof ApplicationError) {
            return res.status(err.code).json({ success: false, msg: `${err.message}` });
        }
        return res.status(500).json({ success: false, msg: "Something went wrong" });
    }
};

export const createIssueController = async (req, res) => {
    const repoName = req.params.repoName;
    const title = req.body.title;
    const body = req.body.body;
    try {
        const responce = await createIssue(userName, repoName, gitToken, title, body);
        return res.status(200).json({ success: true, msg: "Issue created successfully", data: responce });
    } catch (err) {
        if (err instanceof ApplicationError) {
            return res.status(err.code).json({ success: false, msg: `${err.message}` });
        }
        return res.status(500).json({ success: false, msg: "Something went wrong" });
    }
};
