import { test, expect } from "@playwright/test";

test.describe("wyszukiwanie po id", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pl/data");
  });

  test("Not found! po wpisaniu nie istniejącego id", async ({ page }) => {
    await page.getByTestId("user-id-input").fill("-1");

    await page.getByTestId("search-button").click();

    await expect(page.getByTestId("username")).toBeVisible({ timeout: 5000 });

    await expect(page.getByTestId("username")).toHaveText("Not Found!");
  });

  test("weryfikacja id=1 po danych", async ({ page }) => {
    await page.getByTestId("user-id-input").fill("1");
    await page.getByTestId("search-button").click();

    await expect(page.getByTestId("username")).toBeVisible({ timeout: 5000 });

    await expect(page.getByTestId("username")).toHaveText("aaa");
  });

  test("weryfikacja id=1 bez świadomości danych", async ({ page }) => {
    await page.getByTestId("user-id-input").fill("1");
    await page.getByTestId("search-button").click();

    await expect(page.getByTestId("username")).toBeVisible({ timeout: 5000 });

    await expect(page.getByTestId("username")).not.toHaveText("Not Found!");
  });

  test("brak wyszukania bez wpisania id", async ({ page }) => {
    await page.getByTestId("search-button").click();

    await expect(page.getByTestId("username")).not.toBeVisible();
  });
});
