export default str => (
  str.split('').reduce((result, char) => (
    char.match(/[A-Z]/) ? `${result}-${char.toLowerCase()}` : `${result}${char}`
  ), '')
);

