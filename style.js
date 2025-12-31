// 合并所有DOMContentLoaded事件到一个监听器中,提升性能
document.addEventListener("DOMContentLoaded", function () {
  
  // BibTeX Toggle功能
  const bibtexToggles = document.querySelectorAll(".bibtex-toggle");
  bibtexToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      const bibtexContent = this.closest(".publication-item").querySelector(".bibtex-content");
      if (bibtexContent.style.display === "none" || bibtexContent.style.display === "") {
        bibtexContent.style.display = "block";
        this.innerHTML = '<i class="fas fa-times"></i> Hide BibTeX';
      } else {
        bibtexContent.style.display = "none";
        this.innerHTML = '<i class="fas fa-quote-right"></i> BibTeX';
      }
    });
  });

  // News展开/收起功能
  const newsContainer = document.querySelector(".news-container");
  const showMoreBtn = document.getElementById("show-more-btn");
  
  if (newsContainer && showMoreBtn) {
    const newsItems = newsContainer.querySelectorAll(".news-item");
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
  }

  // PhD Resources Toggle功能
  const resourcesBtn = document.getElementById("resources-toggle-btn");
  const resourcesDropdown = document.getElementById("resources-dropdown");

  if (resourcesBtn && resourcesDropdown) {
    resourcesBtn.addEventListener("click", function () {
      const isHidden = resourcesDropdown.classList.contains("hidden");
      
      if (isHidden) {
        resourcesDropdown.classList.remove("hidden");
        setTimeout(() => {
          resourcesDropdown.classList.add("show");
        }, 10);
        resourcesBtn.classList.add("active");
      } else {
        resourcesDropdown.classList.remove("show");
        setTimeout(() => {
          resourcesDropdown.classList.add("hidden");
        }, 400);
        resourcesBtn.classList.remove("active");
      }
    });
  }
  
});