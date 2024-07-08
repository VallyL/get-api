const trigger = document.querySelector("#container");
const left = document.querySelector(".left");
const right = document.querySelector(".right");

const postURL = "https://jsonplaceholder.typicode.com/posts/";

let postIndex = 1;
const postCache = {};

async function fetchPost(postURL) {
  try {
    if (postCache[postIndex]) {
      return postCache[postIndex];
    }

    const response = await fetch(postURL + postIndex);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    postCache[postIndex] = data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function createPost(post) {
  if (!post) return;
  trigger.textContent = "";

  const postIdInfo = document.createElement("p");
  const titleInfo = document.createElement("h3");
  const bodyInfo = document.createElement("p");

  postIdInfo.textContent = post.id;
  titleInfo.textContent = post.title;
  bodyInfo.textContent = post.body;

  trigger.append(postIdInfo, titleInfo, bodyInfo);
}

async function loadPost() {
  trigger.textContent = "Loading ...";
  const newPost = await fetchPost(postURL);
  createPost(newPost);
}

loadPost();

left.addEventListener("click", async () => {
  if (postIndex > 1) {
    postIndex--;
    loadPost();
  }
});

right.addEventListener("click", () => {
  postIndex++;
  loadPost();
});
