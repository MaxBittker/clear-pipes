import {} from "./state";
function remove_first_occurrence(str, searchstr) {
  let index = str.indexOf(searchstr);
  if (index === -1) {
    return str;
  }
  return str.slice(0, index) + str.slice(index + searchstr.length);
}

function subtract(a, b) {
  let letters = b.split("");
  let out = a;

  letters.forEach(l => {
    out = remove_first_occurrence(out, l);
  });
  return out;
}
export { subtract };
