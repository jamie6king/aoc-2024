// Advent of Code 2024
// Day 02

const fs = require("node:fs");

fs.readFile("./reports.txt", "utf-8", (err, data) => {

    if (err) {
        console.error("No reports.txt found!");
        return;
    };

    let goodReports = 0;

    data.split("\n")
        .map(line => line.split(" "))
        .forEach(line => {

            if (line != [""]) {

                let stateOfArray = "";

                for (let i=0; i < line.length - 1; i++) {

                    if (stateOfArray != "invalid") {
                        let current = parseInt(line[i]);
                        let next = parseInt(line[i+1]);

                        if (((current - next) < 0) && (stateOfArray != "dec")) {
                            stateOfArray = "inc";
                        } else if (((current - next) > 0) && (stateOfArray != "inc")) {
                            stateOfArray = "dec";
                        } else {
                            stateOfArray = "invalid";
                        };
                    };
                };

                let isGoodReport = true;

                if (stateOfArray != "invalid") {

                    for (let i=0; i < line.length - 1; i++) {

                        let diff = Math.abs(parseInt(line[i]) - parseInt(line[i+1]))

                        if (diff > 3) {
                            isGoodReport = false;
                        };
                    };
                } else {
                    isGoodReport = false;
                };

                if (isGoodReport) {
                    goodReports += 1;
                };
            };
        });

    console.log(`The total number of good reports is: ${goodReports}`);

    let goodDampenedReports = 0;

    data.split("\n")
        .map(line => line.split(" "))
        .forEach(line => {

            if (line != [""]) {

                let stateOfArray = "";
                let strikes = 2;

                for (let i=0; i < line.length - 1; i++) {

                    if (stateOfArray != "invalid") {
                        let current = parseInt(line[i]);
                        let next = parseInt(line[i+1]);

                        if (((current - next) < 0) && (stateOfArray != "dec")) {
                            stateOfArray = "inc";
                        } else if (((current - next) > 0) && (stateOfArray != "inc")) {
                            stateOfArray = "dec";
                        } else {
                            if (strikes > 0 && stateOfArray != "invalid") {
                                line.splice(i, 1)
                                i--;
                                strikes--;
                            } else {
                                stateOfArray = "invalid";
                            }
                        };
                    };
                };

                console.log(`Line: ${line}, strikes: ${strikes}`)

                let isGoodReport = true;

                if (stateOfArray != "invalid" && strikes > 0) {

                    for (let i=0; i < line.length - 1; i++) {

                        let diff = Math.abs(parseInt(line[i]) - parseInt(line[i+1]))

                        if (diff > 3) {

                            if (strikes > 0 && !isGoodReport) {
                                line.splice(i, 1);
                                strikes--;
                                i--;
                            } else {
                                isGoodReport = false;
                            }
                        };
                    };
                } else {
                    isGoodReport = false;
                };

                if (isGoodReport) {
                    goodDampenedReports += 1;
                };

                console.log(`Line: ${line}, strikes: ${strikes}\n`)
            };
        });

    console.log(`The total number of good dampened reports is: ${goodDampenedReports}`);
})