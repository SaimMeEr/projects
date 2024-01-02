const accesKey = "mOlxrgC7sElG0Ka52g5uRQ132OLEQX4mTgtXBR4YWK4";

const formEL = document.querySelector('form');
const inputEl = document.getElementById('search-input');
const searchResults = document.querySelector('.search-results');
const showMore = document.getElementById('show-more-button');

let Inputdata = "";
let page = 1;

async function searchImages() {
    Inputdata = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${Inputdata}&client_id=${accesKey}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (page === 1) {
            searchResults.innerHTML = "";
        }

        data.results.map((result) => {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add("search-result");

            const image = document.createElement('img');
            image.src = result.urls.small;
            image.alt = result.alt_description;

            const imageLink = document.createElement('a');
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description;

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResults.appendChild(imageWrapper);
        });

        page++;
        if (page > 1) {
            showMore.style.display = "block";
        } else {
            showMore.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

formEL.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click", () => {
    page++;
    searchImages();
});

