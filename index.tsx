import Two from "two.js";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { makeConnector, makeBox } from "./src/render";

let elem = document.getElementById("draw-animation");

let width = window.innerWidth;
let height = window.innerHeight;

let two = new Two({ fullscreen: true, autostart: true }).appendTo(elem);
window.two = two;

let text = ` After describing a fairy-tale existence with various cute marine
mammals forever frolicking on and around her small wooden dock, she
added, with faux causticness,`;
` that the seals “look like big
Rottweilers swimming around.” After declaring optimistically, “I
think I have a lot to say that might be interesting to people,” she
did an abrupt volte-face, switching to a low, confessional timbre:
“Who knows? Who knows, right, what I’m doing? I don’t know. Maybe no
one will be interested.`;

let p1 = new Two.Vector(200, 200);
let p2 = new Two.Vector(400, 450);
let p3 = new Two.Vector(220, 650);
let p4 = new Two.Vector(600, 400);
let c1 = makeConnector(p1, p2, "1");
let c2 = makeConnector(p2, p3, "2", true);
let c3 = makeConnector(p2, p4, "3");

let b1 = makeBox(p1, 150, "a");
let b2 = makeBox(p2, 100, "b");
let b3 = makeBox(p3, 150, "c");

let connections = [c1, c2];
c1.sendWord("wow", () => {
  c2.sendWord("wow", () => {
    b3.setText("wow");

    c3.sendWord("wow", () => {});
  });
});

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
