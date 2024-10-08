document.addEventListener('DOMContentLoaded', function() {
    const bibtexToggles = document.querySelectorAll('.bibtex-toggle');
    
    bibtexToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const bibtexContent = this.parentNode.nextElementSibling;
            if (bibtexContent.style.display === 'none') {
                bibtexContent.style.display = 'block';
                this.innerHTML = '<i class="fas fa-quote-right"></i> Hide BibTeX';
            } else {
                bibtexContent.style.display = 'none';
                this.innerHTML = '<i class="fas fa-quote-right"></i> BibTeX';
            }
        });
    });
});