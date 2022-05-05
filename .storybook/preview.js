import '../src/index.css';

// Registers the Mock Service Worker addon
import { initialize, mswDecorator } from 'msw-storybook-addon';

// initialize MSW
initialize();

// Provide the MSW addon decorator globally
export const decorators = [mswDecorator];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};
