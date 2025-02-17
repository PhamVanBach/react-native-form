import * as React from 'react';
import { TextInput } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import AppForm from '../src/core/components/app-form';

describe('AppForm', () => {
  const registerMock = jest.fn();
  const setValueMock = jest.fn();
  const triggerValidationMock = jest.fn();
  const errorsMock = {};

  const TestComponent = () => (
    <AppForm
      register={registerMock}
      errors={errorsMock}
      setValue={setValueMock}
      triggerValidation={triggerValidationMock}>
      <TextInput name="testInput" />
    </AppForm>
  );

  it('should call register for each child with a name prop', () => {
    render(<TestComponent />);
    expect(registerMock).toHaveBeenCalledWith('testInput');
  });
});
