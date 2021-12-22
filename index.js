/*
Instruction page
*/

const instructions = document.getElementById("instruction-page")
document.getElementById("instruction-start").addEventListener("click", function() {
    instructions.style.display = "none"
})
if (localStorage.getItem("skip") == "true") {
    instructions.style.display = "none"
    document.getElementById("check").style.backgroundColor = "#75533ad2"
}
document.getElementById("instruction-do-not-show").addEventListener("click", function() {
    if (localStorage.getItem("skip") == "true") {
        localStorage.setItem("skip", "false")
        document.getElementById("check").style.backgroundColor = "#d8bda9"
    } else {
        localStorage.setItem("skip", "true")
        document.getElementById("check").style.backgroundColor = "#75533ad2"
    }
})
document.getElementById("skip").addEventListener("click", function() {
    instructions.style.display = "none"
})
let img;
for (let i = 1; i < 7; i++) {
    img = document.getElementById("img" + i);
    if (img.complete) {
        document.getElementById("loader" + i).style.display = "none"
    } else {
        document.getElementById("img" + i).addEventListener("load", function() {
            document.getElementById("loader" + i).style.display = "none"
        })
    }
}

/*
game page
 */
var width = 13
var height = 13
var allCells;
var leftTurn = true
const board = document.getElementById("board")
const choose = document.getElementById("choose")
const left = document.getElementById("left")
const right = document.getElementById("right")
document.getElementById("menu-restart").addEventListener("click", restart);

function restart() {
    board.innerHTML = ""
    board.appendChild(choose)
    left.style.backgroundColor = "#75533a"
    right.style.backgroundColor = "#75533a"
}

document.getElementById("instructions").addEventListener("click", function() {
    instructions.style.display = "initial"
})


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
    var window_width = window.screen.width;
    var window_height = window.screen.height;
    // height = Number(document.getElementById("height").value)
    // width = Number(document.getElementById("width").value)
    document.documentElement.style.setProperty('--width', width)
        // if (window_height / height < window_width / width) {
        //     document.documentElement.style.setProperty('--cell-size', ((1 - 0.25) / height) * 100 + "vh")
        //     if (window_width < 550) {
        //         document.documentElement.style.setProperty('--cell-size', ((1 - 0.4) / height) * 100 + "vh")

    //     }
    // } else {
    //     document.documentElement.style.setProperty('--cell-size', ((1 - 0.25) / width) * 100 + "vw")
    // }
    document.documentElement.style.setProperty('--cell-size', (450 / width) + "px")
    leftTurn = true
    left.style.backgroundColor = "transparent"

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
    board.removeChild(choose)
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
    } else if (e.classList.contains("red") && !leftTurn) {
        e.classList.remove("green", "red", "blue", "hover")

    } else if (e.classList.contains("blue") && leftTurn) {
        console.log("here")
        e.classList.remove("green", "red", "blue", "hover")
    } else {
        return
    }
    checkWins()
    leftTurn = !leftTurn
    if (leftTurn) {
        left.style.backgroundColor = "transparent"
        right.style.backgroundColor = "#75533a"
    } else {
        right.style.backgroundColor = "transparent"
        left.style.backgroundColor = "#75533a"
    }

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
        board.innerHTML = ""
        board.appendChild(choose)
        left.style.backgroundColor = "#75533a"
        right.style.backgroundColor = "#75533a"
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
    } else if (e.classList.contains("blue")) {
        if (leftTurn) {
            e.classList.add("hover")
        }

    } else if (e.classList.contains("red")) {
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