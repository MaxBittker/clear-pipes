import Two from "two.js";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";

// const textPath = document.querySelector("#text-path");

var elem = document.getElementById("draw-animation");

let width = window.innerWidth;
let height = window.innerHeight;

var two = new Two({ fullscreen: true, autostart: true }).appendTo(elem);
console.log(two);
function makeBox(pos, size: number, label: string) {
  var rect1 = two.makeRectangle(size / 2, size / 2, size, size);
  let verts = [
    new Two.Anchor(size, 0),
    new Two.Anchor(size + 10, 10),
    new Two.Anchor(size + 10, size + 10),
    new Two.Anchor(10, size + 10),
    new Two.Anchor(0, size)
  ];
  var path = two.makePath(verts, true);
  var line = two.makeLine(size, size, size + 10, size + 10);

  path.fill = "lavender";
  rect1.fill = "white";

  var group = two.makeGroup(path, rect1, line);
  two.update();

  var svgElem = group._renderer.elem;

  const htmlString = ReactDOMServer.renderToStaticMarkup(
    <foreignobject x="10" y="10" width="100" height="100">
      <h1>{label}</h1>
    </foreignobject>
  );

  svgElem.innerHTML += htmlString;

  group.translation.set(pos.x, pos.y);
}

let a = new Two.Vector(20, 20);
let b = new Two.Vector(320, 220);
let c = new Two.Vector(30, 420);

function makePath(a, b) {
  // console.log(a);
  let mid = new Two.Vector(a.x, b.y);
  two.makeLine(a.x, a.y, mid.x, mid.y);
  two.makeLine(mid.x, mid.y, b.x, b.y);
}
let half = new Two.Vector(100, 100);

let lastPoint = new Two.Vector(
  Math.random() * Two.width,
  Math.random() * Two.height
);
let size = 200;
let points = [
  new Two.Vector(Math.random() * two.width, Math.random() * two.height)
];
for (var i = 0; i < 8; i++) {
  let p = new Two.Vector(
    size + Math.random() * (two.width - size * 3),
    size + Math.random() * (two.height - size * 3)
  );
  makePath(
    Two.Vector.add(p, half),
    Two.Vector.add(points[points.length - 1], half)
  );

  points.push(p);
}
points.forEach((p, i) => {
  makeBox(p, 200, i.toString());
});
// makePath(Two.Vector.add(a, half), Two.Vector.add(b, half));
// makePath(Two.Vector.add(b, half), Two.Vector.add(c, half));
// makeBox(a, 200, "a");
// makeBox(b, 200, "b");
// makeBox(c, 200, "c");
// group.scale = 0;
// group.noStroke();

two
  .bind("update", function(frameCount) {
    // This code is called everytime two.update() is called.
    // Effectively 60 times per second.
    // if (group.scale > 0.9999) {
    // group.scale = group.rotation = 0;
    // }
    // var t = (1 - group.scale) * 0.125;
    // group.scale += t;
    // group.rotation += t * 4 * Math.PI;
  })
  .play(); // Finally, start the animation loop
