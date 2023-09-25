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
    body.innerHTML = "";
  }
  comments = data;
  showComments(data);
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
      <div class="card" aria-hidden="true" >
      <div class="card-body">
        <h5 class="card-title">
          <span class="col-6">${item.email}</span>
        </h5>
        <p class="card-text">
          <span class="col-8">${item.name}</span>
          <span class="col-12">${item.body}</span>
        </p>
        <a
          class="btn btn-primary col-6"
          data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onclick="getById(${item.id})"
        >See this product</a>
      </div>
    </div>
      
      `;
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
