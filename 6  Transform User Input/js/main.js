const btn = document.getElementById('btn');
const output=document.getElementById('output')
const copyBtn=document.getElementById('copy-btn')

let p=null
let color=null

btn.addEventListener('click', function() {
  let HEX=generateHEX()
  document.body.style.backgroundColor = HEX
  output.value=HEX.substring(1)
  color=output.value
})

copyBtn.addEventListener('click', function() {
  if(isHexValid(color)){
      navigator.clipboard.writeText(output.value)
      console.log('okkk')
    if(p!=null) {
      p.remove()
      p=null
    }
    else{
      toastMeaasge(`#${output.value} copied`)
    }
  }
  else{
    alert(`invalid color code: #${output.value}`)
  }
  
})

output.addEventListener('keyup', function(e){
  color = e.target.value
  output.value=color.toUpperCase()
  if(color && isHexValid(color)){
    document.body.style.background = `#${color}`
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

function isHexValid(color){
  if(color.length!=6){
    return false
  }
  
  return /^[0-9A-Fa-f]{6}$/i.test(color)  //REGEX
}