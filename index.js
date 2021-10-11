var width = 13
var height = 13
var allCells;
var leftTurn = true
const board = document.getElementById("board")

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
    if (leftTurn) {
        board.innerHTML = "Left Wins!"
    } else {
        board.innerHTML = "Right Wins!"

    }
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