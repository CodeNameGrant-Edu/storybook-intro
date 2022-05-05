import React from 'react';
import InboxScreen from './InboxScreen';
import store from '../../lib/store';
import { Provider } from 'react-redux';
import { rest } from 'msw';
import { MockedState } from '../TaskList';
import { fireEvent, within, waitFor, waitForElementToBeRemoved } from '@storybook/testing-library';

export default {
  title: 'screens/InboxScreen',
  component: InboxScreen,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    )
  ]
};

const Template = () => <InboxScreen />;

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      rest.get('https://jsonplaceholder.typicode.com/todos?userId=1', (_, res, ctx) =>
        res(ctx.json(MockedState.tasks))
      )
    ]
  }
};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Waits for the component to transition from the loading state
  await waitForElementToBeRemoved(await canvas.findByTestId('loading'));

  await waitFor(async () => {
    // Simulates pinning the first task
    await fireEvent.click(canvas.getByLabelText('pinTask-1'));
    // Simulates pinning the first task
    await fireEvent.click(canvas.getByLabelText('pinTask-3'));
  });
};

export const Error = Template.bind({});
Error.parameters = {
  msw: {
    handlers: [
      rest.get('https://jsonplaceholder.typicode.com/todos?userId=1', (_, res, ctx) =>
        res(ctx.status(403))
      )
    ]
  }
};
