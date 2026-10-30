export type Channel = "WhatsApp" | "Instagram" | "Email" | "Webchat";

export interface DemoConversation {
  id: string;
  name: string;
  initials: string;
  color: string;
  channel: Channel;
  preview: string;
  status: string;
  assigned: string;
  subject: string;
  time: string;
  messages: { role: "customer" | "agent"; text: string; time: string }[];
  answer: string;
  source: string;
  version: string;
  section: string;
  sourceText: string;
  exception: string;
  nextStep: string;
  summary: string;
  requiresApproval?: boolean;
}

export const demoConversations: DemoConversation[] = [
  {
    id: "sofia",
    name: "Sofía Martínez",
    initials: "SM",
    color: "lavender",
    channel: "WhatsApp",
    preview: "¿Puedo cambiar mi producto?",
    status: "En atención",
    assigned: "Ana",
    subject: "Cambio de producto",
    time: "Ahora",
    messages: [
      {
        role: "customer",
        text: "¡Hola! Compré un producto hace 20 días. ¿Todavía puedo solicitar un cambio?",
        time: "10:42",
      },
      {
        role: "agent",
        text: "Hola, Sofía. Voy a revisar las condiciones que aplican a tu compra. Un momento, por favor.",
        time: "10:43",
      },
      {
        role: "customer",
        text: "Claro. Es de categoría A y tengo la boleta 😊",
        time: "10:43",
      },
    ],
    answer:
      "Sí, Sofía. Los productos de categoría A permiten cambios hasta 30 días después de la compra, siempre que estén sin uso, con su empaque original y comprobante de compra. Podemos revisar juntos tu solicitud.",
    source: "Política de cambios",
    version: "3.2",
    section: "Sección 4.1",
    sourceText:
      "Los productos de categoría A admiten cambios dentro de los 30 días corridos posteriores a la compra. Se requiere comprobante, producto sin uso y empaque original. Los productos personalizados o de liquidación requieren revisión por un supervisor; el ejecutivo no debe confirmar su elegibilidad sin esa autorización.",
    exception:
      "Los productos personalizados o de liquidación necesitan revisión adicional.",
    nextStep:
      "Verificar la boleta y el estado del producto antes de confirmar el cambio.",
    summary:
      "Sofía solicita cambiar un producto de categoría A comprado hace 20 días. Cuenta con boleta. La política 3.2 permite cambios hasta 30 días; queda por verificar su estado, empaque y posibles excepciones.",
  },
  {
    id: "matias",
    name: "Matías Rojas",
    initials: "MR",
    color: "peach",
    channel: "Email",
    preview: "Necesito una copia de mi factura",
    status: "Pendiente",
    assigned: "Ana",
    subject: "Copia de factura",
    time: "2 min",
    messages: [
      {
        role: "customer",
        text: "Buenos días. No encuentro la factura de mi compra de la semana pasada. ¿Me pueden enviar una copia?",
        time: "10:38",
      },
      {
        role: "agent",
        text: "Hola, Matías. Te ayudo a revisar el procedimiento para obtener tu documento.",
        time: "10:39",
      },
    ],
    answer:
      "Hola, Matías. Podemos ayudarte a obtener una copia de tu factura. Primero debemos validar el número de pedido y los datos del titular. Una vez verificados, enviaremos el documento al correo registrado en la compra.",
    source: "Procedimiento de facturación",
    version: "2.1",
    section: "Sección 2.3",
    sourceText:
      "Antes de emitir una copia de factura, validar el número de pedido y la identidad del titular con los datos registrados. Las copias deben enviarse exclusivamente al correo asociado a la compra. Las solicitudes de modificación de datos tributarios deben derivarse al equipo de Finanzas.",
    exception:
      "Una modificación de datos tributarios debe ser revisada por Finanzas.",
    nextStep: "Solicitar el número de pedido y validar los datos del titular.",
    summary:
      "Matías solicita una copia de la factura de una compra reciente. Procedimiento de facturación 2.1, sección 2.3. Pendiente validar pedido e identidad; enviar solo al correo registrado. No hay solicitud de modificación tributaria.",
  },
  {
    id: "camila",
    name: "Camila Torres",
    initials: "CT",
    color: "mint",
    channel: "Instagram",
    preview: "Mi devolución está fuera de plazo",
    status: "Revisión",
    assigned: "Ana",
    subject: "Solicitud excepcional",
    time: "5 min",
    messages: [
      {
        role: "customer",
        text: "Hola. Necesito devolver una compra de hace 45 días. Tuve un problema de salud y no pude venir antes.",
        time: "10:32",
      },
      {
        role: "agent",
        text: "Gracias por contármelo, Camila. Voy a revisar qué alternativas podemos ofrecerte.",
        time: "10:33",
      },
    ],
    answer:
      "Camila, gracias por explicarnos tu situación. Tu solicitud está fuera del plazo habitual y necesita una evaluación especial. Voy a derivarla a un supervisor con el contexto que ya nos compartiste para que revise las opciones disponibles.",
    source: "Protocolo de excepciones",
    version: "1.4",
    section: "Sección 3.2",
    sourceText:
      "Las solicitudes fuera del plazo comercial requieren autorización expresa de un supervisor. El ejecutivo debe registrar el motivo, la fecha de compra y el contexto informado por el cliente. Este documento no garantiza la aprobación de una devolución ni autoriza al ejecutivo a prometer un resultado.",
    exception:
      "No hay evidencia suficiente para aprobar la devolución. Requiere autorización humana.",
    nextStep:
      "Derivar a un supervisor conservando el contexto y sin prometer la aprobación.",
    summary:
      "Camila solicita devolver una compra realizada hace 45 días por una situación de salud. Fuera del plazo habitual. Protocolo de excepciones 1.4, sección 3.2: requiere autorización de supervisor. No se ha prometido aprobación. Pendiente revisar comprobante y alternativas.",
    requiresApproval: true,
  },
  {
    id: "diego",
    name: "Diego Fernández",
    initials: "DF",
    color: "sky",
    channel: "Webchat",
    preview: "Tengo una consulta sobre un cambio",
    status: "Nuevo",
    assigned: "Ana",
    subject: "Condiciones de cambio",
    time: "8 min",
    messages: [
      {
        role: "customer",
        text: "Hola, quiero cambiar un producto de categoría A que compré hace 12 días. Conserva su caja y está sin uso.",
        time: "10:28",
      },
      {
        role: "agent",
        text: "Hola, Diego. Revisemos las condiciones y el siguiente paso para tu solicitud.",
        time: "10:29",
      },
    ],
    answer:
      "Hola, Diego. Para productos de categoría A, el plazo de cambio es de 30 días desde la compra, sujeto a revisión. Por favor, ten a mano tu comprobante. Verificaremos que el producto esté sin uso, con su empaque original y que no corresponda a una excepción.",
    source: "Política de cambios",
    version: "3.2",
    section: "Sección 4.1",
    sourceText:
      "Los productos de categoría A admiten cambios dentro de los 30 días corridos posteriores a la compra. Se requiere comprobante, producto sin uso y empaque original. Los productos personalizados o de liquidación requieren revisión por un supervisor.",
    exception:
      "Los productos personalizados o de liquidación necesitan revisión adicional.",
    nextStep:
      "Solicitar el comprobante de compra y confirmar la categoría del producto.",
    summary:
      "Diego consulta por un cambio de categoría A a los 12 días. Declara que el producto está sin uso y conserva su caja. Política 3.2: pendiente verificar comprobante, categoría y excepciones antes de confirmar elegibilidad.",
  },
];
