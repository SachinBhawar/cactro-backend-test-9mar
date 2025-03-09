import axios from "axios";
import { ApplicationError } from "../Middlewares/ApplicationError.js";

export const getGithubUserDetails = async (username, GITHUB_TOKEN) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        const personalRepos = await getPersonalRepos(GITHUB_TOKEN);
        // console.log(response.data);

        const { login, followers, following, public_repos } = response.data;

        return { login, followers, following, public_repos, personalRepos };
    } catch (error) {
        throw new ApplicationError(error.message, error.status);
    }
};

export const getPersonalRepos = async (GITHUB_TOKEN) => {
    console.log("MYTOKEN:", GITHUB_TOKEN);
    try {
        const response = await axios.get("https://api.github.com/user/repos", {
            headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
        });

        const repoNames = response.data.map((repo) => repo.name);
        console.log("Your Repositories:", repoNames);
        return repoNames;
    } catch (error) {
        throw new ApplicationError(error.message, error.status);
    }
};

export const getRepoDetails = async (userName, repoName, GITHUB_TOKEN) => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${userName}/${repoName}`, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3+json",
            },
        });

        const { name, stargazers_count, forks_count, open_issues_count, html_url } = response.data;

        return {
            repository: name,
            url: html_url,
            stars: stargazers_count,
            forks: forks_count,
            open_issues: open_issues_count,
        };
    } catch (error) {
        throw new ApplicationError(error.message, error.status);
    }
};

export const createIssue = async (userName, repoName, gitToken, title, body) => {
    try {
        const response = await axios.post(
            `https://api.github.com/repos/${userName}/${repoName}/issues`,
            { title, body },
            {
                headers: {
                    Authorization: `Bearer ${gitToken}`,
                    Accept: "application/vnd.github.v3+json",
                },
            }
        );

        console.log(response);

        return response.data.html_url;
    } catch (error) {
        throw new ApplicationError(error.message, error.status);
    }
};
