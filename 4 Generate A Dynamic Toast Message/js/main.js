const btn = document.getElementById('btn');
const output=document.getElementById('output')
const copyBtn=document.getElementById('copy-btn')

let p=null

btn.addEventListener('click', function() {
  let HEX=generateHEX()
  document.body.style.backgroundColor = HEX
  output.value=HEX
})

copyBtn.addEventListener('click', function() {
  navigator.clipboard.writeText(output.value)
  if(p!=null) {
    p.remove()
    p=null
  }
  else{
    toastMeaasge(`${output.value} copied`)
  }
})

function generateHEX() {
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)

    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

function toastMeaasge(msg){
  p=document.createElement('p')
  p.innerHTML=msg
  p.classList=('toast-msg toastMeaasge-animation-in')
  document.body.appendChild(p)
  p.addEventListener('click',function(){
    p.classList.remove('toastMeaasge-animation-in')
    p.classList.add('toastMeaasge-animation-out')

    p.addEventListener('animationend',function(){
      p.remove()
      p=null
    })
  })
}