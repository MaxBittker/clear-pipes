const textPath = document.querySelector("#text-path");

const h = document.documentElement,
  b = document.body,
  st = "scrollTop",
  sh = "scrollHeight";

document.addEventListener("click", e => {
  let percent = Math.random() * 100;
  textPath.setAttribute("startOffset", (percent * 40 + 1200).toString());
});
