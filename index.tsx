import Two from "two.js";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { makeConnector, makeBox, makeGradient, makeHopper } from "./src/render";
import { startPhysics } from "./src/physics";
import { processTDV } from "./src/process";

let elem = document.getElementById("draw-animation");

let width = window.innerWidth;
let height = window.innerHeight;
window.width = width;
window.height = height;

let two = new Two({ fullscreen: true, autostart: true }).appendTo(elem);
two.renderer.domElement.setAttribute("viewBox", "-0 -0 1000 1050");

window.two = two;

let pHopper = new Two.Vector(200, 200);
let pClean = new Two.Vector(200, 750);
let pRule = new Two.Vector(500, 750);
let pCheck = new Two.Vector(700, 750);
let pDestination = new Two.Vector(860, 350);
let pTrash = new Two.Vector(0, 870);
let pTrash2 = new Two.Vector(0, 905);
let pTrash3 = new Two.Vector(0, 940);
let pGradient = new Two.Vector(0, 905);

let c1 = makeConnector(pHopper, pClean, "1", true, "wiggle");
let c2 = makeConnector(pClean, pRule, "2", false, "loop");
let c3 = makeConnector(pRule, pCheck, "3");
let c4 = makeConnector(pCheck, pDestination, "4");

let cTrash1 = makeConnector(pClean, pTrash, "t1", true);
let cTrash2 = makeConnector(pRule, pTrash2, "t2", true);
let cTrash3 = makeConnector(pCheck, pTrash3, "t3", true);
let trashGradient = makeGradient(pGradient.x, pGradient.y, 200);
// let c7 = makeConnector(pCheck, pTrash, "5", true);

let boxHopper = makeHopper(pHopper, 350, "a");
let boxClean = makeBox(pClean, 100, "b");
boxClean.setText("CLEAN PUNCTUATION");
let boxRule = makeBox(pRule, 100, "c");
boxRule.setText("PASSES RULE");
let boxCheck = makeBox(pCheck, 100, "d");
boxCheck.setText("API CHECK");

let boxDestination = makeBox(pDestination, 150, "e");
// let connections = [c1, c2];

let { addWord, removeWord } = startPhysics(boxHopper);

// words.slice(0, 65).map(addWord);

function formatWords(words: Array<string>) {
  return `<p class="word-bank">${words
    .map(w => `<span class="word-span">${w}</span>&nbsp;`)
    .join(" ")}</p>`;
}

let destinationWords: Array<string> = [];

function remove_first_occurrence(str, searchstr) {
  var index = str.indexOf(searchstr);
  if (index === -1) {
    return str;
  }
  return str.slice(0, index) + str.slice(index + searchstr.length);
}

function subtract(a, b) {
  let letters = b.split("");
  let out = a;

  letters.forEach(l => {
    out = remove_first_occurrence(out, l);
  });
  return out;
}
let wordList = [];

function moveWord(): Promise<any> {
  let word = wordList.shift();
  addWord(word);
  let [initial, cleaned, passed, count, rc] = removeWord();
  var checked = null;

  if (count && count.length > 2) {
    checked = count;
    count = rc;
  }

  // boxHopper.setText(formatWords(words));

  return c1
    .sendWord(initial)
    .then(() => {
      moveWord();
      cTrash1.sendWord(subtract(initial, cleaned));
      return c2.sendWord(cleaned);
    })
    .then(() => {
      if (passed) {
        return c3.sendWord(passed);
      } else {
        cTrash2.sendWord(cleaned);
        throw "done";
      }
    })
    .then(() => {
      if (checked) {
        return c4.sendWord(checked).then(() => {
          destinationWords.push(checked);
          boxDestination.setText(formatWords(destinationWords));
        });
      } else {
        return cTrash3.sendWord(passed);
      }
    });
}

let url = "http://159.203.112.6:4444/July-15-2020.txt";
fetch(url)
  .then(response => response.text())
  .then(blob => {
    let articles = processTDV(blob);
    wordList = articles[1];

    // articles = articles.sort((a, b) => a.length - b.length);
    console.log(articles);

    for (var i = 0; i < 25; i++) {
      let word = wordList.shift();
      addWord(word);
    }

    moveWord();
  });

two.bind("update", function(frameCount) {}).play(); // Finally, start the animation loop
