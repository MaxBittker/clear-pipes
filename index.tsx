import Two from "two.js";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import {
  makeConnector,
  makeBox,
  makeInfoBox,
  makeGradient,
  makeHopper
} from "./src/render";
import { startPhysics } from "./src/physics";
import { processTDV } from "./src/process";
import { Vector } from "matter-js";
import { subtract } from "./src/utils";

let elem = document.getElementById("draw-animation");
let width = window.innerWidth;
let height = window.innerHeight;
window.width = width;
window.height = height;

let two = new Two({ fullscreen: true, autostart: true }).appendTo(elem);
two.renderer.domElement.setAttribute("viewBox", "-0 -0 1000 1050");

window.two = two;

let pHopper = new Two.Vector(200, 220);
let pClean = new Two.Vector(200, 30 + 750);
let pRule = new Two.Vector(500, 30 + 750);
// let pCache = new Two.Vector(600, 750);
let pCheck = new Two.Vector(800, 30 + 750);
let pDestination = new Two.Vector(950, 350);
let pTrash = new Two.Vector(0, 30 + 870);
let pTrash2 = new Two.Vector(0, 30 + 905);
let pTrash3 = new Two.Vector(0, 30 + 940);
// let pTrash4 = new Two.Vector(0,  975);
let pGradient = new Two.Vector(0, 30 + 905);

let c1 = makeConnector(
  new Two.Vector(200, 420),
  pClean,
  "1",
  true,
  "wiggle",
  true
);
let c2 = makeConnector(pClean, pRule, "2", false, "l");
// let c3 = makeConnector(pRule, pCache, "3", false, "l");
let c3 = makeConnector(pRule, pCheck, "3", false, "loop");
let c4 = makeConnector(pCheck, pDestination, "4");

let cTrash1 = makeConnector(pClean, pTrash, "t1", true);
let cTrash2 = makeConnector(pRule, pTrash2, "t2", true);
// let cTrash3 = makeConnector(pCache, pTrash3, "t3", true);
let cTrash3 = makeConnector(pCheck, pTrash3, "t4", true);
let trashGradient = makeGradient(pGradient.x, pGradient.y, 200);
// let c7 = makeConnector(pCheck, pTrash, "5", true);

let boxHopper = makeHopper(pHopper, 350, "a");
let boxClean = makeBox(pClean, 100, "b");
boxClean.setText("Trim Punctuation");
let boxRule = makeBox(pRule, 100, "c");
boxRule.setText("Capitalized?");

// let boxCache = makeBox(pCache, 100, "d");
// boxCache.setText("Not Seen by us?");

let boxCheck = makeBox(pCheck, 100, "d");
boxCheck.setText("Exists in NYT Archives?");

let boxDestination = makeBox(new Two.Vector(900, 350), 150, "f");

function formatWords(words: Array<string>) {
  return `<p >${words.map(w => `<span >${w}</span>&nbsp;`).join(" ")}</p>`;
}

let destinationWords: Array<string> = ["Tweeted:"];
boxDestination.setText(formatWords(destinationWords));

let { addWord, removeWord, setGravity } = startPhysics(boxHopper);

let text1 = new Two.Text("", 410, 110, {
  size: 105,
  weight: 100,
  family: "Libre Franklin",
  alignment: "left"
});

let text2 = new Two.Text(`Loading...         `, 415, 190, {
  size: 60,
  weight: 100,
  family: "Libre Franklin",
  alignment: "left"
});
let text3 = new Two.Text(``, 415, 240, {
  size: 30,
  weight: 100,
  family: "Libre Franklin",
  alignment: "left"
});

let infoBox = makeInfoBox(new Two.Vector(615, 470), 410, "info");
infoBox.setText(`
<p>This is a visualization of the process behind <a href="https://twitter.com/NYT_first_said"> @nyt_first_said</a>.</p>

<p>Each day, a script scrapes new articles from nytimes.com. That text is <i>tokenized</i>, or split into words based on whitespace and punctuation. </p>

<p>Each word then must pass several criteria. Containing a number or special character is criteria for disqualification. To avoid proper nouns, all capitalized words are filtered.<p>

<p> The most important check is against the New York Time's archive search service. The archive goes back to 1851 and contains more than 13 million articles. </p>

<p>The paper publishes many thousands of words each day, but only a very few are firsts.<p> 

<a href="https://maxbittker.github.io/nyt-first-said/"> more information</a>
`);

