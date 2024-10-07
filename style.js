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



