document.addEventListener("DOMContentLoaded", function () {
  const bibtexToggles = document.querySelectorAll(".bibtex-toggle");

  bibtexToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      const bibtexContent =
        this.closest(".publication-item").querySelector(".bibtex-content");
      if (
        bibtexContent.style.display === "none" ||
        bibtexContent.style.display === ""
      ) {
        bibtexContent.style.display = "block";
        this.textContent = "Hide BibTeX";
      } else {
        bibtexContent.style.display = "none";
        this.textContent = "Show BibTeX";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const newsContainer = document.querySelector(".news-container");
  const showMoreBtn = document.getElementById("show-more-btn");
  const newsItems = newsContainer ? newsContainer.querySelectorAll(".news-item") : [];
  const initialDisplay = 4;
  let currentlyShown = initialDisplay;

  if (newsItems.length > initialDisplay) {
    // 隐藏多余项
    for (let i = initialDisplay; i < newsItems.length; i++) {
      newsItems[i].classList.add("hidden");
    }
    showMoreBtn.style.display = "block";
  } else {
    showMoreBtn.style.display = "none";
  }

  showMoreBtn.addEventListener("click", function () {
    const nextBatch = currentlyShown + initialDisplay;
    for (let i = currentlyShown; i < nextBatch && i < newsItems.length; i++) {
      newsItems[i].classList.remove("hidden");
    }
    currentlyShown += initialDisplay;

    if (currentlyShown >= newsItems.length) {
      showMoreBtn.style.display = "none";
    }
  });
});
