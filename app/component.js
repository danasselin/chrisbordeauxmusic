export default () => {
  const element = document.createElement('div');
  element.setAttribute('id', 'root');
  element.innerHTML = 'My app finally works';

  return element;
};
