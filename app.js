// my app
const rates = document.querySelectorAll('li')
const result = document.getElementById('result')
const boxOne = document.getElementById('rating-start')
const boxTwo = document.getElementById('rating-end')
const btn = document.querySelector('button')
const choiceFromLocal = JSON.parse(localStorage.getItem('myChoice'))
let myChoice = []

const checkChoiceExist = async ()=>{
    try {
        let check = new Promise((resolve, reject)=>{
            if (choiceFromLocal) {
                myChoice = choiceFromLocal
                result.textContent = myChoice[0]
                resolve(console.log('Scelta già presa'))
                let alert = document.createElement('p')
                alert.textContent = 'Scelta già effettuata!'
                boxTwo.appendChild(alert)
            } else {
                reject('In attesa di una scelta...')
            }
        })       
        let pass = await check
        check.then(()=>{
            pass = swipeBox()
        })
    } catch (error) {
        console.log(error)
    }
}

checkChoiceExist()

rates.forEach(element => {
    element.addEventListener('click', ()=>{        
        rates.forEach((element)=> {
                element.classList.remove('active');
            })
        element.classList.add('active')
    }, false)
    
});

btn.addEventListener('click', (e)=>{
    e.preventDefault()
    rates.forEach(element => {        
        if (element.classList.contains('active')) {
            result.textContent = element.dataset.id
            myChoice.push(element.dataset.id)
            localStorage.setItem('myChoice', JSON.stringify(myChoice))
        }      
    })
    swipeBox()
})

function swipeBox(){
    boxOne.classList.add('hidden')
    boxTwo.classList.remove('hidden')
}