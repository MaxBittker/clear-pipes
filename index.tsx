import Two from "two.js";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { makeConnector, makeBox, makeGradient } from "./src/render";

let elem = document.getElementById("draw-animation");

let width = window.innerWidth;
let height = window.innerHeight;

let two = new Two({ fullscreen: true, autostart: true }).appendTo(elem);
window.two = two;

let text = `After describing a fairy-tale existence with various cute marine
mammals forever frolicking on and around her small wooden dock, she
added, with faux causticness, that the seals “look like big
Rottweilers swimming around.” After declaring optimistically, “I
think I have a lot to say that might be interesting to people,” she
did an abrupt volte-face, switching to a low, confessional timbre:
“Who knows? Who knows, right, what I’m doing? I don’t know. Maybe no
one will be interested.`;
let words = text.split(" ");

let p1 = new Two.Vector(200, 200);
let p2 = new Two.Vector(500, 450);
let p3 = new Two.Vector(220, 650);
let p4 = new Two.Vector(700, 450);
let c1 = makeConnector(p1, p2, "1");
let c2 = makeConnector(p2, p3, "2", true);
let c3 = makeConnector(p2, p4, "3");

let b1 = makeBox(p1, 350, "a");
let b2 = makeBox(p2, 100, "b");
let b3 = makeBox(p3, 150, "c");
// let connections = [c1, c2];

function formatWords(words: Array<string>) {
  return `<p class="word-bank">${words
    .map(w => `<span class="word-span">${w}</span>&nbsp;`)
    .join(" ")}</p>`;
}
b1.setText(formatWords(words));

b2.setText("CHECK");
// b3.setText(" ");

let destinationWords: Array<string> = [];

function moveWord() {
  let wordToMove = words.pop();

  b1.setText(formatWords(words));

  return c1
    .sendWord(wordToMove)
    .then(() => {
      if (wordToMove.length > 4) {
        return c2.sendWord(wordToMove).then(() => {
          destinationWords.push(wordToMove);
          b3.setText(formatWords(destinationWords));
        });
      } else {
        return c3.sendWord(wordToMove);
      }
    })

    .then(moveWord);
}
moveWord();
makeGradient(p4.x, p4.y, 200);
// let half = new Two.Vector(100, 100);

// let size = 200;
// let points = [
//   new Two.Vector(Math.random() * two.width, Math.random() * two.height)
// ];
// for (let i = 0; i < 3; i++) {
//   let p2 = points[points.length - 1];

//   let p = new Two.Vector(
//     size + Math.random() * (two.width - size * 3),
//     size + Math.random() * (two.height - size * 3)
//   );

//   points.push(p);
//   let id = "curve" + i;

//   // makeConnector(Two.Vector.add(p, half), Two.Vector.add(p2, half), id);
//   // makeBox(p, 100, i.toString());
//   // makeBox(p2, 100, (i + 1).toString());
// }

// points.forEach((p, i) => {
//   // makeBox(p, 100, i.toString());
// });

two
  .bind("update", function(frameCount) {
    // This code is called everytime two.update() is called.
    // Effectively 60 times per second.
    // if (group.scale > 0.9999) {
    // group.scale = group.rotation = 0;
    // }
    // let t = (1 - group.scale) * 0.125;
    // group.scale += t;
    // group.rotation += t * 4 * Math.PI;
  })
  .play(); // Finally, start the animation loop
