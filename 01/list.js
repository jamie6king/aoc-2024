// Advent of Code 2024
// Day 01

const fs = require("node:fs");

fs.readFile("./list.txt", "utf-8", (err, data) => {

    if (err) {
        console.error("No list.txt found!");
        return;
    };

    const leftList = [];
    const rightList = [];
    let totalDistance = 0;

    data.split("\n")
        .map(line => line.split("   "))
        .forEach(line => {

            if (!line.includes("")) {
                leftList.push(line[0]);
                rightList.push(line[1]);
            };
        });

    leftList.sort();
    rightList.sort();

    leftList.forEach((leftLocation) => {
        let rightLocation = rightList[leftList.indexOf(leftLocation)];

        totalDistance += Math.abs(leftLocation - rightLocation);
    });

    console.log(`The total distance between the two lists is: ${totalDistance}`);

    let totalSimilarity = 0;

    leftList.forEach((leftLocation) => {
        
        let count = 0;
        rightList.forEach((rightLocation) => (leftLocation === rightLocation) && count++);
        totalSimilarity += leftLocation * count;
    });

    console.log(`The total similarity score of the two lists is: ${totalSimilarity}`);
})