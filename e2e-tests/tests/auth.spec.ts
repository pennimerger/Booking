import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/"

test('allow sign in', async ({ page }) => {
  await page.goto(UI_URL);

  // get sign in button
  await page.getByRole("link", {name: "Sign In"}).click()

 // Expect page to have a heading with the name Sign In.
  await expect(page.getByRole("heading", {name: "Sign In"})).toBeVisible()

  // Populate fields
  await page.locator("[name=email]").fill("logintest@test.com")
  await page.locator("[name=password]").fill("correct")

  await page.getByRole("button", { name: "Login" }).click()

  await expect(page.getByText("Sign in Successful!")).toBeVisible()
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible()
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible()
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible()

  // // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);
});

test("allow registeration", async ({ page }) => {
  const testEmail = `fe2e_${
    Math.floor(Math.random() * 90000) + 10000
  }@test.com`
  await page.goto(UI_URL)

  await page.getByRole("link", { name: "Sign In" }).click()
  await page.getByRole("link", { name: "Create an account here" }).click()
  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible()

  await page.locator("[name=firstName]").fill("fe2e")
  await page.locator("[name=lastName]").fill("le2e")
  await page.locator("[name=email]").fill(testEmail)
  await page.locator("[name=password]").fill("correct")
  await page.locator("[name=confirmPassword]").fill("correct")

  await page.getByRole("button", { name: "Create Account" }).click()

  await expect(page.getByText("Registration Success!")).toBeVisible()
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible()
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible()
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible()
})
