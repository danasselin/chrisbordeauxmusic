export default (text = 'Yello world') => {
  const element = document.createElement('div');
  element.innerHTML = text;

  return element;
};
