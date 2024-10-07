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

async function updateStarCount() {
    const repo = 'Carolzhangzz'; // 替换成你的 GitHub 仓库
    const url = `https://api.github.com/repos/${repo}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.stargazers_count !== undefined) {
            document.getElementById('star-count').textContent = `★ ${data.stargazers_count}`;
        } else {
            console.error('Error fetching stargazer count:', data);
        }
    } catch (error) {
        console.error('Error fetching repository data:', error);
    }
}

// 页面加载时更新星星数
document.addEventListener('DOMContentLoaded', updateStarCount);