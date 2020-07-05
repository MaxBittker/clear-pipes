import Two from "two.js";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import * as Matter from "matter-js";
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

text = ` 
Advertisement
Supported by
Perfectionism is common, heritable, and painful for many children.
By Jessica Grose
One of my kids was showing signs of perfectionism before she could fully speak. It was clear to us she knew how to say more words than she would utter, but she wouldn’t say them aloud, or repeatedly, until she knew they were correct.
In some ways, kids with perfectionist leanings are the kind you “hope to have,” said Dunya Poltorak, Ph.D., a pediatric and young-adult medical psychologist in private practice in Birmingham, Mich. They tend to be “responsible, achievement-oriented, have good values, and are very principled,” she said.
In quarantine, however, since I have become so much more intimately involved in her learning, I see how much pain her trying to be perfect causes her. If she gets two answers wrong on a math worksheet, it’s all she can talk about — not the 18 answers she got right. And that “failure” in her mind will often metastasize into a meltdown.
She had a wonderful teacher this year, who noticed her perfectionist tendencies, and was helping her work through it. My kid would come home and tell me, “You can’t learn if you don’t make mistakes!” When I try to tell her the same thing she rolls her eyes. I have even been doing all the expert-approved tips I wrote about in January to get my kid more comfortable with failure, like asking her questions about her process, praising her focus, modeling persistence, telling her about times in my life when I failed and it was OK. But nothing seems to help.
Since our new normal isn’t going back to the old normal any time soon, I talked to a child psychologist, a research psychologist who focuses on perfectionism, and an educator, to figure out how best to support children who strive to be perfect. As always, if you’re concerned about your child’s mental health, please reach out to your pediatrician as a first step in getting help.
Perfectionism is common, and it can have many origins. Perfectionism is heritable, said Gordon Flett, Ph.D., the director of the LaMarsh Centre for Child and Youth Research at York University, who has been researching perfectionism in children and adults for decades. (I’m a Type-A nut job, so it’s not really surprising my kid is hard on herself.) Some kids may show signs of perfectionism as young as 3 or 4, he said.
But genetics aren’t the whole story. Research has shown that perfectionism has increased among children and teenagers over the past few decades, and studies show that by the time children reach adolescence, between 25 and 30 percent of them have “maladaptive perfectionism,” or striving for unrealistic perfection to the point of causing them pain. A greater number have less destructive forms of perfectionism. If left unchecked, perfectionism is a risk factor for clinical depression and anxiety.
Family pressure to achieve can affect children, but so can social influences outside the home. If your kid is surrounded by other very competitive children in a high-pressure school environment, they may feel “shame and embarrassment if they weren’t keeping up with the pack,” Dr. Flett said. Social media may also be exacerbating perfectionism in kids. “We see now what happens when someone famous or infamous makes a mistake,” he said — thousands of people are ready to pounce on them. “The consequences of making a mistake seem amplified.”
Know the signs of problematic perfectionism. One sign your child’s perfectionist tendencies may be overwhelming is that your kid becomes excessively self-deprecating, Dr. Poltorak said. They may say things like, “I’m not worthy. I’m so stupid. How did I mess up? I hate myself. I can’t do anything right. Those self-deprecating comments are very worrisome,” she said.
Another sign is that they have trouble getting over perceived failure, Dr. Poltorak said. “It’s typical for a child to have a frustrated response to something that didn’t go their way. The problem is if it’s happening a lot and they can’t move on from it,” she said.
A third sign is that they shy away from trying new things you know they want to do, said Marisa Porges, the head of the Baldwin School in Bryn Mawr, Pa., and the author of the forthcoming book “What Girls Need: How to Raise Bold, Courageous, and Resilient Women.” They think trying a new sport, or even the next level of assignment, opens them up for criticism, she said.
A fourth sign is a lack of ability to be happy or satisfied with accomplishments, Dr. Flett said, because they’re so busy picking their triumphs apart.
How you can help. If your child is in the middle of a spiral to be perfect, try to just be present, Dr. Poltorak said. “Their feelings are so big in that moment, if you try to jump in, then they feel unheard,” she said. If parents start escalating, they feel more worthless and ashamed of themselves. You know your child best: If they respond to physical touch, maybe just hold them or stroke their hair. If they don’t, then just sit near them and listen.
Once they’ve calmed down, you can tell them that what they perceive as their failure is not their fault; it could have happened to anyone for any reason, Dr. Poltorak said. Then after you’ve had the conversation, move on. You don’t have to come back to it, because that may make it feel bigger than it needs to be.
Porges suggested telling stories about times you made mistakes as a child or times you were afraid to do something, and how you moved on from those moments. “It’s about being vulnerable with our kids in ways we don’t typically think to be,” she said.
Finally, if you’re concerned that you are putting pressure on your children to achieve, and that is exacerbating their perfectionist tendencies, try to think back to their first weeks of life, Dr. Flett said. “Did you need them to do anything but be there?”
P.S. Click here to read all NYT Parenting coverage on coronavirus. Follow us on Instagram @NYTParenting. Join us on Facebook. Find us on Twitter for the latest updates. Read last week’s newsletter, about parental burnout.
P.P.S. Today’s One Thing comes from Stephanie Mayer, a mom in Weehawken, N.J., who started weekly “camp-outs” for her kids. She blows up an air mattress in the living room, then they watch a movie and make shadow puppets. “It gives them something to look forward to all week, and something for us to hold over their heads,” she said. “A win-win.”
Learning how to fail is one way to help kids manage their perfectionist tendencies.
For those with older children, this piece from Jane Adams, a social psychologist, writer and coach, about dealing with college students with perfectionism, is essential reading.
Indecision may actually be a sign of perfectionism — learn how to identify and manage it, for yourself and your kids.
Parenting can be a grind. Let’s celebrate the tiny victories.
I was fed up with trying to figure out which tiny socks belonged to my 1-year-old vs. my 4-year-old so now the baby only has striped socks and the older kid has solid-colored socks. The older kid’s socks are handed down to her cousin. — Janice A. Clear, Brooklyn
If you want a chance to get your Tiny Victory published, find us on Instagram @NYTparenting and use the hashtag #tinyvictories; email us; or enter your Tiny Victory at the bottom of this page. Include your full name and location. Tiny Victories may be edited for clarity and style. Your name, location and comments may be published, but your contact information will not. By submitting to us, you agree that you have read, understand and accept the Reader Submission Terms in relation to all of the content and other information you send to us.
Advertisement
;`;
let words = text.split(/(\s+)/).filter(w => w.trim().length > 0);

