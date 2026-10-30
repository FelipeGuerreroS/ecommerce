# Nexo CX · prototipo comercial de Beriuer

Landing page de alta fidelidad para una plataforma de atención omnicanal con un copiloto empresarial de inteligencia artificial. La propuesta reúne las conversaciones y el conocimiento corporativo en el espacio de trabajo del ejecutivo, con supervisión humana y referencias documentales.

El proyecto es un prototipo de frontend: puede explorarse sin cuentas, claves, servicios externos ni backend.

## Requisitos

- Node.js **20.9 o superior**; se recomienda Node.js 24 LTS.
- npm; las versiones concretas de las dependencias están fijadas en `package-lock.json`.

## Ejecutar en desarrollo

Desde la raíz del repositorio:

```bash
npm ci
npm run dev
```

Next.js inicia el servidor en el puerto 3000. Abre `http://localhost:3000` en tu navegador. El script escucha en `0.0.0.0`, por lo que también admite acceso desde un entorno de desarrollo remoto que exponga ese puerto.

## Comprobaciones y compilación

```bash
npm run lint
npm run typecheck
npm run build
```

Para ejecutar la versión compilada:

```bash
npm run build
npm start
```

`lint` revisa el código con ESLint, `typecheck` comprueba TypeScript y `build` genera la aplicación de producción. No hay un backend que configurar ni variables de entorno obligatorias.

### Pruebas de navegador

```bash
npx playwright install chromium
npm run build
npm run test:e2e
```

Si el sistema ya dispone de `/usr/bin/chromium`, se utiliza automáticamente y puedes omitir su descarga. También puedes indicar otro ejecutable mediante `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. Playwright inicia la versión compilada o reutiliza el servidor existente del puerto 3000.

La suite contiene **14 pruebas entre escritorio y móvil**: los tres escenarios del copiloto, referencias, portapapeles, edición y envío local, persistencia de borradores, derivación, búsqueda, navegación, movimiento reducido, formulario sin transmisión de datos y revisión automática con axe. Las revisiones automáticas no sustituyen una auditoría completa de accesibilidad.

## Qué incluye

- Landing en español con navegación móvil, hero, mockup del producto, problemas, capacidades, flujo de atención, beneficios, integraciones potenciales, seguridad proyectada, preguntas frecuentes y formulario.
- Mockup construido con React y CSS, con bandeja omnicanal, conversación y copiloto. El hero presenta una respuesta preparada para ilustrar la propuesta; la sección de demostración permite explorarla paso a paso.
- Cuatro conversaciones ficticias en WhatsApp, Instagram, Email y Webchat que cubren cambios de producto, facturación y solicitudes excepcionales.
- Filtros de canal, selección de conversaciones, consulta simulada al copiloto, referencias y versiones documentales, advertencias de excepciones y próximos pasos.
- Acciones para copiar una sugerencia, consultar su fuente, insertarla en el borrador, enviar un mensaje local y simular una derivación con resumen del caso.
- Formulario con validación, mensajes de error accesibles y confirmación de envío simulado.
- Diseño adaptable, navegación por teclado, foco visible, respeto de movimiento reducido y metadata SEO básica.

### Recorrido sugerido de la demo

1. Ve a la sección **Demo interactiva** y selecciona a Sofía: revisa el caso de cambio de producto.
2. Pulsa **Consultar copiloto** y abre la fuente documental. Comprueba la versión, las condiciones y las excepciones.
3. Inserta la sugerencia en la conversación; puedes editar el borrador antes de enviarlo localmente.
4. Cambia al canal Email y revisa la consulta de facturación de Matías.
5. Selecciona a Camila en Instagram: el caso fuera de plazo necesita autorización de un supervisor. Prueba la derivación y su resumen.
6. Prueba el formulario final: primero envíalo vacío para ver la validación y luego completa los campos obligatorios.

Las respuestas y los documentos son ficticios y predefinidos. La consulta no utiliza un modelo de IA. Los mensajes y las derivaciones no llegan a clientes ni supervisores reales.

## Estructura

```text
app/
  layout.tsx              # Idioma, fuente local y metadata
  page.tsx                # Secciones de la landing
  globals.css             # Sistema visual y diseño adaptable
  icon.svg                # Marca provisional
components/
  brand-mark.tsx          # Símbolo y nombre del producto
  header.tsx              # Navegación de escritorio y móvil
  feature-visuals.tsx     # Visualizaciones de las dos capacidades
  channel-icon.tsx        # Iconos de canales
  product-demo.tsx        # Demo con estado local
  product-demo.css        # Estilos del workspace
  demo-form.tsx           # Validación y confirmación del formulario
  demo-form.css           # Estilos del formulario
lib/
  brand.ts               # Nombre, empresa y contacto provisional
  demo-data.ts           # Escenarios, respuestas y documentos ficticios
tests/
  demo.spec.ts            # Recorridos del workspace
  landing.spec.ts         # Navegación, formulario y accesibilidad
```

Tecnologías: Next.js con App Router, React, TypeScript, Tailwind CSS, CSS de componentes y Lucide React. Manrope se sirve desde los archivos de la dependencia instalada, sin requerir solicitudes a Google Fonts al abrir la página.

## Personalizar la marca y el contenido

La identidad está centralizada en **`lib/brand.ts`**: cambia `name`, `company`, la descripción y el contacto allí. El nombre provisional es **Nexo CX**, asociado a **Beriuer**. El correo `hola@example.com` es un placeholder y debe reemplazarse antes de cualquier publicación comercial.

No se encontró un PNG del logo entre los archivos disponibles. Se utiliza un símbolo original provisional en `components/brand-mark.tsx` y `app/icon.svg`; pueden sustituirse cuando esté disponible el logo definitivo.

Los casos y las fuentes de la demo están en `lib/demo-data.ts`. Los textos de las secciones están en `app/page.tsx`.

## Alcance y límites

El formulario no transmite ni guarda datos en un servidor y no agenda reuniones. Los estados de la demo viven en memoria dentro de la página y se pierden al recargarla. No se implementan autenticación, CRM, integraciones con redes sociales, llamadas, envío de correos, persistencia, procesamiento de IA ni servicios productivos.

Los proveedores se presentan únicamente como ejemplos de posibles integraciones; no representan conexiones activas, certificaciones ni alianzas. La sección de seguridad comunica capacidades contempladas para el producto futuro, no controles certificados o implementados en este prototipo. Los nombres de clientes, documentos y conversaciones son ficticios. No se presentan métricas, resultados comerciales ni testimonios reales.
