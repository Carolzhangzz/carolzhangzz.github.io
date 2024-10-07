document.addEventListener('DOMContentLoaded', function() {
    const bibtexToggles = document.querySelectorAll('.bibtex-toggle');
    
    bibtexToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const bibtexContent = this.closest('.publication-item').querySelector('.bibtex-content');
            if (bibtexContent.style.display === 'none' || bibtexContent.style.display === '') {
                bibtexContent.style.display = 'block';
                this.textContent = 'Hide BibTeX';
            } else {
                bibtexContent.style.display = 'none';
                this.textContent = 'BibTeX';
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const newsContainer = document.querySelector('.news-container');
    const showMoreBtn = document.getElementById('show-more-btn');
    const newsItems = newsContainer.querySelectorAll('.news-item');
    
    // 初始显示4条新闻
    const initialDisplay = 4;
    let currentlyShown = initialDisplay;

    // 隐藏多余的新闻项
    for (let i = initialDisplay; i < newsItems.length; i++) {
        newsItems[i].classList.add('hidden');
    }

    // 如果新闻项少于或等于4条，隐藏"show more"按钮
    if (newsItems.length <= initialDisplay) {
        showMoreBtn.style.display = 'none';
    }

    showMoreBtn.addEventListener('click', function() {
        for (let i = currentlyShown; i < currentlyShown + initialDisplay && i < newsItems.length; i++) {
            newsItems[i].classList.remove('hidden');
        }
        
        currentlyShown += initialDisplay;

        // 如果所有新闻项都显示了，隐藏"show more"按钮
        if (currentlyShown >= newsItems.length) {
            showMoreBtn.style.display = 'none';
        }
    });
});