

function displayBranches(){
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

function displayRepositories(event, data){
	var repos = JSON.parse(this.responseText)
	console.log(repos)
	const repoList = `<ul>${repos.map(r => '<li>' + r.html_url + ' - <a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a>' + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a>' + '</li>').join('')}</ul>`
	document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
	let username = document.getElementById("username").value
	const req = new XMLHttpRequest() 
	req.addEventListener("load", displayRepositories)
	req.open("GET", 'https://api.github.com/users/' + username + '/repos')
	req.send()
}


function getCommits(el) {
  let username = document.getElementById("username").value
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + name + '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li>' + commit.commit.author.name + commit.author.login + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el){
	let username = document.getElementById("username").value
  	const name = el.dataset.repository
	const req = new XMLHttpRequest() 
	req.addEventListener("load", getBranches)
	req.open("GET", 'https://api.github.com/repos/' + username + '/' + name + '/branches')
    req.send()	
   
}