let p1 = new Two.Vector(200, 200);
let p2 = new Two.Vector(500, 450);
let p3 = new Two.Vector(220, 650);
let p4 = new Two.Vector(700, 450);
let c1 = makeConnector(p1, p2, "1", true);
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
// b1.setText(formatWords(words));

b2.setText("CHECK");
// b3.setText(" ");

let destinationWords: Array<string> = [];

function moveWord() {
  let wordToMove = words.shift();

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
// moveWord();
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

// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create({
  positionIterations: 10,
  constraintIterations: 10,
  enableSleeping: true
});

// create a renderer
let el = document.getElementById("contenta");
console.log(el.getBoundingClientRect().width);
console.log(el.getBoundingClientRect().height);
var render = Render.create({
  element: el,
  engine: engine,
  options: {
    width: 350,
    height: 350,
    wireframes: false,
    background: "transparent"
    // enableSleeping: true
  }
});

// create two boxes and a ground

words = words.slice(0, 100);
let boxes = words.map(word => {
  let w = word.length * 8;
  let h = 15;
  let body = Bodies.rectangle(
    100 + Math.random() * 100,
    -Math.random() * 800,
    w,
    h,
    {
      fillStyle: "red",
      strokeStyle: "blue",
      lineWidth: 3
    }
  );
  body._width = w;
  body._height = h;

  // body.setDensity(9);
  // body.friction = 0.5;
  body.frictionAir = 0.1;
  body.name = word;
  // body.frictionStatic = 0.9;
  // body.resitution = 0.8;

  return body;
});

var ground = Bodies.rectangle(200, 350, 400, 6, { isStatic: true });
var leftWall = Bodies.rectangle(0, 200, 6, 400, { isStatic: true });
var rightWall = Bodies.rectangle(350, 200, 6, 400, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [ground, leftWall, rightWall, ...boxes]);

// run the engine
Engine.run(engine);

// run the renderer
// Render.run(render);

let radToDeg = r => r * (180 / Math.PI);

Matter.Events.on(engine, "afterUpdate", () => {
  const bodies = boxes;

  const paths = bodies.map((body, index) => {
    const { vertices, position, angle } = body;
    const pathData = `M ${body._width * -0.5} ${body._height * -0.5} l ${
      body._width
    } 0 l 0 ${body._height} l ${-body._width} 0 z`;
    const style = `fill: black; fill-opacity: 0.03; stroke: black; stroke-width: 1px; stroke-opacity: 0.7`;
    const degrees = radToDeg(angle);
    const transform = `translate(${position.x}, ${position.y}) rotate(${degrees})`;
    const textStyle = `font-size: 15px; alignment-baseline: middle; text-anchor: middle;`;
    let path = null;
    path = `<path d="${pathData}" style="${style}"></path>`;
    return `
      <g transform="${transform}" >
        ${path}
        <text style="${textStyle}">${body.name}</text>
      </g>
    `;
  });
  const style = `height: ${height}px; width: ${width}px; shape-rendering: geometricPrecision;`;
  b1.setText(`
    <svg style="${style}">${paths}</svg>
  `);
});
