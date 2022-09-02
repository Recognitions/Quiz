import { array } from './perguntas.js';


function clear(){
    document.querySelector("main").innerHTML=`
    <h1></h1>
    <label></label>
    <div id="inputs">

    </div>
    `
}
function lose(state){
    const lose = document.getElementById("lose")
    if(state=="show"){
        lose.style.display="flex"
    }else if(state=="hide"){
        lose.style.display="none"
    }
}
function win(state){
    const win = document.getElementById("win")
    if(state=="show"){
        win.style.display="flex"
    }else if(state=="hide"){
        win.style.display="none"
    }
}

function questions(){
    if(array.length>0){
        let random = Math.floor(Math.random()*array.length)
        document.querySelector(`main h1`).innerText=array[random].title
        document.querySelector(`main label`).innerText=array[random].text
        for (let index = 0; index < array[random].alt.length; index++) {
            const element = array[random].alt[index];
            const inputs = document.querySelector("#inputs")
            const div = document.createElement("div")
            div.innerHTML=`
            <button id="A${element.quote}">${element.text}</button>
            `
            inputs.appendChild(div)
            document.querySelector(`#A${element.quote}`).addEventListener("click",()=>{
                
                document.querySelector(`#A${element.quote}`).disabled
                if(element.value==true){
                    clear()
                    questions()
                }else{
                    clear()
                    lose("show")
                }
            })
        }
        array.splice(random,1)
    }else{
        win("show")
    }
}
questions()

document.getElementById("reset").addEventListener("click",()=>{
    document.location.href="./"
})