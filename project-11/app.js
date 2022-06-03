/**
 * Date: 02-06-2022
 * Author: Md.Tarikul Islam juel
 * Description: Color picker application 
 */

// Globals
let p=null
let HexWithOutHash=null
let RED=null
let GREEN=null
let BLUE=null
let stateCopyBtnHEX=true
let stateCopyBtnRGB=false
let sound =new Audio('./copy-sound.wav')

const defaultPresetColors = [
	'#ffcdd2',
	'#f8bbd0',
	'#e1bee7',
	'#ff8a80',
	'#ff80ab',
	'#ea80fc',
	'#b39ddb',
	'#9fa8da',
	'#90caf9',
	'#b388ff',
	'#8c9eff',
	'#82b1ff',
	'#03a9f4',
	'#00bcd4',
	'#009688',
	'#80d8ff',
	'#84ffff',
	'#a7ffeb',
	'#c8e6c9',
	'#dcedc8',
	'#f0f4c3',
	'#b9f6ca',
	'#ccff90',
	'#ffcc80',

];

const generateRandomColor = document.getElementById('generate-random-color');
const copyBtnHEX=document.getElementById('color-mode-hex')
const copyBtnRGB=document.getElementById('color-mode-rgb')
const copyBtn = document.getElementById('copy-to-clipboard')

const colorDisplayed = document.getElementById('color-display')
const inputHEX = document.getElementById('input-hex')
const inputRGB= document.getElementById('input-rgb')
const colorSliderRed = document.getElementById('color-slider-red')
const colorSliderRedLabel = document.getElementById('color-slider-red-label')
const colorSliderGreen = document.getElementById('color-slider-green')
const colorSliderGreenLabel = document.getElementById('color-slider-green-label')
const colorSliderBlue = document.getElementById('color-slider-blue')
const colorSliderBlueLabel = document.getElementById('color-slider-blue-label')
const presetColorParent= document.getElementById('preset-colors')

// onload handler
window.onload = () => {
	main();
}

// main or boot function, this function will take care of getting all the DOM references
function main() {
	displayColorBoxs(presetColorParent,defaultPresetColors)
}

// event handlers
generateRandomColor.addEventListener('click', function() {
	let DECIMEL=generateDecimel()
	let HEX=generateHEX(DECIMEL)
	let RGB=generateRGB(DECIMEL)

	HexWithOutHash=HEX.substring(1)

	colorDisplayed.style.backgroundColor = HEX
	inputHEX.value=HEX.substring(1)
	inputRGB.value=RGB
	colorSliderRed.value=DECIMEL.RED
	colorSliderRedLabel.innerText=DECIMEL.RED
	colorSliderGreen.value=DECIMEL.GREEN
	colorSliderGreenLabel.innerText=DECIMEL.GREEN
	colorSliderBlue.value=DECIMEL.BLUE
	colorSliderBlueLabel.innerText=DECIMEL.BLUE
  })

inputHEX.addEventListener('keyup', function(e){
	HexWithOutHash = e.target.value
	decimel=hex2decimel(HexWithOutHash)
	inputHEX.value=HexWithOutHash.toUpperCase()
	if(HexWithOutHash && isHexValid(HexWithOutHash)){
		colorDisplayed.style.backgroundColor = `#${HexWithOutHash}`
		colorSliderRed.value=decimel.RED
		colorSliderRedLabel.innerText=decimel.RED
		colorSliderGreen.value=decimel.GREEN
		colorSliderGreenLabel.innerText=decimel.GREEN
		colorSliderBlue.value=decimel.BLUE
		colorSliderBlueLabel.innerText=decimel.BLUE
		inputRGB.value=generateRGB(decimel)
	}
  })

colorSliderRed.addEventListener('change', function(){
		RED=parseInt(colorSliderRed.value)
		GREEN=parseInt(colorSliderGreen.value)
		BLUE=parseInt(colorSliderBlue.value)

	    let hex= generateHEX({RED,GREEN,BLUE})
	    colorDisplayed.style.backgroundColor = hex
		colorSliderRedLabel.innerText=RED
		inputHEX.value=generateHEX({RED,GREEN,BLUE}).substring(1)
		inputRGB.value=generateRGB({RED,GREEN,BLUE})
  })

