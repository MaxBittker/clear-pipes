import * as Matter from "matter-js";

// module aliases
let Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies;

// create an engine
let engine = Engine.create({
  positionIterations: 5,
  constraintIterations: 5
  //   enableSleeping: true
});

let scratchSvg = document.getElementById("scratch");
const textStyle = `font-size: 15px; alignment-baseline: middle; text-anchor: middle;`;
function renderedTextSize(string: string) {
  scratchSvg.innerHTML = `<text id="scratchText" style="${textStyle}">${string}</text>`;
  let scratchText = document.getElementById("scratchText");
  var bBox = scratchText.getBBox();
  return {
    width: bBox.width,
    height: bBox.height
  };
}
function startPhysics(box) {
  let boxes = [];

  //   words = words.slice(0, 100);

  let ground = Bodies.rectangle(200, 350 * 1.25, 400, 6, { isStatic: true });
  let leftWall = Bodies.rectangle(0, 200, 6, 400, { isStatic: true });
  let rightWall = Bodies.rectangle(350, 200, 6, 400, { isStatic: true });
  let leftRamp = Bodies.rectangle(50, 5 + 350 * 1.0625, 300, 20, {
    isStatic: true,
    angle: Math.PI * 0.15
  });
  let rightRamp = Bodies.rectangle(300, 5 + 350 * 1.0625, 300, 20, {
    isStatic: true,
    angle: Math.PI * 0.85
  });

  // add all of the bodies to the world
  World.add(engine.world, [ground, leftWall, rightWall, leftRamp, rightRamp]);
  //   World.add(engine.world, [ground, leftWall, rightWall]); //, leftRamp, rightRamp]);

  // run the engine
  Engine.run(engine);

  let radToDeg = r => r * (180 / Math.PI);

  Matter.Events.on(engine, "afterUpdate", () => {
    const paths = boxes.map((body, index) => {
      // const paths = engine.world.bodies.map((body, index) => {
      const { vertices, position, angle } = body;
      const pathData = `M ${body._width * -0.5} ${body._height * -0.5} l ${
        body._width
      } 0 l 0 ${body._height} l ${-body._width} 0 z`;

      let fillColor = !body.pulse ? "white" : "rgba(255,230,230)";
      const style = `fill: ${fillColor}; fill-opacity: 1; stroke: grey; stroke-width: 1px; stroke-opacity: 0.5`;
      const degrees = radToDeg(angle);
      const transform = `translate(${position.x}, ${position.y}) rotate(${degrees})`;
      let path = null;
      path = `<path d="${pathData}" style="${style}"></path>`;
      return `
      <g transform="${transform}" >
        ${path}
        <text style="${textStyle}">${body.label}</text>
      </g>
    `;
    });
    const style = ` shape-rendering: geometricPrecision;`;
    box.setText(`
    <svg style="${style}">${paths}</svg>
  `);
  });
  return {
    addWord: (word: string) => {
      let { width, height } = renderedTextSize(word);
      width += 5;
      height += 5;
      let body = Bodies.rectangle(
        100 + Math.random() * 100,
        -Math.random() * 800,
        width,
        height
      );
      body._width = width;
      body._height = height;
      body.frictionAir = 0.05;
      body.label = word;

      boxes.push(body);
      World.add(engine.world, body);
      return body;
    },
    removeWord: () => {
      let box = boxes[0];
      if (!box) return;
      //   box.isSleeping = false;
      Matter.Body.setVelocity(box, { x: 0, y: -5 });
      box.pulse = true;
      //   console.log("a");
      window.setTimeout(() => {
        // console.log("c");
        World.remove(engine.world, box);
        boxes.shift();
      }, 200);

      return box.label;
    }
  };
}
export { startPhysics };
