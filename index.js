const buttonColours = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = []
let level = 0
let started = false

function restart() {
    level = 0
    started = false
    gamePattern = []
    userClickedPattern = []
}

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4)
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).animate({ opacity: "0.2" }, 250).animate({ opacity: "1" }, 250);
    playSound(randomChosenColour)
    level++
    $("h1").text(`Level ${level}`)

}

function playSound(name) {
    const sound = new Audio(`./sounds/${name}.mp3`)
    sound.play()
}

function animatePress(currentColour) {
    $(`#${currentColour}`).addClass("pressed")
    setTimeout(() => {
        $(`#${currentColour}`).removeClass("pressed")
    }, 150)
}

function wrong() {
    $(`body`).addClass("game-over")
    setTimeout(() => {
        $(`body`).removeClass("game-over")
    }, 200)
}

function checker(computerPattern, userPattern) {

    if (userPattern[userPattern.length - 1] === computerPattern[userPattern.length - 1]) {
        console.log("good")
        if (computerPattern.length === userPattern.length) {
            userClickedPattern = []
            setTimeout(nextSequence, 1000)
        }
    } else {
        console.log("failed")
        const failSound = new Audio("./sounds/wrong.mp3")
        failSound.play()
        wrong()
        $("h1").text("Game Over, Press Any Key to Restart")
        restart()
    }
}


$(".btn").on("click", (event) => {
    const userChosenColour = event.target.id
    userClickedPattern.push(userChosenColour)
    console.log(gamePattern)
    console.log(userClickedPattern)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checker(gamePattern, userClickedPattern)
})

$(document).on('keydown', () => {
    if (!started) {

        nextSequence()

        started = true
    }

})