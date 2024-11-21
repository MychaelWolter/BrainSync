let numPoints = 50;
let delta = [], theta = [], lowAlpha = [], highAlpha = [], lowBeta = [], highBeta = [], lowGamma = [], highGamma = [];
let targetDelta = [], targetTheta = [], targetLowAlpha = [], targetHighAlpha = [], targetLowBeta = [], targetHighBeta = [], targetLowGamma = [], targetHighGamma = [];
let displayedDelta = [], displayedTheta = [], displayedLowAlpha = [], displayedHighAlpha = [], displayedLowBeta = [], displayedHighBeta = [], displayedLowGamma = [], displayedHighGamma = [];
let attention = 0, meditation = 0;
let targetAttention = 0, targetMeditation = 0;
let displayedAttention = 0, displayedMeditation = 0;

let running = false;

let lastUpdateTime = 0;
let updateInterval = 1000;

function setup() {
    const container = document.getElementById("canvasContainer");
    const containerStyles = window.getComputedStyle(container);
    const width = parseFloat(containerStyles.width);
    const height = parseFloat(containerStyles.height);

    const canvas = createCanvas(width, height);
    canvas.parent("canvasContainer");

    frameRate(30);

    initializeData();

    document.getElementById("startButton").addEventListener("click", startSimulation);
    document.getElementById("stopButton").addEventListener("click", stopSimulation);

    window.addEventListener("resize", handleResize);
}

function handleResize() {
    const container = document.getElementById("canvasContainer");
    const containerStyles = window.getComputedStyle(container);
    const newWidth = parseFloat(containerStyles.width);
    const newHeight = parseFloat(containerStyles.height);

    resizeCanvas(newWidth, newHeight);
}

function draw() {
    background(255);

    if (running) {
        drawWaves();
        drawBarsAndLabels();

        if (millis() - lastUpdateTime > updateInterval) {
            updateData();
            lastUpdateTime = millis();
        }
    }

    document.getElementById("status").textContent = `Status: ${running ? "Transmitindo" : "Parado"}`;
}

function initializeData() {
    for (let i = 0; i < numPoints; i++) {
        let deltaVal = random(50, 200);
        delta.push(deltaVal);
        targetDelta.push(deltaVal);
        displayedDelta.push(deltaVal);

        let thetaVal = random(40, 180);
        theta.push(thetaVal);
        targetTheta.push(thetaVal);
        displayedTheta.push(thetaVal);

        let lowAlphaVal = random(30, 150);
        lowAlpha.push(lowAlphaVal);
        targetLowAlpha.push(lowAlphaVal);
        displayedLowAlpha.push(lowAlphaVal);

        let highAlphaVal = random(20, 120);
        highAlpha.push(highAlphaVal);
        targetHighAlpha.push(highAlphaVal);
        displayedHighAlpha.push(highAlphaVal);

        let lowBetaVal = random(10, 100);
        lowBeta.push(lowBetaVal);
        targetLowBeta.push(lowBetaVal);
        displayedLowBeta.push(lowBetaVal);

        let highBetaVal = random(5, 80);
        highBeta.push(highBetaVal);
        targetHighBeta.push(highBetaVal);
        displayedHighBeta.push(highBetaVal);

        let lowGammaVal = random(5, 60);
        lowGamma.push(lowGammaVal);
        targetLowGamma.push(lowGammaVal);
        displayedLowGamma.push(lowGammaVal);

        let highGammaVal = random(5, 40);
        highGamma.push(highGammaVal);
        targetHighGamma.push(highGammaVal);
        displayedHighGamma.push(highGammaVal);
    }
    attention = random(50, 200);
    meditation = random(50, 200);
    targetAttention = attention;
    targetMeditation = meditation;
    displayedAttention = attention;
    displayedMeditation = meditation;
}

