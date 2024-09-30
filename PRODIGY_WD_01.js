document.getElementById('search-btn').addEventListener('click', function() {
    const destination = document.getElementById('where-to').value;
    const date = document.getElementById('when').value;
    if (destination && date) {
        alert(`Searching for trips to ${destination} on ${date}!`);
    } else {
        alert('Please fill in both fields.');
    }
});
window.onscroll = function() { changeNavbarColor() };

function changeNavbarColor() {
    const navbar = document.querySelector(".navbar");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('nav a[href="#destinations"]').addEventListener('click', function(event) {
      event.preventDefault();
      document.getElementById('top-destinations').scrollIntoView({ behavior: 'smooth' });
  });
});
const slider = document.querySelector('.destination-slider');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; 
  slider.scrollLeft = scrollLeft - walk;
});

