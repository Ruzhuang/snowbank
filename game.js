var width = 9
var height = 9
var allCells;
var leftTurn = true
const board = document.getElementById("page")

startGame()

function startGame() {
    var window_width = window.screen.width;
    var window_height = window.screen.height;
    // height = Number(document.getElementById("height").value)
    // width = Number(document.getElementById("width").value)
    document.documentElement.style.setProperty('--width', width)
    if (window_height / height < window_width / width) {
        document.documentElement.style.setProperty('--cell-size', ((1 - 0.25) / height) * 100 + "vh")
        if (window_width < 550) {
            document.documentElement.style.setProperty('--cell-size', ((1 - 0.4) / height) * 100 + "vh")

        }
    } else {
        document.documentElement.style.setProperty('--cell-size', ((1 - 0.25) / width) * 100 + "vw")
    }

    leftTurn = true

    allCells = new Array(height)
    for (let i = 0; i < height; i++) {
        allCells[i] = new Array(width)
        for (let j = 0; j < width; j++) {
            if (i % 2 == 0 && j % 2 == 0) {
                allCells[i][j] = document.createElement("div")
                allCells[i][j].classList.add("cell", "green")
                allCells[i][j].addEventListener("mouseover", function() {
                    handleOver(this, i, j)
                })
                allCells[i][j].addEventListener("mouseout", function() {
                    handleOut(this, i, j)
                })

            } else if (i % 2 == 0 && j % 2 == 1) {
                allCells[i][j] = document.createElement("div")
                allCells[i][j].classList.add("cell", "red")
                allCells[i][j].addEventListener("mouseover", function() {
                    handleOver(this, i, j)
                })
                allCells[i][j].addEventListener("mouseout", function() {
                    handleOut(this, i, j)
                })
            } else if (j % 2 == 0) {
                allCells[i][j] = document.createElement("div")
                allCells[i][j].classList.add("cell", "blue")
                allCells[i][j].addEventListener("mouseover", function() {
                    handleOver(this, i, j)
                })
                allCells[i][j].addEventListener("mouseout", function() {
                    handleOut(this, i, j)
                })
            } else if (j % 2 == 1) {
                allCells[i][j] = document.createElement("div")
                allCells[i][j].classList.add("cell")
            }
            board.appendChild(allCells[i][j])
        }
    }
}

function handleOver(e, i, j) {
    e.style.opacity = "0.2"

}

function handleOut(e, i, j) {
    e.style.opacity = "1"
}

// const cell = document.getElementById("cell")
// const green = document.getElementsByClassName("green")
// const red = document.getElementsByClassName("red")
// green.forEach(green => {
//     cell.addEventListener('click', handleClick, { once: true })
//         // cell.addEventListener('mouseover', handleHover)
//         // cell.addEventListener('mouseout', handleOut)
// })

// function handleClick(e) {

// }