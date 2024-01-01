import { createRoot } from './lib';
import { App } from './App';

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
