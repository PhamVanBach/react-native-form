import { describe, expect } from '@jest/globals';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Alert } from 'react-native';

import App from '../src/App';

const spyAlert = jest.spyOn(Alert, 'alert');
describe('App', () => {
  it('renders correctly', async () => {
    const { getByTestId, getByText } = render(<App />);

    const nameInput = getByTestId('name');
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const submitButton = getByText('Submit');

    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(emailInput, 'john.doe@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(spyAlert).toHaveBeenCalledWith(
        'data',
        JSON.stringify({
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: 'password123',
        }),
      );
    });
  });
});
