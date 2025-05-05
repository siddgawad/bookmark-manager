
let PORT = 3000;
let debounceTimer;
let API_URL=`http://localhost:${PORT}`;
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
    const response = await fetch(API_URL + "/search",{
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