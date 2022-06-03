const btn = document.getElementById('btn');

btn.addEventListener('click', function() {
  let RGB=generateRGB() 
  document.body.style.backgroundColor = RGB
})

function generateRGB() {
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)

    return `rgb(${r}, ${g}, ${b})`;
}