import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("navegación, responsive y página sin errores de ejecución", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/Nexo CX/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Todos tus canales.",
  );
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Abrir menú" }).click();
    await page
      .getByRole("navigation", { name: "Navegación móvil" })
      .getByRole("link", { name: "Copiloto IA" })
      .click();
    await expect(page).toHaveURL(/#copiloto$/);
    await expect(
      page.getByRole("button", { name: "Abrir menú" }),
    ).toHaveAttribute("aria-expanded", "false");
  } else {
    await page
      .getByRole("navigation", { name: "Navegación principal" })
      .getByRole("link", { name: "Copiloto IA" })
      .click();
    await expect(page).toHaveURL(/#copiloto$/);
  }
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    )
    .toBe(true);
  const faq = page.locator(".faq-item").first();
  await faq.locator("summary").click();
  await expect(faq).toHaveAttribute("open", "");
  await expect(faq.locator("p")).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      page.evaluate(
        () => getComputedStyle(document.documentElement).scrollBehavior,
      ),
    )
    .toBe("auto");
  expect(errors).toEqual([]);
});

test("formulario valida y confirma sin transmitir datos", async ({ page }) => {
  await page.goto("/");
  const form = page.getByRole("form", { name: "Hablemos de tu equipo" });
  await form
    .getByRole("button", { name: "Solicitar una demostración" })
    .click();
  await expect(
    form.getByLabel("Nombre", { exact: false }).first(),
  ).toBeFocused();
  await expect(form.getByText("Escribe tu nombre.")).toBeVisible();
  await page.getByLabel("Nombre", { exact: false }).first().fill("Elena Ríos");
  await page.getByLabel("Empresa", { exact: false }).fill("Empresa de prueba");
  await page.getByLabel("Correo corporativo").fill("correo-invalido");
  await page
    .getByLabel("Cantidad aproximada de ejecutivos")
    .selectOption("11-50");
  await form
    .getByRole("button", { name: "Solicitar una demostración" })
    .click();
  await expect(
    page.getByText("Revisa el formato de tu correo.", { exact: false }),
  ).toBeVisible();
  await page.getByLabel("Correo corporativo").fill("elena@empresa.example");
  const writes: string[] = [];
  page.on("request", (request) => {
    if (request.method() !== "GET" && request.method() !== "HEAD")
      writes.push(request.url());
  });
  await form
    .getByRole("button", { name: "Solicitar una demostración" })
    .click();
  await expect(
    page.getByText("¡Todo listo para el siguiente paso!"),
  ).toBeFocused();
  await expect(
    page.getByText(
      "No se enviaron datos a un servidor ni se agendó una demostración.",
      { exact: false },
    ),
  ).toBeVisible();
  expect(writes).toEqual([]);
  await page.getByRole("button", { name: "Volver al formulario" }).click();
  await expect(page.getByLabel("Correo corporativo")).toHaveValue(
    "elena@empresa.example",
  );
});

test("estructura y contraste accesibles en vista inicial", async ({ page }) => {
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "reduce" });
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    results.violations.map(({ id, nodes }) => ({
      id,
      elements: nodes.map(({ target, failureSummary }) => ({
        target,
        failureSummary,
      })),
    })),
  ).toEqual([]);
});
