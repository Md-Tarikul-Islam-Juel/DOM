const btn = document.getElementById('btn');
const output=document.getElementById('output')
const copyBtn=document.getElementById('copy-btn')
const copyBtn2=document.getElementById('copy-btn2')

let p=null
let color=null

btn.addEventListener('click', function() {
  let DECIMEL=generateColorDecimel()
  let HEX=generateHEX(DECIMEL)
  let RGB=generateRGB(DECIMEL)
  document.body.style.backgroundColor = HEX
  output.value=HEX.substring(1)
  color=output.value
  output2.value=RGB
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

copyBtn2.addEventListener('click', function() {
  if(isHexValid(color)){
      navigator.clipboard.writeText(output2.value)
      console.log('okkk')
    if(p!=null) {
      p.remove()
      p=null
    }
    else{
      toastMeaasge(`#${output2.value}`)
    }
  }
  else{
    alert(`invalid color code: #${output2.value}`)
  }
  
})

output.addEventListener('keyup', function(e){
  color = e.target.value
  output.value=color.toUpperCase()
  if(color && isHexValid(color)){
    document.body.style.background = `#${color}`
    output2.value=hex2rgb(color)
  }
})

function generateColorDecimel(){
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  
  return {
    r:r,
    g:g,
    b:b
  }
}

function generateHEX({r,g,b}) {
  let twoCode =(decimel)=>{
    let hex= decimel.toString(16)
    if(hex.length==1){
      return `0${hex}`
    }
    else if(hex.length==2){
      return hex
    }
  }

    return `#${twoCode(r)}${twoCode(g)}${twoCode(b)}`.toUpperCase();
}

function generateRGB({r,g,b}){
   return `rgb(${r},${g},${b})`
}

function hex2rgb(HEX){
  let r= parseInt(HEX.slice(0,2),16)
  let g= parseInt(HEX.slice(2,4),16)
  let b= parseInt(HEX.slice(4),16)

  return `rgb(${r},${g},${b})`
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