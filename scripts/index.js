const trigger = document.querySelector("#container");
const left = document.querySelector(".left");
const right = document.querySelector(".right");

const postURL = "https://jsonplaceholder.typicode.com/posts/";

let postIndex = 1;

async function fetchPost(postURL) {
  try {
    const response = await fetch(postURL + postIndex);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function createPost(post) {
  const postIdInfo = document.createElement("p");
  const titleInfo = document.createElement("h3");
  const bodyInfo = document.createElement("p");

  postIdInfo.textContent = post.id;
  titleInfo.textContent = post.title;
  bodyInfo.textContent = post.body;

  trigger.append(postIdInfo, titleInfo, bodyInfo);
}

async function loadPost() {
  const newPost = await fetchPost(postURL);
  createPost(newPost);
}

loadPost();

left.addEventListener("click", () => {});

right.addEventListener("click", () => {});
