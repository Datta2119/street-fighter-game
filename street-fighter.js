let p1NameDiv = document.getElementById("p1Name");
let p1HealthDiv = document.getElementById("p1Health");

let p2NameDiv = document.getElementById("p2Name");
let p2HealthDiv = document.getElementById("p2Health");

let resultDiv = document.getElementById("result");

let resetButton = document.getElementById("reset");
let playButton = document.getElementById("play");

// ** Check if either players health is  0 and if it is, then update isOver to true **
const updateGame = (p1, p2, gameState) => {
    // Update the DOM with the names and the latest health of the players
    p1NameDiv.innerText = p1.name
    p2NameDiv.innerText = p2.name

    p1HealthDiv.innerText = p1.health
    p2HealthDiv.innerText = p2.health

    // Condition IF either player health is <= 0 then set isOver to true and declareWinner
    if (p1.health <= 0 || p2.health <= 0) {
        game.isOver = true
        gameState = game.isOver
        resultDiv.innerText = game.declareWinner(game.isOver, p1, p2)
        return gameState
    }
}

class Player {
    constructor(name, health, attackDamage) {
        this.name = name;
        this.health = health;
        this.attackDamage = attackDamage;
    }

    // ** Attack an enemy with a random number from 0 to YOUR attackDmg bonus **
    strike(player, enemy, attackDamage) {
        // Get random number between 1 - 10 and that is damageAmount
        let damageAmount = Math.ceil(Math.random() * attackDamage)

        // Subtract the enemy health with the damageAmount
        enemy.health -= damageAmount

        //  Update the game and DOM with updateGame
        updateGame(p1, p2, gameState)

        //  Return a message of 'player name attacks enemy name for damageAmount'
        return `${player.name} attacks ${enemy.name} for ${damageAmount} HP!`
    }

    // ** Heal the player for random number from  1 to 5 **
    heal(player) {
        // Get random number between 1 - 5 and store that in healAmount
        let healAmount = Math.ceil(Math.random() * 5)
        // Add healAmount to players health
        let afterHealAmount = player.health + healAmount

        if (afterHealAmount <= 100) {

            // Add healAmount to players health
            player.health += healAmount

            //  Update the game and DOM with updateGame
            updateGame(p1, p2, gameState)
        }
        return `${player} heals for ${healAmount} HP!`
    }
}

class Game {
    constructor() {
        this.isOver = false;
    }

    // ** If the game is over and a player has 0 health declare the winner! **
    declareWinner(isOver, p1, p2) {
        let message

        // If isOver is true AND p1 health is <= 0 then update message variable  to 'p1 WINS!'
        if (isOver == true && p1.health <= 0) {
            message = `${p2.name} Wins!`
        }

        // Else if isOver is true AND p2 health is <= 0 then update message variable  to 'p2 WINS!'
        else if (isOver == true && p2.health <= 0) {
            message = `${p1.name} Wins!`
        }

        else if (isOver == true && p1.health < p2.health) {
            message = `${p2.name} Wins!`
        }

        else if (isOver == true && p2.health < p1.health) {
            message = `${p1.name} Wins!`
        }

        console.log(isOver, p1.health, p2.health)

        // Play victory sound
        document.getElementById("victory").play()

        // Return message variable
        return message
    }

    // ** Reset the players health back to it's original state and isOver to FALSE **
    reset(p1, p2) {
        p1.health = 100
        p2.health = 100
        this.isOver = false
        resultDiv.innerText = ""
        updateGame(p1, p2)
    }

    // ** Simulates the whole match untill one player runs out of health **
    play(p1, p2) {
        this.reset(p1, p2)

        // Make sure the players take turns untill isOver is TRUE
        while (!this.isOver) {
            p1.strike(p1, p2, p1.attackDamage)
            p2.heal(p2)
            p2.strike(p2, p1, p2.attackDamage)
            p1.heal(p1)
        }

        // Once isOver is TRUE run the declareWinner() method 
        return this.declareWinner(this.isOver, p1, p2)
    }
}

const newPlayer1 = new Player("Bishway", 100, 10)
const newPlayer2 = new Player("Sumon", 100, 10)

const p1 = newPlayer1
const p2 = newPlayer2

const game = new Game()
updateGame(p1, p2)
const gameState = game.isOver

// ** Add a click listener to the simulate button that runs the play() method on click and pass in the players **
playButton.onclick = () => {
    resultDiv.innerText = game.play(p1, p2)
}


// Player 1 game control 👉 attack
document.addEventListener("keydown", (event) => {
    // if you press Q AND the enemy health is greater than 0 AND isOver is still false then strike()
    if (event.key === "q" && p2.health > 0 && game.isOver == false) {
        p1.strike(p1, p2, p1.attackDamage)
        document.getElementById("p1Attack").play()
    }
})

// Player 1 game control 👉 heal
document.addEventListener("keydown", (event) => {
    // if you press Q AND the enemy health is greater than 0 AND isOver is still false then strike()
    if (event.key === "a" && 0 <= p1.health <= 100) {
        p1.heal(p1)
        document.getElementById("p1Heal").play()
    }
})


// Player 2 game control 👉 attack
document.addEventListener("keydown", (event) => {
    if (event.key === "p" && p1.health > 0 && game.isOver == false) {
        p2.strike(p2, p1, p2.attackDamage)
        document.getElementById("p2Attack").play()
    }
})

// Player 2 game control 👉 heal
document.addEventListener("keydown", (event) => {
    // if you press Q AND the enemy health is greater than 0 AND isOver is still false then strike()
    if (event.key === "l" && 0 <= p2.health <= 100) {
        p1.heal(p2)
        document.getElementById("p2Heal").play()
    }
})