function drawWaves() {
    let xStep = (width + 50) / numPoints;

    for (let i = 0; i < numPoints; i++) {
        displayedDelta[i] = lerp(displayedDelta[i], targetDelta[i], 0.1);
        displayedTheta[i] = lerp(displayedTheta[i], targetTheta[i], 0.1);
        displayedLowAlpha[i] = lerp(displayedLowAlpha[i], targetLowAlpha[i], 0.1);
        displayedHighAlpha[i] = lerp(displayedHighAlpha[i], targetHighAlpha[i], 0.1);
        displayedLowBeta[i] = lerp(displayedLowBeta[i], targetLowBeta[i], 0.1);
        displayedHighBeta[i] = lerp(displayedHighBeta[i], targetHighBeta[i], 0.1);
        displayedLowGamma[i] = lerp(displayedLowGamma[i], targetLowGamma[i], 0.1);
        displayedHighGamma[i] = lerp(displayedHighGamma[i], targetHighGamma[i], 0.1);
    }

    for (let i = 0; i < numPoints - 1; i++) {
        let x1 = i * xStep;
        let x2 = (i + 1) * xStep;

        drawLayer(displayedDelta, color(255, 255, 0, 150), x1, x2, height / 2);
        drawLayer(displayedTheta, color(255, 165, 0, 150), x1, x2, height / 2);
        drawLayer(displayedLowAlpha, color(255, 105, 180, 150), x1, x2, height / 2);
        drawLayer(displayedHighAlpha, color(255, 20, 147, 150), x1, x2, height / 2);
        drawLayer(displayedLowBeta, color(0, 191, 255, 150), x1, x2, height / 2);
        drawLayer(displayedHighBeta, color(0, 0, 255, 150), x1, x2, height / 2);
        drawLayer(displayedLowGamma, color(138, 43, 226, 150), x1, x2, height / 2);
        drawLayer(displayedHighGamma, color(75, 0, 130, 150), x1, x2, height / 2);
    }
}

function drawLayer(data, col, x1, x2, baseHeight) {
    fill(col);
    noStroke();

    beginShape();
    vertex(x1, baseHeight);
    vertex(x1, baseHeight - data[int(x1 / (width / numPoints))]);
    vertex(x2, baseHeight - data[int(x2 / (width / numPoints))]);
    vertex(x2, baseHeight);
    endShape(CLOSE);
}

function breakWord(word) {
    if (word === "Atenção") {
        return ["Aten-", "ção"];
    } else if (word === "Meditação") {
        return ["Medi-", "tação"];
    }

    if (word === "Delta" || word === "Teta") {
        return [word];
    }

    let mid = Math.floor(word.length / 2);
    return [word.slice(0, mid), word.slice(mid)];
}

function drawBarsAndLabels() {
    let labels = ["Atenção", "Meditação", "Delta", "Teta", "Alfa Baixo", "Alfa Alto", "Beta Baixo", "Beta Alto", "Gama Baixo", "Gama Alto"];
    let colors = [
        color(10, 10, 10),
        color(128, 128, 128),
        color(255, 255, 0),
        color(255, 165, 0),
        color(255, 105, 180),
        color(255, 20, 147),
        color(0, 191, 255),
        color(0, 0, 255),
        color(138, 43, 226),
        color(75, 0, 130),
    ];

    displayedAttention = lerp(displayedAttention, targetAttention, 0.1);
    displayedMeditation = lerp(displayedMeditation, targetMeditation, 0.1);

    let barWidth = width / labels.length;
    let barHeights = [
        displayedAttention,
        displayedMeditation,
        displayedDelta[0],
        displayedTheta[0],
        displayedLowAlpha[0],
        displayedHighAlpha[0],
        displayedLowBeta[0],
        displayedHighBeta[0],
        displayedLowGamma[0],
        displayedHighGamma[0],
    ];

    let fontSize = map(width, 0, 900, 6, 14);
    textSize(fontSize);

    for (let i = 0; i < labels.length; i++) {
        fill(colors[i % colors.length]);
        rect(i * barWidth, height - 35, barWidth, -barHeights[i]);
        fill(0);
        textAlign(CENTER);

        let label = labels[i];
        let splitLabel = breakWord(label);

        if (splitLabel.length > 1) {
            text(splitLabel[0], i * barWidth + barWidth / 2, height - 22);
            text(splitLabel[1], i * barWidth + barWidth / 2, height - 22 + fontSize);
        } else {

            if (textWidth(label) > barWidth * 0.8) {
                let words = label.split(' ');
                let firstLine = words.slice(0, Math.floor(words.length / 2)).join(' ');
                let secondLine = words.slice(Math.floor(words.length / 2)).join(' ');

                text(firstLine, i * barWidth + barWidth / 2, height - 22);
                text(secondLine, i * barWidth + barWidth / 2, height - 22 + fontSize);
            } else {
                text(label, i * barWidth + barWidth / 2, height - 22);
            }
        }
    }
}

function updateData() {
    shiftAndPush(targetDelta, random(50, 200));
    shiftAndPush(targetTheta, random(40, 180));
    shiftAndPush(targetLowAlpha, random(30, 150));
    shiftAndPush(targetHighAlpha, random(20, 120));
    shiftAndPush(targetLowBeta, random(10, 100));
    shiftAndPush(targetHighBeta, random(5, 80));
    shiftAndPush(targetLowGamma, random(5, 60));
    shiftAndPush(targetHighGamma, random(5, 40));

    targetAttention = random(50, 200);
    targetMeditation = random(50, 200);
}

function shiftAndPush(array, value) {
    array.shift();
    array.push(value);
}

function startSimulation() {
    running = true;
}

function stopSimulation() {
    running = false;
}