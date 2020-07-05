import Two from "two.js";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import * as morphdom from "morphdom";
let morph = morphdom.default;

function makeHopper(pos, size: number, id: string) {
  let two = window.two;
  let verts = [
    new Two.Anchor(0, 0),
    new Two.Anchor(size, 0),
    new Two.Anchor(size, size),
    new Two.Anchor(size / 2, size * 1.25),
    new Two.Anchor(0, size),
    new Two.Anchor(0, 0)
  ];
  let verts2 = [
    new Two.Anchor(size, 0),

    new Two.Anchor(size + 10, 0 + 10),
    new Two.Anchor(size + 10, size + 10),
    new Two.Anchor(size / 2 + 10, size * 1.25 + 10),
    new Two.Anchor(10, size + 10),
    new Two.Anchor(0, size)
  ];
  let body1 = two.makePath(verts, true);
  let body2 = two.makePath(verts2, true);
  let line = two.makeLine(
    size / 2,
    size * 1.25,
    size / 2 + 10,
    size * 1.25 + 10
  );
  let line2 = two.makeLine(size, size, size + 10, size + 10);

  body1.fill = "white";
  body2.fill = "lavender";

  let group = two.makeGroup(body2, body1, line, line2);
  two.update();

  let r = 25;
  let contentId = "content" + id;
  const htmlString = ReactDOMServer.renderToStaticMarkup(
    <React.Fragment>
      <foreignobject x="0" y="0" width={size} height={size * 1.25}>
        <div id={contentId}>{/* <h1>{id}</h1> */}</div>
      </foreignobject>
      <svg
        width={r * 2}
        height={r * 2}
        x={size / 2 - r}
        y={size * 1.25 - r - 5}
        viewBox={`${-r} ${-r} ${2 * r} ${2 * r}`}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <circle
          cx={r * 0.15}
          cy={r * 0.15}
          r={`${r * 0.8}`}
          fill="lavender"
          stroke="black"
        />

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

  group.translation.set(pos.x - size / 2, pos.y - size / 2);
  //   let htmlContent = document.getElementById(contentId);
  return {
    setText(word) {
      let newHTML = `
          
          <div id="${contentId}">
           ${word}
          </div>
          `;
      let htmlContent = document.getElementById(contentId);

      //   console.log(word);

      //   morph(htmlContent, newHTML);
      htmlContent.innerHTML = word;
    }
  };
}

function makeBox(pos, size: number, id: string) {
  let two = window.two;
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
  let contentId = "content" + id;
  const htmlString = ReactDOMServer.renderToStaticMarkup(
    <React.Fragment>
      <svg
        width={r * 2}
        height={r * 2}
        x={size - r}
        y={size - r}
        viewBox={`${-r} ${-r} ${2 * r} ${2 * r}`}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <circle
          cx={r * 0.15}
          cy={r * 0.15}
          r={`${r * 0.8}`}
          fill="lavender"
          stroke="black"
        />

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
      <foreignobject x="0" y="0" width={size} height={size}>
        <div id={contentId}>{/* <h1>{id}</h1> */}</div>
      </foreignobject>
    </React.Fragment>
  );
  let svgElem = group._renderer.elem;

  svgElem.innerHTML += htmlString;

  group.translation.set(pos.x - size / 2, pos.y - size / 2);
  //   let htmlContent = document.getElementById(contentId);
  return {
    setText(word) {
      let newHTML = `
        
        <div id="${contentId}">
         ${word}
        </div>
        `;
      let htmlContent = document.getElementById(contentId);

      //   console.log(word);

      //   morph(htmlContent, newHTML);
      htmlContent.innerHTML = word;
    }
  };
}

function makePath(a, b) {
  let mid = new Two.Vector(a.x, b.y);
  two.makeLine(a.x, a.y, mid.x, mid.y);
  two.makeLine(mid.x, mid.y, b.x, b.y);
}

function makeConnector(p1, p2, id, flip = false) {
  let two = window.two;
  // let path = makePath(p1, p2);

  let group = two.makeGroup();
  two.update();
  let rx = 45;
  let ry = 45;
  let sweep = 0;
  let rotate = 0;
  if (p2.x < p1.x) {
    rx *= -1;
    sweep = 1 - sweep;
    rotate = 180;
  }
  if (p2.y > p1.y) {
    ry *= -1;
    sweep = 1 - sweep;
  }
  let length = Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);

  let pM = new Two.Vector(p2.x, p1.y);
  let xFirst = 1;
  let yFirst = 0;
  if (flip) {
    pM = new Two.Vector(p1.x, p2.y);
    rx *= -1;
    ry *= -1;
    xFirst = 0;
    yFirst = 1;
    sweep = 1 - sweep;
  }

  let word = "gobshite";
  if (rotate > 0) {
    word = word
      .split("")
      .reverse()
      .join("");
  }
  const htmlString = ReactDOMServer.renderToStaticMarkup(
    <React.Fragment>
      <path
        className="textpath"
        id={id}
        d={`M ${p1.x} ${p1.y}
  L  ${pM.x - rx * xFirst} ${pM.y - ry * yFirst}
  A 45, 45, 0, 0, ${sweep}, ${pM.x - rx * yFirst} ${pM.y - ry * xFirst}
  L  ${p2.x} ${p2.y}
  `}
        fill="transparent"
      />

      <text width="100%" rotate={rotate}>
        <textpath
          href={"#" + id}
          startOffset="00px"
          id={"textpath" + id}
          alignmentBaseline="middle"
        >
          {word}
          {/* <animate
              attributeName="startOffset"
              from="0%"
              to="100%"
              begin="0s"
              dur={`${length / 50}s`}
              repeatCount="indefinite"
            /> */}
        </textpath>
      </text>
    </React.Fragment>
  );
  let svgElem = group._renderer.elem;

  svgElem.innerHTML += htmlString;

  let path: SVGPathElement = document.getElementById(id);
  let pathLength = path.getTotalLength();

  let textPath: SVGTextPathElement = document.getElementById("textpath" + id);
  textPath.setAttribute(
    "startOffset",
    `${-textPath.getComputedTextLength()}px`
  );

  return {
    sendWord(word: string): Promise<unknown> {
      if (rotate > 0) {
        word = word
          .split("")
          .reverse()
          .join("");
      }
      textPath.textContent = word;
      if (!textPath) {
        throw new Error("no path");
      }

      const animationProgress = new Promise((resolve, reject) => {
        let offset = -textPath.getComputedTextLength();
        let updateOffset = () => {
          if (!textPath) {
            throw new Error("no path");
          }
          offset += 5;
          textPath.setAttribute("startOffset", `${offset}px`);
          if (offset < pathLength) {
            window.requestAnimationFrame(updateOffset);
          } else {
            //   console.log("done :)");
            resolve();
          }
        };
        updateOffset();
      });

      return animationProgress;
    }
  };
}
function makeGradient(x, y, size) {
  let two = window.two;
  var linearGradient = two.makeLinearGradient(
    0,

    -size / 2,
    0,

    size / 2,
    new Two.Stop(0, "rgba(255,255,255,0)"),
    // new Two.Stop(0.5, "blue")
    new Two.Stop(0.5, "rgba(255,255,255,255)")
    // new Two.Stop(1, )
  );

  var rectangle = two.makeRectangle(x, y, size, size);
  //   var rectangle2 = two.makeRectangle(x, y, size, size);

  rectangle.noStroke();

  rectangle.fill = linearGradient;
}

export { makeConnector, makeBox, makeHopper, makeGradient };
