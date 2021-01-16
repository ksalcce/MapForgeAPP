// a function to grow the river randomly
function riverRand(height, width, mapArr, direction) {
    let waterIndices = [];

    let i = 0;

    while (mapArr.indexOf("w", i) !== -1) {
        waterIndices.push(mapArr.indexOf("w", i));
        i = mapArr.indexOf("w", i) + 1;
    }

	if (waterIndices.length === 0) {
        waterIndices = [Math.floor(Math.random() * mapArr.length)];
    }

    let blankIndices = [];

    waterIndices.forEach((i) => {
        [i + 1, i - 1, i + width, i - width].forEach((test) => {
            if (
                mapArr[test] !== "w" &&
                blankIndices.indexOf(test) === -1 &&
                test < height * width &&
                test >= 0
            ) {
                blankIndices.push(test);
            }
        });
    });

    let edgeIndices = [];

    waterIndices.forEach((i) => {
        [
            i + 1,
            i + 2,
            i - 1,
            i - 2,
            i + width,
            i + 2 * width,
            i - width,
            i - 2 * width,
        ].forEach((test) => {
            if (
                mapArr[test] !== "w" &&
                edgeIndices.indexOf(i) === -1 &&
                test < height * width &&
                test >= 0
            ) {
                edgeIndices.push(i);
            }
        });
    });

    switch (direction) {
        case "shrink":
            return edgeIndices[Math.floor(Math.random() * edgeIndices.length)];
        case "grow":
            return blankIndices[
                Math.floor(Math.random() * blankIndices.length)
            ];
        default:
            break;
    }
}

export function growRiver(height, width, mapArr, slider) {
    let modifiedMap = mapArr.map((val) => val);
    let currentFraction = Number(
        modifiedMap.filter((i) => i === "w").length / (height * width)
    );

    let oneMore = currentFraction + 1 / (height * width);
    let steps = (slider - currentFraction) / (oneMore - currentFraction);
    let absSteps = Math.abs(steps);

    let index = [];

    // drives if we're growing or shrinking the river
    if (steps < 0) {
        // only kicks in if it would result in at least one cell changing
        if (absSteps >= 1) {
            // runs as many times as steps
            while (index.length < Math.trunc(absSteps)) {
                index.push(riverRand(height, width, mapArr, "shrink"));
            }
            index.forEach((i) => (modifiedMap[i] = "b"));
        }
    } else {
        // same +1 cell check as above
        if (absSteps >= 1) {
            // as many times as steps
            while (index.length < Math.trunc(absSteps)) {
                index.push(riverRand(height, width, mapArr, "grow"));
            }
            index.forEach((i) => (modifiedMap[i] = "w"));
        }
    }

    return modifiedMap.join("");
}

// the recursive randomizer for adding or removing trees
function treeRand(mapArr, direction) {
    let index = Math.round(Math.random() * mapArr.length);
    switch (direction) {
        case "shrink":
            if (mapArr.includes("t")) {
                if (mapArr[index] === "t") {
                    return index;
                } else {
                    return treeRand(mapArr, "shrink");
                }
            }
            break;
        case "grow":
            if (mapArr.includes("b")) {
                if (mapArr[index] === "b") {
                    return index;
                } else {
                    return treeRand(mapArr, "grow");
                }
            }
            break;
        default:
            break;
    }
}

export function shrinkTrees(height, width, mapArr, slider) {
    let modifiedMap = mapArr.map((val) => val);
    let currentFraction = Number(
        modifiedMap.filter((i) => i === "t").length / (height * width)
    );

    let oneMore = currentFraction + 1 / (height * width);
    let steps = (slider - currentFraction) / (oneMore - currentFraction);
    let absSteps = Math.abs(steps);

    let index = [];

    // drives if we're growing or shrinking the trees
    if (steps < 0) {
        // only kicks in if it would result in at least one cell changing
        if (absSteps >= 1) {
            // runs as many times as steps
            while (index.length < Math.trunc(absSteps)) {
                index.push(treeRand(mapArr, "shrink"));
            }
            index.forEach((i) => (modifiedMap[i] = "b"));
        }
    } else {
        // same +1 cell check as above
        if (absSteps >= 1) {
            // as many times as steps
            while (index.length < Math.trunc(absSteps)) {
                index.push(treeRand(mapArr, "grow"));
            }
            index.forEach((i) => (modifiedMap[i] = "t"));
        }
    }

    return modifiedMap.join("");
}

function cityRand(height, width, mapArr, direction) {
    let cityIndices = [];

    let i = 0;

    // grabs all the cells that are currently city-colored
    while (mapArr.indexOf("c", i) !== -1) {
        cityIndices.push(mapArr.indexOf("c", i));
        i = mapArr.indexOf("c", i) + 1;
    }

    // if none are city colored, select a random cell
    if (cityIndices.length === 0) {
        cityIndices = [Math.floor(Math.random() * mapArr.length)];
    }

    let blankIndices = [];

    // looks around the city tiles and grabs the cells around the city
    cityIndices.forEach((i) => {
        [i + 1, i - 1, i + width, i - width].forEach((test) => {
            if (
                mapArr[test] !== "c" &&
                mapArr[test] !== "w" &&
                blankIndices.indexOf(test) === -1 &&
                test < height * width &&
                test >= 0
            ) {
                blankIndices.push(test);
            }
        });
    });

    let edgeIndices = [];

    cityIndices.forEach((i) => {
        [i + 1, i - 1, i + width, i - width].forEach((test) => {
            if (
                mapArr[test] !== "c" &&
                edgeIndices.indexOf(i) === -1 &&
                test < height * width &&
                test >= 0
            ) {
                edgeIndices.push(i);
            }
        });
    });

    switch (direction) {
        case "shrink":
            return edgeIndices[Math.floor(Math.random() * edgeIndices.length)];
        case "grow":
            return blankIndices[
                Math.floor(Math.random() * blankIndices.length)
            ];
        default:
            break;
    }
}

export function growCity(height, width, mapArr, slider) {
    let modifiedMap = mapArr.map((val) => val);
    let currentFraction = Number(
        modifiedMap.filter((i) => i === "c").length / (height * width)
    );

    let oneMore = currentFraction + 1 / (height * width);
    let steps = (slider - currentFraction) / (oneMore - currentFraction);
    let absSteps = Math.abs(steps);

    let index = [];

    // drives if we're growing or shrinking the city
    if (steps < 0) {
        // only kicks in if it would result in at least one cell changing
        if (absSteps >= 1) {
            // runs as many times as steps
            while (index.length < Math.trunc(absSteps)) {
                index.push(cityRand(height, width, mapArr, "shrink"));
            }
            index.forEach((i) => (modifiedMap[i] = "t"));
        }
    } else {
        // same +1 cell check as above
        if (absSteps >= 1) {
            // as many times as steps
            while (index.length < Math.trunc(absSteps)) {
                index.push(cityRand(height, width, mapArr, "grow"));
            }
            index.forEach((i) => (modifiedMap[i] = "c"));
        }
    }

    return modifiedMap.join("");
}
