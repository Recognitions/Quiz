//console.log(md5("teste"))
function render(){
    const players = JSON.parse(localStorage.getItem("players"))
    let sortedPlayers = players ? (players.sort((a,b)=>{return b.points - a.points})).slice(0,10) : []
    console.log(players)
    const tbody = document.querySelector("tbody")
    tbody.innerHTML=""
    sortedPlayers.forEach((player)=>{
        const tr = document.createElement("tr")
        tr.innerHTML=`
            <td>${player.name}</td>
            <td>${player.points}</td>
            <td>
                <button>E</button>
                <button>X</button>
            </td>
        `
        tbody.appendChild(tr)
    });
}

function login(){
    const password = "698dc19d489c4e4db73e28a713eab07b"
    if(md5(prompt("Password"))==password){
        render()
    }else{
        login()
    }
}

document.addEventListener("DOMContentLoaded",login)

document.getElementById("clear").addEventListener("click",()=>{
    if(confirm("Confirma que deseja zerar o ranking?")==true){
        localStorage.clear()
        render()
        alert("Ranking esvaziado!")
    }
})