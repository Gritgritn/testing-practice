import { test, expect } from '@playwright/test';

test.describe('Modal Component', () => {
  test.beforeEach(async ({ page }) => {
    // Откройте страницу с компонентом App
    await page.goto('http://localhost:3000/testing-practice'); // Убедитесь, что ваш сервер запущен и доступен по этому URL
  });
  test('should authorize user and close modal', async ({ page }) => {
    // Откройте модальное окно
    await page.click('button:has-text("Авторизоваться")');

    // Проверьте, что модальное окно открыто
    const modal = await page.waitForSelector('[data-testid="modal"]');
    expect(modal).toBeTruthy();

    // Выполните авторизацию (предполагается, что есть форма с data-testid="login-form")
    await page.getByPlaceholder("Email").fill('tester@gmail.com');
    await page.getByPlaceholder("Пароль").fill('12345678');
    await page.getByTestId('login-button').click();

    // Проверьте, что модальное окно закрыто
    const modalClosed = await page.waitForSelector('[data-testid="modal"]', { state: 'hidden' });
    expect(modalClosed).toBeFalsy();

    // Проверьте, что пользователь авторизован
    const authorizedMessage = await page.waitForSelector('text=Вы авторизованы');
    expect(authorizedMessage).toBeTruthy();
  });
});