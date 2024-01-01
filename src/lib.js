export const jsx = (type, props, ...children) => {
  return { type, props: { ...(props === null ? {} : props), children } };
};

export const createRoot = (target) => {
  return {
    render(source) {
      render(target, source);
    },
    unmount() {},
  };
};

const isValidDomProperty = ([key]) =>
  key !== 'children' && !key.startsWith('on');
const isValidDomEvent = ([key]) => key !== 'children' && key.startsWith('on');

const render = (target, source) => {
  if (Array.isArray(source)) {
    for (const element of source) {
      render(target, element);
    }
    return;
  }
  if (typeof source === 'string') {
    const textNode = document.createTextNode(source);
    target.appendChild(textNode);
    return;
  }
  if (typeof source.type === 'string') {
    const element = document.createElement(source.type);
    const propsEntries = Object.entries(source.props);
    propsEntries.filter(isValidDomProperty).forEach(([key, value]) => {
      element[key] = value;
    });
    propsEntries.filter(isValidDomEvent).forEach(([key, value]) => {
      element.addEventListener(key.slice(2).toLowerCase(), value);
    });
    target.appendChild(element);
    if (source.props.children) {
      render(element, source.props.children);
    }
    return;
  }
  if (typeof source.type === 'function') {
    render(target, source.type(source.props));
    return;
  }
};
