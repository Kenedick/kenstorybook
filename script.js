
const searchInput = document.getElementById("search-input");
const storyCards = document.querySelectorAll(".story-card");
const filterButtons = document.querySelectorAll(".filter-btn");
const resultCount = document.getElementById("result-count");
const noResults = document.getElementById("no-results");

let selectedGenre = "All";

// SEARCH AND GENRE FILTER
function filterStories() {
    const searchText = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    storyCards.forEach((card) => {
        const genre = card.dataset.genre;
        const text = card.textContent.toLowerCase();

        const matchesGenre =
            selectedGenre === "All" || genre === selectedGenre;

        const matchesSearch = text.includes(searchText);
        const showCard = matchesGenre && matchesSearch;

        card.hidden = !showCard;

        if (showCard) {
            visibleCount++;
        }
    });

    resultCount.textContent = `Showing ${visibleCount} of ${storyCards.length} stories`;
    noResults.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", filterStories);

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        selectedGenre = button.dataset.filter;

        filterButtons.forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");
        filterStories();
    });
});

// NAVIGATION GENRE LINKS
document.querySelectorAll("[data-genre-link]").forEach((link) => {
    link.addEventListener("click", () => {
        selectedGenre = link.dataset.genreLink;

        filterButtons.forEach((button) => {
            button.classList.toggle(
                "active",
                button.dataset.filter === selectedGenre
            );
        });

        filterStories();
    });
});

// DARK/LIGHT MODE
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    themeToggle.textContent = isDark
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
});

// LIKE BUTTON
document.querySelectorAll(".like-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const isLiked = button.classList.toggle("liked");

        button.textContent = isLiked ? "♥ Liked" : "♡ Like";
        button.setAttribute("aria-pressed", String(isLiked));
    });
});

// SHOW/HIDE SYNOPSIS
document.querySelectorAll(".synopsis-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const card = button.closest(".story-info");
        const synopsis = card.querySelector(".synopsis");

        const isHidden = synopsis.hidden;
        synopsis.hidden = !isHidden;

        button.textContent = isHidden
            ? "Hide Synopsis"
            : "Show Synopsis";
    });
});

// INITIAL DISPLAY
filterStories();
