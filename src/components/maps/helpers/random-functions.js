function start(height, width) {
    // narrows band of options to allow land above and below
    let band = Math.ceil(height * 0.6);
    let seed =
        width * Math.trunc(Math.random() * band + Math.ceil(height * 0.2));
    return seed;
}

export function edgeCheck(height, width, index) {
    // right edge, top edge, and bottom edge checks
    let indNum = Number(index);
    if (
        (indNum + 1) % width === 0 ||
        indNum - width < 0 ||
        indNum + width > width * height
    ) {
        return false;
    }
    return true;
}

// starting from the left when making the river and introducing trees
function right() {
    return 1;
}

function up(width) {
    return -width;
}

function down(width) {
    return width;
}

// weighted random function to make the river tend right
function weightedRandom(prob) {
    let i,
        sum = 0,
        r = Math.random();
    for (i in prob) {
        sum += prob[i];
        if (r <= sum) return i;
    }
}

// actual recursive building of the river path
function recursiveRiver(seed, path, height, width, prev) {
    if (edgeCheck(height, width, seed)) {
        let nextStep = Number(
            weightedRandom({
                [right()]: 0.6,
                [up(width)]: 0.2,
                [down(width)]: 0.2,
            })
        );

        if (nextStep === Number(-prev)) {
            nextStep = Number(
                weightedRandom({
                    [right()]: 0.5,
                    [prev]: 0.5,
                })
            );
        }

        let newSeed = seed + nextStep;
        path.push(newSeed);
        recursiveRiver(newSeed, path, height, width, nextStep);
    }

    return path;
}

// filtering for unique when building the treeline so later cells can't
// overwrite earlier cells
function filterUnique(value, index, self) {
    return self.indexOf(value) === index;
}

// a function to check that a particular value is within
// a 3x3 box of a river tile
function spacingFilter(width, cellVal, checkPath) {
    let truthiness = {};
    [
        cellVal + 1,
        cellVal + 2,
        cellVal - 1,
        cellVal - 2,
        cellVal + width,
        cellVal + 2 * width,
        cellVal - width,
        cellVal - 2 * width,
        cellVal + 1 + width,
        cellVal + 1 - width,
        cellVal - 1 + width,
        cellVal - 1 - width,
    ].forEach((testVal, testIndex) => {
        if (testVal % width !== 0 && testVal % width !== width - 1) {
            if (checkPath.indexOf(testVal) !== -1) {
                return (truthiness = {
                    ...truthiness,
                    [`Cell ${cellVal} test ${testIndex}`]: false,
                });
            } else {
                return (truthiness = {
                    ...truthiness,
                    [`Cell ${cellVal} test ${testIndex}`]: true,
                });
            }
        } else {
            return (truthiness = {
                ...truthiness,
                [`Cell ${cellVal} test ${testIndex}`]: true,
            });
        }

        // if (checkPath.indexOf(testVal) != -1) {
        //     return (truthiness = {
        //         ...truthiness,
        //         [`Cell ${cellVal} test ${testIndex}`]: false,
        //     });
        // } else {
        //     return (truthiness = {
        //         ...truthiness,
        //         [`Cell ${cellVal} test ${testIndex}`]: true,
        //     });
        // }
    });

    if (Object.values(truthiness).indexOf(false) !== -1) {
        return false;
    } else {
        return true;
    }
}

// ABOVE HERE, ALL HELPER FUNCTIONS
// _______________________________________________________
// BELOW HERE, ALL EXPORT FUNCTIONS

// the function to generate the initial state of the river and then call
// the recursive function to make the path
export function generateRiver(height, width) {
    let seed = start(height, width);
    let path = recursiveRiver(seed, [seed], height, width, 1);
    return path.filter(filterUnique);
}

// this will fill in the space above the banks of the river
export function generateTreeFill(width, mapArr, path) {
    mapArr.forEach((val, index) => {
        if (val !== "w" && val !== "t" && spacingFilter(width, index, path)) {
            mapArr[index] = "t";
        }
    });

    return mapArr;
}

