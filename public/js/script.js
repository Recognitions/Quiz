import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { array } from './perguntas.js';

function clear(){
    document.querySelector("main").innerHTML=`
    <h1></h1>
    <label></label>
    <div id="inputs">

    </div>
    `
}
function lose(){
    const lose = document.getElementById("lose")
    lose.classList.add("active")
}
function win(){
    const win = document.getElementById("win")
    win.classList.add("active")
}

function setScore(nick){
    const newPlayer = {
        id:uuidv4(),
        name:nick,
        points:points
    }
    const players = localStorage.getItem("players")
    const player = players ? JSON.parse(players) : []
    localStorage.setItem("players",JSON.stringify([...player,newPlayer]))
}

let points = 1
function questions(){
    const name = document.getElementById("name").value
    document.querySelector("main").style.visibility="visible"
    document.querySelector(".register").style.visibility="hidden"
    if(array.length>0){
        let random = Math.floor(Math.random()*array.length)
        const mainTitle = document.querySelector(`main h1`)
        mainTitle.innerHTML=array[random].title
        const mainLabel = document.querySelector(`main label`)
        mainLabel.innerHTML=array[random].text
        for (let index = 0; index < array[random].alt.length; index++) {
            const element = array[random].alt[index];
            const inputs = document.querySelector("#inputs")
            const div = document.createElement("div")
            div.innerHTML=`<button id="A${element.quote}">${element.text}</button>`
            inputs.appendChild(div)
            document.querySelector(`#A${element.quote}`).addEventListener("click",()=>{
                document.querySelector(`#A${element.quote}`).disabled
                if(element.value==true){
                    clear()
                    questions()
                    points+=1
                }else{
                    clear()
                    lose()
                    setScore(name)
                }
            })
        }
        array.splice(random,1)
    }else{
        win()
        setScore(name)
    }
    document.getElementById("reset").addEventListener("click",()=>{
        document.location.href="./"
    })
    document.getElementById("new").addEventListener("click",()=>{
        document.location.href="./"
    })
}
document.getElementById("create").addEventListener("submit",(e)=>{
    e.preventDefault()
    questions()
})