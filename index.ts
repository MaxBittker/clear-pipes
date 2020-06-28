// import onePng from './assets/1.png';

import {} from "./src/render";
import { editorRatio, tileSize } from "./src/state";
import {} from "./src/utils";

let frame = <HTMLElement>document.getElementById("editor-frame");

function updateFrameHeight() {
  // frame.style.height = canvas.getBoundingClientRect().width + "px";
}
document.addEventListener("DOMContentLoaded", updateFrameHeight);
window.addEventListener("resize", updateFrameHeight);

frame.classList.toggle("selected");
