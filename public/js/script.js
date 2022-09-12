import { v4 as uuidv4 } from 'https://jspm.dev/uuid'
import { array } from './perguntas.js'
import { openModal,closeModal } from './modal.js'

function clear(){
    document.querySelector("main").innerHTML=`
        <h1></h1>
        <label></label>
        <div id="inputs">

        </div>
    `
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
function playSound(url){
    const audio = new Audio(`public/sound/${url}.mp3`)
    audio.play()
}

function ranking(){
    const showPlayers = document.getElementById("showPlayers")
    showPlayers.innerHTML=""
    const players = JSON.parse(localStorage.getItem("players"))
    const rankingArray = players.sort((a,b)=>{return b.points - a.points})
    for(let i=0; i<10;i++){
        const div = document.createElement("div")
        div.classList.add("topPlayer")
        div.innerHTML=`
            <div>${rankingArray[i].name}</div>
            <div title="Pontos">${rankingArray[i].points}🪙</div>
            
        `
        showPlayers.appendChild(div)
    }
    document.getElementById("ranking").addEventListener("click",()=>{
        closeModal("#ranking")
    })
}

let points = 1
function questions(){
    const name = document.getElementById("name").value
    openModal("main")
    closeModal(".register")
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
            div.innerHTML=`<button id="A${element.quote}">(${element.quote}) ${element.text}</button>`
            inputs.appendChild(div)
            document.querySelector(`#A${element.quote}`).addEventListener("click",()=>{
                document.querySelector(`#A${element.quote}`).disabled
                if(element.value==true){
                    clear()
                    questions()
                    points+=1
                    playSound("point")
                }else{
                    clear()
                    openModal("#lose")
                    setScore(name)
                }
            })
            document.addEventListener("keydown",(e)=>{
                const key = (e.key).toUpperCase()
                if(key==element.quote && element.value==true){
                    clear()
                    questions()
                    points+=1
                    playSound("point")
                }else if(key==element.quote && element.value==false){
                    clear()
                    openModal("#lose")
                    setScore(name)
                }
            })
        }
        array.splice(random,1)
    }else{
        openModal("#win")
        setScore(name)
        playSound("win")
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

document.querySelector("#openRank").addEventListener("click",()=>{
    openModal("#ranking")
    ranking()
})