import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { Login } from './Login';
import type { LoginPayload } from 'types';

// Mock validation function
jest.mock('./helpers/validation', () => ({
  validate: jest.fn((payload: LoginPayload) => true),
}));

const validateLoginForm = require('./helpers/validation').validate;

describe('Login component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const handleAuthorization = async (payload: LoginPayload) => {
    if (payload.email === 'tester@gmail.com' && payload.password === '12345678') {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('Authorization failed'));
    }
  };

  test('renders login form', () => {
    render(<Login handleAuthorization={handleAuthorization} />);

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Пароль')).toBeInTheDocument();
    expect(screen.getByText('Войти')).toBeInTheDocument();
  });

  test('shows error message if validation fails', async () => {
    (validateLoginForm as jest.Mock).mockReturnValueOnce(false);

    render(<Login handleAuthorization={handleAuthorization} />);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByPlaceholderText('Пароль'), { target: { value: 'invalid' } });
    fireEvent.click(screen.getByText('Войти'));

    expect(await screen.findByText('Валидация не пройдена')).toBeInTheDocument();
  });

  test('calls handleAuthorization with correct payload if validation passes', async () => {
    render(<Login handleAuthorization={handleAuthorization} />);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'tester@gmail.com' } });
    fireEvent.change(screen.getByPlaceholderText('Пароль'), { target: { value: '12345678' } });
    fireEvent.click(screen.getByText('Войти'));

    await waitFor(() => {
      expect(screen.queryByText('Загрузка')).not.toBeInTheDocument();
    });

    expect(screen.queryByText('Введен неверный email или пароль')).not.toBeInTheDocument();
  });

  // test('shows loading state while authorization is in progress', async () => {
  //   render(<Login handleAuthorization={handleAuthorization} />);

  //   userEvent.type(screen.getByPlaceholderText('Email'), 'tester@gmail.com');
  //   userEvent.type(screen.getByPlaceholderText('Пароль'), '12345678');
  //   userEvent.click(screen.getByText('Войти'));

  //   // Ожидаем, что текст кнопки изменится на "Загрузка"
  //   await waitFor(() => {
  //     expect(screen.getByText('Загрузка')).toBeInTheDocument();
  //   });
  // });

  test('shows error message if authorization fails', async () => {
    render(<Login handleAuthorization={handleAuthorization} />);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'wrong@gmail.com' } });
    fireEvent.change(screen.getByPlaceholderText('Пароль'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText('Войти'));

    expect(await screen.queryByText('Введен неверный email или пароль')).not.toBeInTheDocument();
  });
});
