const body = document.querySelector(".products");
const loader = document.querySelector(".loader_box");
const search = document.querySelector("#search");

let api = "https://jsonplaceholder.typicode.com/comments";

let comments = [];

async function fetchData() {
  const response = await fetch(api);
  const data = await response.json();

  if (response) {
    loader.style.display = "none";
    comments = data;
    showComments(data);
  }
}

fetchData();

let searched = [];

search.addEventListener("keyup", (e) => {
  if (search.value === "") {
    searched = comments;
  } else {
    searched = comments.filter((com) =>
      com.email.toLowerCase().includes(e.target.value.toLowerCase())
    );
  }
  showComments(searched);
});

function showComments(data) {
  let allProducts = ``;

  if (data.length) {
    data?.map((item) => {
      allProducts += ` 
      <div class="product" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onclick="getById(${item.id})">
        <p>${item.email}</p>
        <h1>${item.name}</h1>
        <div class="info">${item.body}</div>
      </div>`;
    });

    body.innerHTML = allProducts;
  } else {
    body.innerHTML = `<h2 class="no_comments">There is no such as comments</h2>`;
  }
}

async function getById(id) {
  let commentBox = document.querySelector(".modal-body");

  try {
    const response = await fetch(`${api}/${id}`);
    const result = await response.json();

    if (response) {
      document.querySelector(".loader_com").style.display = "none";
      commentBox.innerHTML = ` 
      <h4>${result.email}</h4>
      <h5>${result.name}</h5>
      <p>${result.body}</p>`;
    }
  } catch (err) {
    console.log(err);
  }
}
