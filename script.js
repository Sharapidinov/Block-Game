const fill = document.querySelector(`.fill`)
const strBtn = document.querySelector(`.start_btn`)
const container = document.querySelector(`.container`)
const next = document.querySelector(`.next`)
const span = document.querySelector(`.span`)
const lvlSpan = document.querySelector(`.cur-levels`)
const hard = document.querySelector(`.inp`)
const points = document.querySelector(`.points`)
const difficulty = document.querySelector(`#difficulty`)
const bestSpan = document.querySelector(`.best`)


let gamePaused = true

let currentLevel = 0
let life = 3
let p = 0
let lusep = 0
let bestPonts = 0


points.textContent = `Очки ${p} `


span.textContent = `Количество жизней =${life}`

const level1 = [
    [0,0,1,0,0,0,0],
    [0,0,2,2,0,0,0],
    [0,0,0,2,2,0,0],
    [0,0,0,0,2,0,0],
    [0,0,2,2,2,0,0],
    [0,0,2,0,0,0,0],
    [0,0,3,0,0,0,0],
]
const level2 = [
    [0,0,1,0,0,0,0],
    [0,0,2,0,0,0,0],
    [0,0,2,0,0,0,0],
    [0,0,2,0,0,0,0],
    [0,0,2,0,0,0,0],
    [0,0,2,0,0,0,0],
    [0,0,3,0,0,0,0],
]

const level3 = [
    [0,0,0,0,0,0,1],
    [0,0,0,0,0,0,2],
    [0,0,0,0,0,0,2],
    [0,0,0,0,0,0,2],
    [0,0,0,0,0,0,2],
    [0,0,0,0,0,0,2],
    [0,0,0,0,0,0,3],
]

const level4 = [
    [1,0,0,0,0,0,0],
    [2,0,0,0,0,0,0],
    [2,0,0,0,0,0,0],
    [2,0,0,0,0,0,0],
    [2,0,0,0,0,0,0],
    [2,0,0,0,0,0,0],
    [3,0,0,0,0,0,0],
]
const level5 = [
    [1,0,0,0,0,0,0,0,0,0],
    [2,2,2,0,0,0,0,0,0,0],
    [0,0,2,2,0,0,0,0,0,0],
    [0,0,0,2,0,0,0,0,0,0],
    [0,0,0,2,0,0,0,0,0,0],
    [0,0,0,2,2,0,0,0,0,0],
    [0,0,0,0,2,2,0,0,0,0],
    [0,0,0,0,0,2,2,0,0,0],
    [0,0,0,0,0,0,2,2,2,0],
    [0,0,0,0,0,0,0,0,3,0],

]


const levels = {
    0:level1,
    1:level2,
    2:level3,
    3:level4,
    4:level5,
}

const clearF = () => {
    fill.innerHTML = ``
}

const addToScores = () => {
    if (p > bestPonts){
        bestPonts = p
        bestSpan.textContent = `Лучший результат: ${bestPonts}`
    }
}

const gameOver = () => {

    if (gamePaused) return;

    p -= lusep + 2
    lusep = 0
    life--

    if (life <= 0){
        addToScores()
        difficulty.disablede = false
        currentLevel = 0
        life = 3
        lusep = 0
        alert(`Игра окончена!!`)
        console.log(`fail`)
        difficulty.disabled = false
    }

    span.textContent = `Количество жизней =${life}`
    points.textContent = `Очки ${p} `
    clearF()
    f()
    gamePaused = true

}

const levelWin = (e) => {
        e.stopPropagation()
        clearF()
        fill.innerHTML = `<div>Уровень ${currentLevel +1} пройден!</div>`
        next.hidden = false
        strBtn.hidden = true
        container.removeEventListener(`mouseover`,gameOver)
        currentLevel++
        lusep = 0
        gamePaused = true
}

const startGame = () => {
    difficulty.disabled = true
    gamePaused = false
    Array.from(fill.children).forEach(it => {
        it.classList.remove(`green`)
        it.classList.remove(`red`)
    })
    document.querySelector(`.start`).addEventListener(`mouseover`, () => {
        document.querySelector(`.finish`).addEventListener(`mouseover`, levelWin)
    })
}

const setRed = (div) => {
    div.classList.add(`red`)
    div.addEventListener(`mouseover`, gameOver)

}

const setGreen = (div) => {
    div.classList.add(`green`)

    div.addEventListener(`mouseover`, (e) => {
        e.stopPropagation()
        div.classList.add(`green`)
    })
        div.addEventListener(`mouseover`,function addPoints ()  {
            if (!gamePaused){

                lusep += +difficulty.value
                p += +difficulty.value
                points.textContent = `Очки ${p} `
                div.removeEventListener(`mouseover`,addPoints)
        }
    })

}

const setStart = (div) => {
    div.classList.add(`blue`, `start`)
    div.textContent = `S`
    div.addEventListener(`mouseover`, (e) => {
        e.stopPropagation()
        container.addEventListener(`mouseover`, gameOver, {once:true})
    })

}

const setFinish = (div) => {
    div.classList.add(`black`, `finish`)
    div.textContent = `F`

}


const f = () =>{
    lvlSpan.textContent = `Текущий уровень = ${currentLevel +1}`
    fill.innerHTML = ``

    lusep = 0


    if(!levels[currentLevel]){
        addToScores()
        alert(`Игра пройдена`)
        life = 3
        currentLevel = 0
        p = 0
        points.textContent = `Очки ${p} `
        span.textContent = `Количество жизней =${life}`
        difficulty.disabled = false
        f()
        return;
    }


    const size = `${100 / levels[currentLevel][0].length}%`

    levels[currentLevel].forEach(row => {
        row.forEach(item => {
            const div = document.createElement(`div`)
            div.style.width = size
            div.style.height = size
            div.classList.add(`square`)
            if(difficulty.value !== `2` && difficulty.value !== `4`){
                div.classList.add(`square-border`)
            }
            if(item === 0){
                setRed(div)

            } else if(item === 2){
                setGreen(div)

            } else if(item === 1){
                setStart(div)

            } else if(item === 3){
                setFinish(div)

            }
            fill.append(div)
        })
    })
    Array.from(document.querySelectorAll(`.red`)).forEach(it => {
        it.addEventListener(`mouseover`, () => {
            document.querySelector(`.finish`).removeEventListener(`mouseover`,levelWin)

        })
    })
}
f()

strBtn.addEventListener(`click`, () => {
    startGame()
})
next.addEventListener(`click`, () => {
    f()
    next.hidden = true
    strBtn.hidden = false

})

difficulty.addEventListener(`change`, () => {
    const square = Array.from(document.querySelectorAll(`.square`))
    if (difficulty.value === `1`){
        fill.classList.remove(`hardmode`)
        square.forEach(it => it.classList.add(`square-border`))
    }else if (difficulty.value === `2`) {
        fill.classList.remove(`hardmode`)
        square.forEach(it => it.classList.remove(`square-border`))
    } else if (difficulty.value === `3`) {
        square.forEach(it => it.classList.add(`square-border`))
        fill.classList.add(`hardmode`)
    }else if (difficulty.value === `4`){
        square.forEach(it => it.classList.remove(`square-border`))
        fill.classList.add(`hardmode`)
    }

})