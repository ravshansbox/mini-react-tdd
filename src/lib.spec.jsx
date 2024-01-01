import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { createRoot } from './lib';

let container;
let root;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  root.unmount();
  document.body.removeChild(container);
});

it('should render a string', () => {
  root.render('Hello');

  expect(container.innerHTML).toBe('Hello');
});

it('should render an array of strings', () => {
  root.render(['Hello1', 'Hello2']);

  expect(container.innerHTML).toBe('Hello1Hello2');
});

it('should render a host element', () => {
  root.render(<h1>Hello</h1>);

  expect(container.innerHTML).toBe('<h1>Hello</h1>');
});

it('should render an array of host elements', () => {
  root.render([<h1>Hello1</h1>, <h2>Hello2</h2>]);

  expect(container.innerHTML).toBe('<h1>Hello1</h1><h2>Hello2</h2>');
});

it('should render a component', () => {
  const Message = ({ text }) => <p>{text}</p>;

  root.render(<Message text="Hello" />);

  expect(container.innerHTML).toBe('<p>Hello</p>');
});

it('should render an array of components', () => {
  const Hello = ({ text }) => <p>{text}</p>;

  root.render([<Hello text="Hello1" />, <Hello text="Hello2" />]);

  expect(container.innerHTML).toBe('<p>Hello1</p><p>Hello2</p>');
});

it('should render a host element with multiple children', () => {
  root.render(
    <main>
      <h1>Hello1</h1>
      <h1>Hello2</h1>
    </main>
  );

  expect(container.innerHTML).toBe(
    '<main><h1>Hello1</h1><h1>Hello2</h1></main>'
  );
});

it('should render a host element with properties', () => {
  root.render(
    <label htmlFor="username" className="large">
      Username
    </label>
  );

  expect(container.innerHTML).toBe(
    '<label for="username" class="large">Username</label>'
  );
});

it('should render a host element with event handlers', () => {
  const onClick = vi.fn();
  root.render(<button onClick={onClick}>Hello</button>);

  document.querySelector('button').click();

  expect(onClick).toHaveBeenCalled();
});
