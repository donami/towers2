function dateToIso() {
  return function(input) {
    input = new Date(input).toISOString();
    return input;
  };
}

export default dateToIso;
