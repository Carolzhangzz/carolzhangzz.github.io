document.addEventListener('DOMContentLoaded', function() {
    const bibtexToggles = document.querySelectorAll('.bibtex-toggle');
    
    bibtexToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            // Find the bibtex-content that is a sibling of the parent links container
            const bibtexContent = this.closest('.pub-item').querySelector('.bibtex-content');
            
            if (bibtexContent.style.display === 'none' || bibtexContent.style.display === '') {
                bibtexContent.style.display = 'block';
                this.innerHTML = '<i class="fas fa-times"></i> Hide BibTeX';
            } else {
                bibtexContent.style.display = 'none';
                this.innerHTML = '<i class="fas fa-quote-right"></i> BibTeX';
            }
        });
    });
});