colorSliderGreen.addEventListener('change', function(){
		RED=parseInt(colorSliderRed.value)
		GREEN=parseInt(colorSliderGreen.value)
		BLUE=parseInt(colorSliderBlue.value)

	    let hex= generateHEX({RED,GREEN,BLUE})
	    colorDisplayed.style.backgroundColor = hex
		colorSliderGreenLabel.innerText=GREEN
		inputHEX.value=generateHEX({RED,GREEN,BLUE}).substring(1)
		inputRGB.value=generateRGB({RED,GREEN,BLUE})
})


colorSliderBlue.addEventListener('change', function(){
		RED=parseInt(colorSliderRed.value)
		GREEN=parseInt(colorSliderGreen.value)
		BLUE=parseInt(colorSliderBlue.value)

	    let hex= generateHEX({RED,GREEN,BLUE})
	    colorDisplayed.style.backgroundColor = hex
		colorSliderBlueLabel.innerText=BLUE
		inputHEX.value=generateHEX({RED,GREEN,BLUE}).substring(1)
		inputRGB.value=generateRGB({RED,GREEN,BLUE})
})

copyBtnHEX.addEventListener('change', function(e){
	if(e.target.checked){
		stateCopyBtnHEX=true
		stateCopyBtnRGB=false
	}
})
copyBtnRGB.addEventListener('change', function(e){
	if(e.target.checked){
		stateCopyBtnHEX=false
		stateCopyBtnRGB=true
	}
})

copyBtn.addEventListener('click', function(){
	if(stateCopyBtnHEX==true){
		console.log("hex")
		if(isHexValid(HexWithOutHash || "FFFFFF")){
			navigator.clipboard.writeText(inputHEX.value)
		  if(p!=null) {
			p.remove()
			p=null
			toastMeaasge(`#${inputHEX.value} copied`)
		  }
		  else{
			toastMeaasge(`#${inputHEX.value} copied`)
		  }
		}
		else{
		  alert(`invalid color code: #${inputHEX.value}`)
		}
	}
	else if(stateCopyBtnRGB==true){
		if(isHexValid(HexWithOutHash ||"FFFFFF")){
			navigator.clipboard.writeText(inputRGB.value)
		  if(p!=null) {
			p.remove()
			p=null
			toastMeaasge(`${inputRGB.value}`)
		  }
		  else{
			toastMeaasge(`${inputRGB.value}`)
		  }
		}
		else{
		  alert(`invalid color code: ${inputRGB.value}`)
		}
	}
})

presetColorParent.addEventListener('click', function(e){
	if(e.target.className=='color-box'){
		navigator.clipboard.writeText(e.target.getAttribute('data-color'))
		sound.volume=0.5
		sound.play()
	}
})

// DOM functions
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

// utilities function
function generateDecimel(){
	const RED = Math.floor(Math.random() * 255)
	const GREEN = Math.floor(Math.random() * 255)
	const BLUE = Math.floor(Math.random() * 255)
	
	return {
	  RED: RED,
	  GREEN: GREEN,
	  BLUE: BLUE
	}
  }

  function generateHEX({RED,GREEN,BLUE}) {
	let twoCode =(decimel)=>{
	  let hex= decimel.toString(16)
	  if(hex.length==1){
		return `0${hex}`
	  }
	  else if(hex.length==2){
		return hex
	  }
	}
  
	  return `#${twoCode(RED)}${twoCode(GREEN)}${twoCode(BLUE)}`.toUpperCase();
  }
  
  function generateRGB({RED,GREEN,BLUE}){
	 return `rgb(${RED},${GREEN},${BLUE})`
  }

  function hex2decimel(HEX){
	const RED = parseInt(HEX.slice(0,2),16)
	const GREEN = parseInt(HEX.slice(2,4),16)
	const BLUE = parseInt(HEX.slice(4),16)
	
	return {
	  RED: RED,
	  GREEN: GREEN,
	  BLUE: BLUE
	}
  }

  function isHexValid(HexWithOutHash){
	if(HexWithOutHash.length!=6){
	  return false
	}
	
	return /^[0-9A-Fa-f]{6}$/i.test(HexWithOutHash)  //REGEX
  }

  function createBox(color){
	  let div =document.createElement('div')
	  div.className='color-box'
	  div.style.backgroundColor=color
	  div.setAttribute('data-color',color)

	  return div
  }

  function displayColorBoxs(parent,colors){
	colors.forEach((color)=>{
		let box=createBox(color)
		parent.appendChild(box)
	})
  }
  
