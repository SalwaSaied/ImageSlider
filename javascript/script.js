// script.js  
const slides = document.querySelectorAll('.slide');  
const nextButton = document.querySelector('.next');  
const prevButton = document.querySelector('.prev');  
const dots = document.querySelectorAll('.dot');  
let currentIndex = 0;  
let interval;  

function showSlide(index) {  
    slides.forEach((slide, i) => {  
        slide.classList.remove('active');  
        dots[i].classList.remove('active');  
    });  
    slides[index].classList.add('active');  
    dots[index].classList.add('active');  
    updateSlidePosition(index);  
}  

function updateSlidePosition(index) {  
    const slidesContainer = document.querySelector('.slides');  
    const offset = -index * 100; 
    slidesContainer.style.transform = `translateX(${offset}%)`;  
}  

function nextSlide() {  
    currentIndex = (currentIndex + 1) % slides.length;  
    showSlide(currentIndex);  
}  

function prevSlide() {  
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;  
    showSlide(currentIndex);  
}  

function startAutoSlide() {  
    interval = setInterval(nextSlide, 7000);  
}  

function stopAutoSlide() {  
    clearInterval(interval);  
}  

nextButton.addEventListener('click', () => {  
    stopAutoSlide();  
    nextSlide();  
    startAutoSlide();  
});  

prevButton.addEventListener('click', () => {  
    stopAutoSlide();  
    prevSlide();  
    startAutoSlide();  
});  

dots.forEach((dot, index) => {  
    dot.addEventListener('click', () => {  
        stopAutoSlide();  
        currentIndex = index;  
        showSlide(currentIndex);  
        startAutoSlide();  
    });  
});  

// Pause on hover  
const slider = document.querySelector('.slider');  
slider.addEventListener('mouseover', stopAutoSlide);  
slider.addEventListener('mouseout', startAutoSlide);  

// Start the auto slider  
startAutoSlide();  
showSlide(currentIndex);

// for touch screens
let startX = null; // Variable to store the start touch position  

// Functions to handle touch start, move, and end  
function handleTouchStart(event) {  
    startX = event.touches[0].clientX; // Capture the initial touch position  
}  

function handleTouchMove(event) {  
    if (!startX) {  
        return;  
    }  
    const currentX = event.touches[0].clientX;  
    const diffX = startX - currentX; // Calculate the difference  

    // If the difference exceeds a certain threshold, we'll consider it a swipe  
    if (Math.abs(diffX) > 50) { // 50px is a common threshold  
        if (diffX > 0) {  
            nextSlide(); // Swipe left -> next slide  
        } else {  
            prevSlide(); // Swipe right -> previous slide  
        }  
        startX = null; // Reset the initial touch position  
    }  
}  

// Add event listeners for touch events  
slider.addEventListener('touchstart', handleTouchStart);  
slider.addEventListener('touchmove', handleTouchMove);