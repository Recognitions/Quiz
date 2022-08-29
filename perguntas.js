export function perguntas(){
    const array = [
        {
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
    }
    let myAwnser = array[random].alt[1]
    console.log(`Você escolheu a alternativa: ${myAwnser.quote}`)
    if(myAwnser.value==false){
        
        console.log("Você errou!")
    }
}