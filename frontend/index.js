
let PORT = 3000;
let debounceTimer;
import { getAuthHeaders } from "./utils";


document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const searchInput = document.getElementById("search"); // if using input field
    const addBkmrkBtn = document.getElementById("add-btn");
    const sidebarCollections = document.getElementById("collection-container"); // ul.sidebar-collections
    const sidebarTags = document.getElementById("tags-container");             // ul.sidebar-tags
    const categoryContainer = document.getElementById("category");             // div.categories
    const bkmrkContainer = document.querySelector(".bookmarks-container");
    

   
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            clearTimeout(debounceTimer); // cancel previously scheduled call
            const searchText = searchInput.value.trim().toLowerCase();
            debounceTimer = setTimeout(() => {
                if (searchText) searchBkmrk(searchText);
            }, 200); // only search if no typing for 200ms
        });
             }

    if (addBkmrkBtn) {
        addBkmrkBtn.addEventListener("click", () => {
            createBkmrk();
        });
    }

    if (sidebarCollections) {
        sidebarCollections.addEventListener("click", () => {
            handleCollectionClick();
        });
    }

    if (sidebarTags) {
        sidebarTags.addEventListener("click", () => {
            handleTagClick();
        });
    }

    if (categoryContainer) {
        categoryContainer.addEventListener("click", () => {
            handleCategoryClick();
        });
    }

   
    renderAllBookmarks();
});



async function searchBkmrk(searchText) {
    // logic to filter bookmarks based on search input
    const response = await fetch(process.env.API_URL + "/search",{
        method:"POST",
        headers: getAuthHeaders(),
        body:JSON.stringify({searchText})
    });
    const data = await response.json();
    if(!response.ok) throw new Error(data.message);
    dropDownSearchBar(data.data);

}

async function createBkmrk() {
    // logic to open a modal or prompt for new bookmark input
   
    modalCreate();
}

async function handleCollectionClick(e) {
    // logic to filter bookmarks based on selected collection
}

async function handleTagClick(e) {
    // logic to filter bookmarks based on selected tag
}

async function handleCategoryClick(e) {
    // logic to filter bookmarks based on selected category tab
}

async function renderAllBookmarks() {
    // fetch and display all bookmarks for the logged-in user
}

async function dropDownSearchBar(result){
    //logic for dropdown and display results of search from backend array 
    //make nice dropdowm for search like youtube
    const dropdown = document.getElementById("dropdown-results");
    dropdown.innerHTML = "";
    if (!Array.isArray(result) || result.length === 0) {
        dropdown.style.display = "none";
        return;
    }
    result.forEach(item => {
        // build and append dropdown item
        const newBookmark = document.createElement("div");
        newBookmark.classList.add("dropdown-item");
        newBookmark.innerText = item.title;
        // newBookmark.addEventListener("click",async()=>{
        //     window.location.href=""; // wire where we should go when we click on any result
        // })
        dropdown.appendChild(newBookmark); 

    });
    dropdown.style.display = "block";
    


}


async function modalCreate(){
    // Inject modal HTML
  const modal = document.createElement("div");
  modal.id = "bookmark-modal";
  modal.innerHTML = `
    <div class="modal-content">
      <form id="bookmark-form">
        <input type="text" id="title" placeholder="Enter title" required />
        <input type="url" id="url" placeholder="Enter URL" required />
        <select id="category-dropdown"></select>
        <select id="collection-dropdown"></select>
        <select id="tags-dropdown"></select>
        <button type="submit">Save</button>
      </form>
    </div>
  `;
  document.body.appendChild(modal);

  // Populate dropdowns
  await fetchOptions("category", "category-dropdown", "Select category");
  await fetchOptions("collection", "collection-dropdown", "Select collection");
  await fetchOptions("tags", "tags-dropdown", "Select tag");

  // Handle form submission
  document.getElementById("bookmark-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const url = document.getElementById("url").value;
    const category = document.getElementById("category-dropdown").value;
    const collection = document.getElementById("collection-dropdown").value;
    const tag = document.getElementById("tags-dropdown").value;

    const res = await fetch("/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, url, category, collection, tags: [tag] })
    });

    const data = await res.json();
    if (!res.ok) return alert(data.message);
    alert("Bookmark saved!");
    modal.remove(); // close modal on success
  });
}

async function fetchOptions(endpoint, dropdownId, placeholderText) {
  try {
    const res = await fetch(`/api/${endpoint}`);
    const data = await res.json();

    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = "";

    const placeholder = document.createElement("option");
    placeholder.textContent = placeholderText;
    placeholder.disabled = true;
    placeholder.selected = true;
    dropdown.appendChild(placeholder);

    data.forEach(item => {
      const option = document.createElement("option");
      option.value = item;
      option.textContent = item;
      dropdown.appendChild(option);
    });
  } catch (err) {
    console.error(`Error fetching ${endpoint}:`, err);
  }
    }




