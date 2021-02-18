const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

const searchStates = async (searchText) => {
  const res = await fetch(
    `https://www.reddit.com/r/${searchText}/top.json?limit=100`
  );
  //check if res is ok
  if (res.ok) {
    const states = await res.json();
    outputHtml(states);
  } else {
    console.log("something went wrong");
  }
};

const outputHtml = (states) => {
  const html = states.data.children
    .map(
      (content) =>
        `
        <div>
        <a style="display:flex; border: 2px solid white; margin-bottom:10px;" href="${content.data.url_overridden_by_dest}" target="_blank">
        <img src="${content.data.thumbnail}"/>
        <h1 style="font-size:18px; margin-left:20px;">${content.data.title}</h1>
        </a>
        </div>  
    `
    )
    .join("");
  matchList.innerHTML = html;
};

search.addEventListener("input", () => searchStates(search.value));
