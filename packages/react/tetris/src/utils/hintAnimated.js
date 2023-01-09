//https://codepen.io/yoksel/pen/yNJYyE

var s = Snap();
var sMaxX = 800;
var sMaxY = 600;
var viewBoxList = [0, 0, sMaxX, sMaxY];
s.attr({
  viewBox: viewBoxList,
});

var gLines = s.g();
var gText = s.g();
var patt;
var maskObj;
var text;
var maskElem = s.mask();

var pSize = 700;
var maxLines = 16;
var maxLinesDouble = maxLines * 2;
var lineStep = pSize / maxLines;
var lines = [];
var pathDur = 1000;
var delay = 250;

var colorSteps = maxLines / 2;
var colors = [
  "purple",
  "crimson",
  "orangered",
  "orange",
  "gold",
  "yellowgreen",
  "steelblue",
  "teal",
  "purple",
];

var lineLength = Math.sqrt(Math.pow(pSize, 2) * 2);

var lineObj = function () {
  var d = "M" + [pSize, 0, 0, pSize];
  var path = s.path(d);
  var pos = 0;
  var addMask = false;
  var pathDelay = 0;
  var dashArray = 0;
  var strokeW = 0;

  this.init = function (params) {
    pos = params.pos;
    strokeW = params.strokeW;
    var strokeColor = params.color || "hotpink";
    var offsetX = params.offsetX || 0;
    var x = pSize - lineStep * (pos + 0.5) + offsetX;
    var translateParams = [x, 0];

    pathDelay = params.delay || delay;
    dashArray = lineLength;
    addMask = params.addMask || false;

    path.attr({
      transform: "translate(" + translateParams + ")",
      "stroke-width": strokeW,
      stroke: strokeColor,
      "stroke-linecap": "square",
      "stroke-dashoffset": lineLength,
      "stroke-dasharray": dashArray,
    });

    gLines.add(path);
  }; // Init

  this.reset = function () {
    path.attr({
      "stroke-dashoffset": lineLength,
      "stroke-dasharray": dashArray,
    });
  };

  this.animdDelay = function () {
    setTimeout(pathAnim, (maxLinesDouble - pos) * pathDelay);
  };

  var countNextAnim = 0;

  function runNextAnim() {
    if (addMask == true) {
      // Why 0?
      if (pos == 0) {
        countNextAnim++;

        maskObj.maskAnim();
      }
    }
  }

  function pathAnim() {
    path.animate(
      {
        "stroke-dashoffset": "0",
      },
      pathDur,
      runNextAnim
    );
  }
}; // lineObj

// ------------------------------------

function createLines(params) {
  var strokeW = params.strokeW;

  for (var i = 0; i < maxLinesDouble; i++) {
    var line = new lineObj();
    var color = params.color || colors[i % colorSteps];

    line.init({
      pos: i,
      strokeW: params.strokeW,
      offsetX: params.offsetX,
      delay: params.delay,
      addMask: params.addMask || false,
      color: color,
    });

    lines.push(line);
  }
}

// ------------------------------------

function createPattern() {
  //     console.log('* - createPattern');

  var rect = s.rect(0, 0, pSize, pSize);
  rect.attr({
    fill: "white",
  });

  gLines.add(rect);

  createLines({
    strokeW: lineStep / 1.4,
    addMask: false,
  });

  createLines({
    strokeW: 2,
    color: "#002",
    offsetX: lineStep / 2 + 7,
    delay: 300,
    addMask: true,
  });

  patt = gLines.toPattern(0, 0, pSize, pSize);
}

function animatePattern() {
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];

    line.reset();
    line.animdDelay();
  }
}

// ------------------------------------

var textObj = function () {
  var textDur = 1500;
  var dashoffset = 1200;
  var textGInit = s.g();
  var text1 = s.text("50%", "34%", "Hello");
  var text2 = s.text("50%", "73%", "world");

  text1.attr({
    dy: ".3em",
    "font-size": "1.15em",
  });
  text2.attr({
    dy: ".3em",
  });

  textGInit.add(text1, text2);

  textGInit.attr({
    "text-anchor": "middle",
    font: "15em/1 Impact",
    fill: "white",
    stroke: "#000",
    "stroke-width": 3,
    "stroke-dasharray": dashoffset,
    "stroke-dashoffset": dashoffset,
  });

  var textGFill = textGInit.clone();

  textGInit.attr({
    transform: "translate(10,10)",
  });

  gText.add(textGInit, textGFill);

  this.textAnim = function () {
    textGFill.animate(
      {
        "stroke-dashoffset": 0,
      },
      textDur,
      setTextStroke
    );
  };

  function setTextStroke() {
    setTextFill();

    textGInit.animate(
      {
        "stroke-dashoffset": 0,
      },
      textDur
    );
  }

  function setTextFill() {
    animatePattern();

    textGFill.attr({
      fill: patt,
    });
  }

  this.reset = function () {
    var initState = {
      fill: "white",
      "stroke-dasharray": dashoffset,
      "stroke-dashoffset": dashoffset,
    };

    textGInit.attr(initState);
    textGFill.attr(initState);

    this.textAnim();
  };
};

// ------------------------------------

function createText() {
  //     console.log('* - createText');
  text = new textObj();
  text.textAnim();
}

// ------------------------------------

var maskObjInit = function () {
  var maskShape;

  var currentStep = 0;
  var steps = [
    { rx: "10%", ry: "10%" },
    { rx: "35%", ry: "35%" },
    { rx: "0%", ry: "0%" },
  ];

  this.init = function () {
    maskShape = s.ellipse("50%", "50%", "100%", "100%");

    maskShape.attr({
      fill: "white",
    });

    maskElem.add(maskShape);

    gText.attr({
      mask: maskElem,
    });
  };

  this.maskAnim = function () {
    //         console.log('- * - anim mask');

    if (currentStep == steps.length) {
      setTimeout(reRun, 1000);
      return;
    }

    maskShape.animate(steps[currentStep], 300, maskObj.maskAnim);
    currentStep++;
  };

  this.reset = function () {
    currentStep = 0;

    var initState = {
      rx: "100%",
      ry: "100%",
    };

    maskShape.attr(initState);
  };
};

function createMask() {
  //     console.log('* - createMask');
  maskObj = new maskObjInit();
  maskObj.init();
}

// ------------------------------------

createPattern();
createText();
createMask();

function reRun() {
  maskObj.reset();
  text.reset();
}

/*var wrapper = document.createElement("div");
document.body.appendChild(wrapper);
wrapper.appendChild(s.node);*/