let group = two.makeGroup(text1, text2, text3);
let group2 = two.makeGroup();
two.update();
let svgElem = group2._renderer.elem;
svgElem.innerHTML += `<a id="article-link"   >
<text x="25" y="35">
 Loading...
</text>
</a>`;

function updateArticleLink(url) {
  let articleLink = document.getElementById("article-link");
  articleLink.remove();
  svgElem.innerHTML += `<a id="article-link" target="_blank" href="${url}">
  <text x="25" y="35">
   ${url}
  </text>
  </a>`;
}

function startUp(setback) {
  let d = new Date();
  var offset = new Date().getTimezoneOffset(); // getting offset to make time in gmt+0 zone (UTC) (for gmt+5 offset comes as -300 minutes)
  d.setMinutes(d.getMinutes() + offset); // date now in UTC time
  var easternTimeOffset = -240; //for dayLight saving, Eastern time become 4 hours behind UTC thats why its offset is -4x60 = -240 minutes. So when Day light is not active the offset will be -300
  d.setMinutes(d.getMinutes() + easternTimeOffset + setback * 60);

  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "long" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

  let date = `${mo}-${da}-${ye}`;
  text1.value = `${mo} ${da}`;

  let wordList: string[] = [];
  let articles: string[][] = [];
  let article_i = 0;
  let wordCount = 0;
  let wordTotal = 0;
  function moveWord(): Promise<any> {
    text2.value = `article ${article_i + 1}/${article_i + 1 + articles.length}`;
    text3.value = `word ${wordCount.toLocaleString()} / ${wordTotal.toLocaleString()}`;
    two.update();
    wordCount++;
    if (wordList.length == 0) {
      wordList = articles.shift();
      updateArticleLink(wordList.url);
      article_i++;
      console.log("processing article " + articles);
    }
    let word = wordList.shift();

    addWord(word);

    let [initial, cleaned, passed, count, api_checked] = removeWord();

    // boxHopper.setText(formatWords(words));
    let speed = parseInt(document.getElementById("speed").value, 10);
    return c1
      .sendWord(initial, () =>
        setTimeout(moveWord, (30 + word.length * 12) / speed)
      )
      .then(() => {
        // moveWord();
        if (initial.match(`[\@\/\#\_\-]`)) {
          cTrash1.sendWord(initial);
          throw "done";
        }
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
        if (api_checked) {
          return c4.sendWord(api_checked).then(() => {
            destinationWords.push(api_checked);
            boxDestination.setText(formatWords(destinationWords));
          });
        } else {
          return cTrash3.sendWord(passed);
        }
      });
  }

  // debugger;

  two.update();
  let url = `https://api.shaderbooth.com:3002/static/records/${date}.txt`;
  fetch(url)
    .then(response => response.text())
    .then(blob => {
      if (blob.length == 0) {
        startUp(-12);
        return;
      }
      articles = processTDV(blob);
      articles.shift();
      articles = articles.reverse();
      wordTotal = articles.reduce((acc, b) => b.length + acc, 0);

      wordList = articles.shift();
      updateArticleLink(wordList.url);
      // articles = articles.sort((a, b) => a.length - b.length);
      console.log(articles);

      for (let i = 0; i < 25; i++) {
        let word = wordList.shift();
        addWord(word);
      }

      window.setTimeout(moveWord, 1400);
    });

  two.bind("update", function() {}).play(); // Finally, start the animation loop
}
startUp(0);

document.getElementById("speed").addEventListener("change", e => {
  let n = parseInt(e.target.value, 10);

  console.log(n);
  setGravity(1 + n / 20);

  document.documentElement.style.setProperty(
    "--spin-duration",
    5000 / n + "ms"
  );
});
