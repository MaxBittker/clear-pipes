import Two from "two.js";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";

// const textPath = document.querySelector("#text-path");

let elem = document.getElementById("draw-animation");

let width = window.innerWidth;
let height = window.innerHeight;

let two = new Two({ fullscreen: true, autostart: true }).appendTo(elem);
console.log(two);

function makeBox(pos, size: number, label: string) {
  let rect1 = two.makeRectangle(size / 2, size / 2, size, size);
  let verts = [
    new Two.Anchor(size, 0),
    new Two.Anchor(size + 10, 10),
    new Two.Anchor(size + 10, size + 10),
    new Two.Anchor(10, size + 10),
    new Two.Anchor(0, size)
  ];
  let path = two.makePath(verts, true);
  let line = two.makeLine(size, size, size + 10, size + 10);

  path.fill = "lavender";
  rect1.fill = "white";

  let group = two.makeGroup(path, rect1, line);
  two.update();

  let r = 25;
  const htmlString = ReactDOMServer.renderToStaticMarkup(
    <React.Fragment>
      <foreignobject x="10" y="10" width="100" height="100">
        <h1>{label}</h1>
      </foreignobject>
      <svg
        width={r * 2}
        height={r * 2}
        x={size - r}
        y={size - r}
        viewBox={`${-r} ${-r} ${2 * r} ${2 * r}`}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <circle cx="5" cy="5" r={`${r * 0.8}`} fill="lavender" stroke="black" />

        <circle className="pinwheel" cx="0" cy="0" r={`${r * 0.8}`} />
        <line
          className="pinwheel"
          x1={r * -0.8 * Math.SQRT1_2}
          y1={r * -0.8 * Math.SQRT1_2}
          x2={r * 0.8 * Math.SQRT1_2}
          y2={r * 0.8 * Math.SQRT1_2}
        ></line>
        <line
          className="pinwheel"
          x1={r * 0.8 * Math.SQRT1_2}
          y1={r * -0.8 * Math.SQRT1_2}
          x2={r * -0.8 * Math.SQRT1_2}
          y2={r * 0.8 * Math.SQRT1_2}
        ></line>
        <line
          className="pinwheel"
          x1={`${r * -0.8}`}
          y1="0"
          x2={`${r * 0.8}`}
          y2="0.0"
        ></line>
        <line
          className="pinwheel"
          x1="0"
          y1={`${r * -0.8}`}
          x2="0"
          y2={`${r * 0.8}`}
        ></line>
      </svg>
    </React.Fragment>
  );
  let svgElem = group._renderer.elem;

  svgElem.innerHTML += htmlString;

  group.translation.set(pos.x, pos.y);
}

function makePath(a, b) {
  let mid = new Two.Vector(a.x, b.y);
  two.makeLine(a.x, a.y, mid.x, mid.y);
  two.makeLine(mid.x, mid.y, b.x, b.y);
}

let half = new Two.Vector(100, 100);

let size = 200;
let points = [
  new Two.Vector(Math.random() * two.width, Math.random() * two.height)
];

function makeConnector(p1, p2, id) {
  let path = makePath(p1, p2);

  let group = two.makeGroup(path);
  two.update();
  let rx = 45;
  let ry = 45;
  let sweep = 0;

  if (p2.x < p1.x) {
    rx *= -1;
    sweep = 1 - sweep;
  }
  if (p2.y > p1.y) {
    ry *= -1;
    sweep = 1 - sweep;
  }
  let length = Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
  const htmlString = ReactDOMServer.renderToStaticMarkup(
    <React.Fragment>
      <path
        id={id}
        d={`M ${p1.x} ${p1.y}
L  ${p2.x - rx} ${p1.y}
A 45, 45, 0, 0, ${sweep}, ${p2.x} ${p1.y - ry}
L  ${p2.x} ${p2.y}
`}
        stroke="blue"
        fill="transparent"
      />

      <text width="100%">
        <textpath href={"#" + id} startOffset="00px" id="text-path">
          gobshite
          <animate
            attributeName="startOffset"
            from="0%"
            to="100%"
            begin="0s"
            dur={`${length / 50}s`}
            repeatCount="indefinite"
          />
        </textpath>
      </text>
    </React.Fragment>
  );
  let svgElem = group._renderer.elem;

  svgElem.innerHTML += htmlString;
}
for (let i = 0; i < 5; i++) {
  let p2 = points[points.length - 1];

  let p = new Two.Vector(
    size + Math.random() * (two.width - size * 3),
    size + Math.random() * (two.height - size * 3)
  );

  points.push(p);
  let id = "curve" + i;

  makeConnector(Two.Vector.add(p, half), Two.Vector.add(p2, half), id);
  makeBox(p, 100, i.toString());
  makeBox(p2, 100, (i + 1).toString());
}

points.forEach((p, i) => {});

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
