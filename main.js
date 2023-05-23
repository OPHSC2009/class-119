function preload() {
    classifier = ml5.imageClassifier("DoodleNet");

}

function setup() {
    canvas = createCanvas(400, 300);
    canvas.center();
    canvas.background("white")
    canvas.mouseReleased(classifyCanvas)
    synth = window.speechSynthesis;

}

function draw() {
    stroke("black")
    strokeWeight(5)
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function clear_canvas() {
    background("white");

}

function classifyCanvas() {
    console.log(ml5.version);
    classifier.classify(canvas, gotResult)
}

function gotResult(error,results) {
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        document.getElementById("label").innerHTML="Label: " + results[0].label;
        document.getElementById("confidence").innerHTML="Confidence: " + ((results[0].confidence)*100).toFixed(2)+"%";
        speech=new SpeechSynthesisUtterance(results[0].label);
        synth.speak(speech);
    }
}