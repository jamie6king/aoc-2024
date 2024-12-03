// Advent of Code 2024
// Day 02

const fs = require("node:fs");

const isNumber = (number) => (!isNaN(parseFloat(number)) && isFinite(number))

fs.readFile("./mul.txt", "utf-8", (err, data) => {

    if (err) {
        console.error("No mul.txt found!");
        return;
    };

    const values = [];

    data.split("\n")
        .forEach(line => {
            
            let looking = false
            let previousLetter = ""
            let currentNumber = []
            let currentEq = []

            line.split("").forEach(letter => {
                
                if (looking) {

                    if (letter == "u" && previousLetter == "m") {
                        previousLetter = "u"
                    } else if (letter == "l" && previousLetter == "u") {
                        previousLetter = "l"
                    } else if (letter == "(" && previousLetter == "l") {
                        previousLetter = "("
                    } else if (isNumber(letter) && previousLetter == "(") {
                        previousLetter = letter
                        currentNumber.push(letter)
                    } else if (isNumber(letter) && isNumber(previousLetter)) {
                        previousLetter = letter
                        currentNumber.push(letter)
                    } else if (letter == "," && isNumber(previousLetter)) {
                        previousLetter = letter
                        currentEq.push(parseInt(currentNumber.join("")))
                        currentNumber = []
                    } else if (isNumber(letter) && previousLetter == ",") {
                        previousLetter = letter
                        currentNumber.push(letter)
                    } else if (letter  == ")" && isNumber(previousLetter)) {
                        currentEq.push(parseInt(currentNumber.join("")))
                        currentNumber = []

                        if (currentEq.length == 2) {
                            values.push(currentEq[0] * currentEq[1])
                        }

                        currentEq = []
                        looking = false
                    } else {
                        looking = false
                        currentNumber = []
                        currentEq = []
                    }

                } else {

                    if (letter == "m") {
                        looking = true
                        previousLetter = "m"
                    }
                }
            })
        })

    const finalAnswer = values.reduce((partialSum, num) => partialSum + num, 0)

    console.log(`The sum of the uncorrupted memory is: ${finalAnswer}`)
})