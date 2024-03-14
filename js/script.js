// Profile info
const profileOverview = document.querySelector(".overview");
const userName = "rycalingo";

const repoList = document.querySelector(".repo-list");

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
