const carousel = document.querySelector(".product-carousel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;
const images = carousel.querySelectorAll("img");
const totalImages = images.length;

function showImage(index) {
    images.forEach((image, idx) => {
        if (idx === index) {
            image.style.display = "block";
        } else {
            image.style.display = "none";
        }
    });
}

function prevImage() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    showImage(currentIndex);
}

function nextImage() {
    currentIndex = (currentIndex + 1) % totalImages;
    showImage(currentIndex);
}

prevBtn.addEventListener("click", prevImage);
nextBtn.addEventListener("click", nextImage);

// Exibir a primeira imagem inicialmente
showImage(currentIndex);
