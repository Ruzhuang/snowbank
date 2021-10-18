var width = 13
var height = 13
var allCells;
var leftTurn = true
const board = document.getElementById("board")

document.getElementById("9").addEventListener("click", choose_9)

function choose_9() {
    width = 9
    height = 9
    startGame()
}

document.getElementById("11").addEventListener("click", choose_11)

function choose_11() {
    width = 11
    height = 11
    startGame()
}

document.getElementById("13").addEventListener("click", choose_13)

function choose_13() {
    width = 13
    height = 13
    startGame()
}

document.getElementById("15").addEventListener("click", choose_15)

function choose_15() {
    width = 15
    height = 15
    startGame()
}

document.getElementById("17").addEventListener("click", choose_17)

function choose_17() {
    width = 17
    height = 17
    startGame()
}



function startGame() {
    board.innerHTML = ""
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

            } else if (i % 2 == 0 && j % 2 == 1) {
                allCells[i][j] = document.createElement("div")
                allCells[i][j].classList.add("cell", "red")

            } else if (j % 2 == 0) {
                allCells[i][j] = document.createElement("div")
                allCells[i][j].classList.add("cell", "blue")
            } else if (j % 2 == 1) {
                allCells[i][j] = document.createElement("div")
                allCells[i][j].classList.add("cell")
            }
            allCells[i][j].addEventListener("mouseover", function() {
                handleOver(this, i, j)
            })
            allCells[i][j].addEventListener("mouseout", function() {
                handleOut(this, i, j)
            })
            allCells[i][j].addEventListener("click", function() {
                handleClick(this, i, j)
            })
            board.appendChild(allCells[i][j])
        }
    }
    document.getElementById("choose").classList.add("disappear")
}

function handleClick(e, i, j) {
    console.log(leftTurn)
    if (e.classList.contains("green")) {
        e.classList.remove("green", "red", "blue", "hover")
        if (i > 0) {
            allCells[i - 1][j].classList.remove("green", "red", "blue", "hover")
        }
        if (i < height - 1) {
            allCells[i + 1][j].classList.remove("green", "red", "blue", "hover")
        }
        if (j > 0) {
            allCells[i][j - 1].classList.remove("green", "red", "blue", "hover")
        }
        if (j < width - 1) {
            allCells[i][j + 1].classList.remove("green", "red", "blue", "hover")
        }
    } else if (e.classList.contains("red") && leftTurn) {
        e.classList.remove("green", "red", "blue", "hover")

    } else if (e.classList.contains("blue") && !leftTurn) {
        console.log("here")
        e.classList.remove("green", "red", "blue", "hover")
    } else {
        return
    }
    checkWins()
    leftTurn = !leftTurn

}

function checkWins() {
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (allCells[i][j].classList.contains("red") ||
                allCells[i][j].classList.contains("green") ||
                allCells[i][j].classList.contains("blue")) {
                return
            }
        }
    }
    var win = document.createElement("span")
    var restart = document.createElement("button")
    restart.appendChild(document.createTextNode("Restart"))
    restart.addEventListener("click", function() {
        document.getElementById("choose").classList.remove("disappear")
    })
    board.appendChild(win)
    if (leftTurn) {
        win.innerHTML = "Left Wins!"
    } else {
        win.innerHTML = "Right Wins!"
    }
    win.appendChild(restart)
}

function handleOver(e, i, j) {
    if (e.classList.contains("green")) {
        e.classList.add("hover")
        if (i > 0) {
            allCells[i - 1][j].classList.add("hover")
        }
        if (i < height - 1) {
            allCells[i + 1][j].classList.add("hover")
        }
        if (j > 0) {
            allCells[i][j - 1].classList.add("hover")
        }
        if (j < width - 1) {
            allCells[i][j + 1].classList.add("hover")
        }
    } else if (e.classList.contains("red")) {
        if (leftTurn) {
            e.classList.add("hover")
        }

    } else if (e.classList.contains("blue")) {
        if (!leftTurn) {
            e.classList.add("hover")
        }
    }
}

function handleOut(e, i, j) {
    e.classList.remove("hover")
    if (i > 0) {
        allCells[i - 1][j].classList.remove("hover")
    }
    if (i < height - 1) {
        allCells[i + 1][j].classList.remove("hover")
    }
    if (j > 0) {
        allCells[i][j - 1].classList.remove("hover")
    }
    if (j < width - 1) {
        allCells[i][j + 1].classList.remove("hover")
    }
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