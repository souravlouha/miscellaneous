const canvas = document.getElementById('pdf-canvas');
const context = canvas.getContext('2d');
const pageNumDisplay = document.getElementById('page-num');
let pdfDoc = null;
let currentPage = 1;

// Load the pre-inserted PDF file
const url = 'Load.pdf'; // Path to your pre-inserted PDF

function loadPDF() {
    pdfjsLib.getDocument(url).promise.then(pdf => {
        pdfDoc = pdf;
        currentPage = 1;
        renderPage(currentPage);
        pageNumDisplay.textContent = currentPage;
    });
}

function renderPage(pageNum) {
    pdfDoc.getPage(pageNum).then(page => {
        const viewport = page.getViewport({ scale: 1 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        page.render(renderContext);
    });
}

// Navigation buttons
document.getElementById('prev').addEventListener('click', () => {
    if (pdfDoc && currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
        pageNumDisplay.textContent = currentPage;
    }
});

document.getElementById('next').addEventListener('click', () => {
    if (pdfDoc && currentPage < pdfDoc.numPages) {
        currentPage++;
        renderPage(currentPage);
        pageNumDisplay.textContent = currentPage;
    }
});

// Initialize PDF on page load
loadPDF();
