import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("home renders without runtime errors or horizontal overflow", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Move with");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".hero-photo img")).toBeVisible();
  expect(await page.locator(".hero-photo img").evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: `test-results/${testInfo.project.name}-home.png`, fullPage: true });
  expect(errors).toEqual([]);
});

test("knee explorer and concern selector carry the service into consultation", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Explore meniscus", exact: true }).click();
  await expect(page.getByRole("heading", { name: "The cushioning within your knee." })).toBeVisible();
  await page.getByRole("link", { name: "Discuss your knee with us" }).click();
  await expect(page.getByLabel("I’d like to discuss")).toHaveValue("Meniscus discomfort");
  await page.getByRole("button", { name: "Everyday knee discomfort" }).click();
  await page.getByRole("button", { name: "See my next step" }).click();
  await expect(page.getByRole("heading", { name: "Let’s talk about your knee." })).toBeVisible();
  await page.getByRole("link", { name: "Prepare your consultation" }).click();
  await expect(page.getByLabel("I’d like to discuss")).toHaveValue("Knee joint care");
});

test("appointment validates input and prepares an accurate message without sending", async ({ page }) => {
  await page.goto("/?service=Knee%20joint%20care#consultation");
  await page.getByLabel("Full name").fill("Test Visitor");
  await page.getByLabel("Phone number").fill("invalid");
  const nextWeek = new Date(); nextWeek.setDate(nextWeek.getDate() + 7);
  const date = `${nextWeek.getFullYear()}-${String(nextWeek.getMonth() + 1).padStart(2, "0")}-${String(nextWeek.getDate()).padStart(2, "0")}`;
  await page.getByLabel("Preferred date").fill(date);
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Review consultation request" }).click();
  await expect(page.getByRole("alert").filter({ hasText: "valid phone number" })).toBeVisible();
  await page.getByLabel("Phone number").fill("+91 98765 43210");
  await page.getByRole("button", { name: "Review consultation request" }).click();
  await expect(page.getByText("Ready to send — no message sent yet")).toBeVisible();
  const href = await page.getByRole("link", { name: "Continue to WhatsApp" }).getAttribute("href");
  expect(href).toContain("https://wa.me/918805777500?text=");
  const message = new URL(href!).searchParams.get("text");
  expect(message).toContain("Test Visitor");
  expect(message).toContain("Knee joint care");
  expect(message).toContain(date);
  await page.getByRole("button", { name: "Edit details" }).click();
  await expect(page.getByLabel("Full name")).toHaveValue("Test Visitor");
  await expect(page.getByLabel("Phone number")).toHaveValue("+91 98765 43210");
});

test("FAQs, navigation, guide and not-found page work", async ({ page }, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toHaveCount(0);
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "FAQs" }).click();
    await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toHaveCount(0);
  }
  await page.getByText("Will I need surgery?", { exact: true }).click();
  await expect(page.locator("details[open]")).toContainText("Whether surgery");
  await page.getByRole("link", { name: "Read the consultation guide" }).click();
  await expect(page).toHaveURL(/knee-treatment-guide/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Your first visit");
  const response = await page.goto("/missing-page");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("link", { name: "Back to Jivan Urja" })).toBeVisible();
});

test("homepage has no serious or critical accessibility violations", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(document.getAnimations().map((animation) => animation.finished.catch(() => {})));
  });
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""))).toEqual([]);
});
