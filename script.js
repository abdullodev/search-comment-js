const body = document.querySelector(".products");
const loader = document.querySelector(".loader_box");
const search = document.querySelector("#floatingInput");
const loading = document.querySelector(".loader_com");
const searchedCount = document.querySelector(".all_searched");

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
  searched = comments.filter((com) =>
    com.email.toLowerCase().includes(e.target.value.toLowerCase())
  );
  showComments(searched);

  if (e.target.value !== "") {
    searchedCount.innerHTML = `<h2>${searched.length} ta user topildi</h2>`;
  } else {
    searchedCount.innerHTML = "";
  }
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
  commentBox.innerHTML = `
  <div class="loader_com">
    <div class="lds-dual-ring"></div>
  </div>
  `;
  try {
    const response = await fetch(`${api}/${id}`);
    const result = await response.json();

    commentBox.innerHTML = ` 
      <h4>${result.email}</h4>
      <h5>${result.name}</h5>
      <p>${result.body}</p>`;
  } catch (err) {
    console.log(err);
  }
}
