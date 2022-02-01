const { Octokit } = require("@octokit/core");
const { githubToken } = require("../config.json");

const ok = new Octokit({
  auth: githubToken,
});

const createIssue = async (repo, title, description) => {
  try {
    const res = await ok.request("POST /repos/{owner}/{repo}/issues", {
      owner: "devssio",
      repo,
      title,
      body: description,
    });

    const url = res.data.html_url
    const id = res.data.number

		return {
			success: true,
      data: {
        title,
        url,
        description,
        id
      }
		}
  } catch (e) {
    /* handle error */
    console.log(e)
		return {
			success: false,
			data: null
		}
  }
};

module.exports = {
  createIssue
}
