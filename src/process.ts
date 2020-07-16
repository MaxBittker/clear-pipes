function processLine(str) {
  let toks = str.split("~");
  return toks;
}
function processArticle(str) {
  let lines = str.split("\n");
  let url = lines.shift();
  let rest = lines.filter(l => !l.startsWith("Advertisement")).map(processLine);
  return rest;
}

function processTDV(str) {
  let articles = str.split("ARTICLE:");
  return articles.map(processArticle);
  //   console.log(articles);
}

export { processTDV };
