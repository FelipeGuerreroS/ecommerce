import { expect, test, type Locator, type Page } from "@playwright/test";

async function showPane(
  page: Page,
  demo: Locator,
  name: "Bandeja" | "Conversación" | "Copiloto IA",
) {
  if ((page.viewportSize()?.width ?? 1440) <= 700) {
    await demo
      .locator(".pd-mobile-tabs")
      .getByRole("button", { name, exact: true })
      .click();
  }
}

async function chooseConversation(
  page: Page,
  demo: Locator,
  channel: string,
  customer: string,
) {
  await showPane(page, demo, "Bandeja");
  await demo
    .getByRole("combobox", { name: "Filtrar por canal" })
    .selectOption(channel);
  await demo.getByRole("button", { name: new RegExp(customer) }).click();
  await expect(
    demo.locator(".pd-chat").getByRole("heading", { name: customer }),
  ).toBeVisible();
}

async function consult(demo: Locator) {
  await demo
    .locator(".pd-chat-actions")
    .getByRole("button", { name: "Consultar copiloto" })
    .click();
  await expect(
    demo.getByRole("button", { name: "Insertar respuesta", exact: true }),
  ).toBeVisible();
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.locator(".pd-full").scrollIntoViewIfNeeded();
});

test("consulta cambios, abre la fuente con teclado e inserta y envía una respuesta local", async ({
  page,
}) => {
  const demo = page.locator(".pd-full");
  await chooseConversation(page, demo, "WhatsApp", "Sofía Martínez");
  await consult(demo);

  const source = demo.getByRole("button", { name: /Ver fuente documental/ });
  await expect(demo.locator(".pd-answer")).toContainText("30 días");
  await source.click();
  const dialog = demo.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("heading", { name: "Política de cambios" }),
  ).toBeVisible();
  await expect(dialog).toContainText("Versión 3.2");
  await expect(dialog).toContainText(
    "Este documento y sus condiciones son ficticios",
  );
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(source).toBeFocused();

  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  await demo
    .getByRole("button", { name: "Copiar respuesta", exact: true })
    .click();
  await expect(demo.getByRole("status")).toContainText(
    "Respuesta copiada al portapapeles",
  );
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toMatch(/30 días/);

  await demo
    .getByRole("button", { name: "Insertar respuesta", exact: true })
    .click();
  const draft = demo.getByRole("textbox", {
    name: "Respuesta para Sofía Martínez",
  });
  await expect(draft).toHaveValue(
    /Los productos de categoría A permiten cambios hasta 30 días/,
  );
  await expect(draft).toBeFocused();
  await draft.fill("Sofía, revisemos tu boleta para continuar con el cambio.");
  await demo.getByRole("button", { name: "Enviar mensaje simulado" }).click();
  await expect(draft).toHaveValue("");
  await expect(demo.getByRole("log")).toContainText(
    "Sofía, revisemos tu boleta para continuar con el cambio.",
  );
  await expect(demo.getByRole("status")).toContainText(
    "Mensaje enviado solo en esta simulación",
  );
});

test("facturación conserva un borrador al cambiar de conversación", async ({
  page,
}) => {
  const demo = page.locator(".pd-full");
  await chooseConversation(page, demo, "Email", "Matías Rojas");
  await consult(demo);
  await expect(demo.locator(".pd-answer")).toContainText("correo registrado");
  await expect(demo.locator(".pd-source")).toContainText(
    "Procedimiento de facturación",
  );
  await expect(demo.locator(".pd-exception")).toContainText("Finanzas");
  await demo
    .getByRole("button", { name: "Insertar respuesta", exact: true })
    .click();
  const draft = demo.getByRole("textbox", {
    name: "Respuesta para Matías Rojas",
  });
  await draft.fill("Matías, por favor comparte tu número de pedido.");

  await chooseConversation(page, demo, "Instagram", "Camila Torres");
  await expect(
    demo.getByRole("textbox", { name: "Respuesta para Camila Torres" }),
  ).toHaveValue("");
  await chooseConversation(page, demo, "Email", "Matías Rojas");
  await expect(
    demo.getByRole("textbox", { name: "Respuesta para Matías Rojas" }),
  ).toHaveValue("Matías, por favor comparte tu número de pedido.");
  await showPane(page, demo, "Copiloto IA");
  await expect(demo.locator(".pd-source")).toContainText(
    "Procedimiento de facturación",
  );
});

test("un caso excepcional requiere supervisión y deriva el resumen con su contexto", async ({
  page,
}) => {
  const demo = page.locator(".pd-full");
  await chooseConversation(page, demo, "Instagram", "Camila Torres");
  await consult(demo);
  await expect(demo.locator(".pd-exception")).toContainText(
    "No hay evidencia suficiente",
  );
  await expect(demo.locator(".pd-source")).toContainText(
    "Protocolo de excepciones",
  );
  await demo
    .getByRole("button", { name: "Derivar a supervisor con resumen" })
    .click();
  await expect(demo.locator(".pd-escalation")).toBeVisible();
  await expect(demo.locator(".pd-escalation")).toContainText("45 días");
  await expect(demo.locator(".pd-escalation")).toContainText(
    "No se ha prometido aprobación",
  );
  await expect(demo.locator(".pd-chat-header")).toContainText(
    "Derivada a supervisión",
  );
  await expect(demo.getByRole("status")).toContainText(
    "el supervisor recibe el resumen y el historial",
  );
  await expect(
    demo
      .locator(".pd-chat-actions")
      .getByRole("button", { name: "Derivado", exact: true }),
  ).toBeDisabled();
});

test("la búsqueda informa sin resultados y permite recuperar las conversaciones", async ({
  page,
}) => {
  const demo = page.locator(".pd-full");
  await showPane(page, demo, "Bandeja");
  const search = demo.getByRole("textbox", { name: "Buscar conversaciones" });
  await search.fill("cliente inexistente");
  await expect(
    demo.getByText("No hay conversaciones para esta búsqueda."),
  ).toBeVisible();
  await expect(demo.locator(".pd-inbox-card")).toHaveCount(0);
  await search.fill("Diego");
  await expect(demo.locator(".pd-inbox-card")).toHaveCount(1);
  await demo.getByRole("button", { name: /Diego Fernández/ }).click();
  await expect(
    demo.locator(".pd-chat").getByRole("heading", { name: "Diego Fernández" }),
  ).toBeVisible();
  await expect(demo.getByRole("log")).toContainText("12 días");
});
