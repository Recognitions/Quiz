export function questions(){
    document.querySelector("main").innerHTML=`
        <label></label>
        <div id="inputs">

        </div>
    `
    const array = [
        {
            id: 1,
            title: "Questão de fato histórico.",
            text: "Quem descobriu o Brasil?",
            alt: [
                {
                    quote: "A",
                    text: "Eu",
                    value: false
                },
                {
                    quote: "B",
                    text: "Sua mãe",
                    value: false
                },
                {
                    quote: "C",
                    text: "Pedro",
                    value: true
                }
            ]
        },
        {
            id: 2,
            title: "Questão de lógica",
            text: "Quanto é dois mais dois dividido por dois?",
            alt: [
                {
                    quote: "A",
                    text: "1",
                    value: false
                },
                {
                    quote: "B",
                    text: "3",
                    value: true
                },
                {
                    quote: "C",
                    text: "4",
                    value: false
                }
            ]
        }
    ]
    let random = Math.floor(Math.random()*array.length)
    console.log(`
            Tipo: ${array[random].title}
        Pergunta: ${array[random].text}
    `)
    for (let index = 0; index < array[random].alt.length; index++) {
        const element = array[random].alt[index];
        console.log(`
            (${element.quote}) ${element.text}
        `)
        
        const inputs = document.querySelector("#inputs")
        const div = document.createElement("div")
        div.innerHTML=`
            <button id="A${element.quote}">${element.text}</button>
        `
        inputs.appendChild(div)
        document.querySelector(`#A${element.quote}`).addEventListener("click",()=>{
            document.querySelector(`#A${element.quote}`).disabled
            if(element.value==true){
                let time = 3
                for (let t = 0; t <= time; t++) {
                    setTimeout(()=>{
                        document.querySelector("h1").innerText="Você acertou! próxima pergunta em: "+((time)-t)
                        if(t==(time-1)){
                            questions()
                        }
                    },1000*t)
                }
            }else{
                console.log("Errou")
            }
        })
        
    }
    let myAwnser = array[random].alt[2]
    console.log(`Você escolheu a alternativa: ${myAwnser.quote}`)
    if(myAwnser.value==false){
        console.log("Resultado: Errado!")
    }else{
        console.log("Resultado: Correto!")
    }
    array.splice(random,1)
}

