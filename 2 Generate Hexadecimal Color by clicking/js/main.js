const btn = document.getElementById('btn');
const output=document.getElementById('output')


btn.addEventListener('click', function() {
  let HEX=generateHEX()
  document.body.style.backgroundColor = HEX
  output.value=HEX

})

function generateHEX() {
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)

    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}