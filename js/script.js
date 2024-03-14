// Profile info
const profileOverview = document.querySelector(".overview");
const userName = "rycalingo";

const repoList = document.querySelector(".repo-list");

const repoDeck = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");

async function getProfile() {
	const response = await fetch(`https://api.github.com/users/${userName}`);
	if (!response.ok) throw new Error(response.statusText);
	const data = await response.json();
	displayProfile(data);
}

function displayProfile(user) {
	const div = document.createElement("div");
	div.classList.add("user-info");
	div.innerHTML = `
    <figure>
    <img alt="user avatar" src=${user.avatar_url} />
    </figure>
    <div>
    <p><strong>Name:</strong> ${user.name}</p>
    <p><strong>Bio:</strong> ${user.bio}</p>
    <p><strong>Location:</strong> ${user.location}</p>
    <p><strong>Number of public repos:</strong> ${user.public_repos}</p>
    </div>
  `;
	profileOverview.append(div);
}

getProfile();

async function getRepos() {
	const param = "?sort=updated&per_page=100";
	const response = await fetch(`https://api.github.com/users/${userName}/repos${param}`);
	if (!response.ok) throw new Error(response.statusText);
	const repos = await response.json();
	displayRepos(repos);
}

function displayRepos(repos) {
	const repoArray = [];
	for (let repoItem of repos) {
		const li = `<li class="repo"><h3>${repoItem.name}</h3></li>`;
		repoArray.push(li);
	}

	repoList.innerHTML = repoArray.join("");
}

getRepos();

repoList.addEventListener("click", function (e) {
	const event_target = e.target;

	if (event_target.matches("h3")) {
		const repoName = event_target.innerText;
		getRepoInfo(repoName);
	}
});

async function getRepoInfo(repo_name) {
	const param = `/repos/${userName}/${repo_name}`;
	const response = await fetch(`https://api.github.com${param}`);
	if (!response.ok) throw new Error(response.statusText);
	const repoInfo = await response.json();
	console.log(repoInfo);

	const fetchLanguages = await fetch(repoInfo.languages_url);
	const languageData = await fetchLanguages.json();
	const languages = [];
	for (let key in languageData) {
		languages.push(key);
	}
	// console.log(languageData);
	// console.log(languages);

	displayRepoInfo(repoInfo, languages);
}

function displayRepoInfo(repoInfo, languages) {
	const info_div = document.createElement("div");
	info_div.innerHTML = `
		<h3>Name: ${repoInfo.name}</h3>
		<p>Description: ${repoInfo.description}</p>
		<p>Default Branch: ${repoInfo.default_branch}</p>
		<p>Languages: ${languages.join(", ")}</p>
		<a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
	`;

	repoData.append(info_div);
	repoData.classList.remove("hide");
	repoDeck.classList.add("hide");
}