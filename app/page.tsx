import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  Database,
  FileCheck2,
  Fingerprint,
  GitBranch,
  Headphones,
  History,
  Inbox,
  Instagram,
  Layers3,
  LifeBuoy,
  LockKeyhole,
  Mail,
  MessageCircle,
  MessageSquare,
  MessagesSquare,
  Network,
  Phone,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  TicketCheck,
  Users,
  Workflow,
} from "lucide-react";
import { Header } from "@/components/header";
import { BrandMark } from "@/components/brand-mark";
import { InboxVisual, KnowledgeVisual } from "@/components/feature-visuals";
import { ProductDemo } from "@/components/product-demo";
import { DemoForm } from "@/components/demo-form";
import { brand } from "@/lib/brand";

const problems = [
  {
    icon: MessagesSquare,
    number: "01",
    title: "Conversaciones por todas partes.",
    text: "Pestañas, aplicaciones y mensajes que se pierden entre canales.",
    solution: "Una bandeja que reúne cada conversación.",
  },
  {
    icon: Search,
    number: "02",
    title: "La respuesta existe. Encontrarla cuesta.",
    text: "Manuales dispersos y versiones que generan más dudas que certezas.",
    solution: "Conocimiento aprobado, en el momento preciso.",
  },
  {
    icon: Route,
    number: "03",
    title: "Volver a explicar. Volver a empezar.",
    text: "Transferencias que dejan atrás el historial y la paciencia de tu cliente.",
    solution: "Escalamientos con el contexto completo.",
  },
];
const benefits = [
  {
    icon: Clock3,
    title: "Menos búsquedas. Más soluciones.",
    text: "El conocimiento relevante junto a la conversación, sin saltar entre herramientas.",
  },
  {
    icon: FileCheck2,
    title: "Un criterio compartido.",
    text: "Respuestas consistentes, apoyadas en las políticas que tu empresa aprueba.",
  },
  {
    icon: Network,
    title: "Una conversación que continúa.",
    text: "Conserva el hilo aunque cambie el canal o la persona que atiende.",
  },
  {
    icon: Users,
    title: "Equipos que aprenden acompañados.",
    text: "Guía a nuevos ejecutivos con procedimientos claros y conocimiento accesible.",
  },
  {
    icon: GitBranch,
    title: "Cada caso en las manos correctas.",
    text: "Facilita la resolución y deriva cuando hace falta criterio o autorización.",
  },
  {
    icon: History,
    title: "Contexto que deja huella.",
    text: "Conoce qué se consultó, qué fuente se utilizó y cómo avanzó cada caso.",
  },
];
const steps = [
  {
    icon: Inbox,
    title: "Recibe",
    text: "Tu cliente escribe por cualquier canal habilitado.",
  },
  {
    icon: Layers3,
    title: "Comprende",
    text: "El historial y el contexto se reúnen en un solo lugar.",
  },
  {
    icon: Sparkles,
    title: "Asiste",
    text: "El copiloto propone una respuesta con respaldo documental.",
  },
  {
    icon: Check,
    title: "Resuelve",
    text: "Tu equipo responde o escala sin perder información.",
  },
];
const integrations = [
  {
    icon: MessagesSquare,
    title: "Canales",
    examples: "WhatsApp · Instagram · Email",
    tone: "green",
  },
  {
    icon: Users,
    title: "Sistemas CRM",
    examples: "HubSpot · Salesforce",
    tone: "orange",
  },
  {
    icon: BookOpen,
    title: "Conocimiento",
    examples: "Notion · Confluence",
    tone: "violet",
  },
  {
    icon: Workflow,
    title: "Herramientas",
    examples: "Slack · Microsoft Teams",
    tone: "blue",
  },
  {
    icon: TicketCheck,
    title: "Tickets",
    examples: "Jira · Zendesk",
    tone: "pink",
  },
];
const faqs = [
  {
    question: `¿Qué es ${brand.name}?`,
    answer: `${brand.name} es el concepto de una plataforma que combina una bandeja de atención omnicanal y un copiloto de IA conectado al conocimiento corporativo. Este sitio presenta un prototipo interactivo; todavía no es un servicio productivo.`,
  },
  {
    question: "¿La inteligencia artificial reemplaza a mis ejecutivos?",
    answer:
      "La propuesta es acompañar al equipo humano: encontrar información, sugerir respuestas y ayudar a decidir el siguiente paso. El ejecutivo revisa y adapta la respuesta. La automatización de casos simples forma parte de la visión, manteniendo la posibilidad de escalar a una persona.",
  },
  {
    question: "¿De dónde obtiene las respuestas el copiloto?",
    answer:
      "En el producto proyectado, de las fuentes internas que tu empresa autorice: manuales, políticas, procedimientos y bases de conocimiento. Las respuestas deben citar el documento y su versión, y reconocer cuando la evidencia es insuficiente. En esta demo, los documentos y las respuestas son ficticios y predefinidos.",
  },
  {
    question: "¿Qué canales e integraciones están disponibles?",
    answer:
      "La visión contempla WhatsApp, Instagram, Messenger, correo, webchat, SMS y llamadas, junto a CRM y herramientas corporativas. Las referencias de esta página son ejemplos de integraciones posibles, no conexiones implementadas ni certificadas. El alcance real deberá definirse con cada empresa.",
  },
  {
    question: "¿Puedo probar la plataforma o solicitar una demo?",
    answer:
      "Puedes explorar los tres escenarios de la demo interactiva sin cuenta ni credenciales. El formulario final permite probar la experiencia de solicitud: valida los datos y confirma el envío simulado, sin transmitir información. La agenda comercial y el contacto real están pendientes de habilitar.",
  },
];

export default function Home() {
  return (
    <>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <section id="inicio" className="hero">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-content container">
            <a className="hero-eyebrow" href="#demo">
              <span className="eyebrow-spark">
                <Sparkles size={13} />
              </span>{" "}
              Atención omnicanal + Copiloto empresarial con IA{" "}
              <ArrowUpRight size={13} />
            </a>
            <h1>
              Todos tus canales.
              <br className="mobile-break" /> Todo tu conocimiento.
              <br />
              <span>Una mejor atención.</span>
            </h1>
            <p className="hero-description">
              Unifica las conversaciones de tus clientes y potencia a tus
              ejecutivos con inteligencia artificial conectada al conocimiento
              de tu empresa. Respuestas confiables, atención más ágil y
              escalamiento humano sin perder el contexto.
            </p>
            <div className="hero-actions">
              <a href="#solicitar-demo" className="button button-primary">
                Solicitar una demo <ArrowUpRight size={17} />
              </a>
              <a href="#demo" className="button button-secondary">
                Explorar la plataforma <ArrowRight size={17} />
              </a>
            </div>
            <div className="hero-note">
              <span className="status-dot" /> Inteligencia artificial. Criterio
              humano.
            </div>
          </div>
          <div className="hero-product container">
            <div className="product-caption">
              <span>
                <span className="caption-line" /> ASÍ SE VE UNA ATENCIÓN CON
                CONTEXTO
              </span>
              <span className="concept-badge">
                <span /> Demo conceptual
              </span>
            </div>
            <ProductDemo compact />
            <div className="product-under">
              <span>
                <MessagesSquare size={14} /> Conversaciones conectadas
              </span>
              <span>
                <BookOpen size={14} /> Conocimiento con respaldo
              </span>
              <span>
                <Users size={14} /> Personas al centro
              </span>
            </div>
          </div>
        </section>

        <section className="channels-section" aria-label="Canales contemplados">
          <div className="container">
            <p>EL CANAL CAMBIA. LA EXPERIENCIA CONTINÚA.</p>
            <div className="channel-list">
              <span>
                <MessageCircle /> WhatsApp
              </span>
              <span>
                <Instagram /> Instagram
              </span>
              <span>
                <MessageSquare /> Messenger
              </span>
              <span>
                <Mail /> Email
              </span>
              <span>
                <MessagesSquare /> Webchat
              </span>
              <span>
                <Phone /> Llamadas
              </span>
              <span>
                <MessageSquare /> SMS
              </span>
            </div>
            <span className="section-disclaimer">
              Canales contemplados en la visión del producto. Conexiones
              simuladas en este prototipo.
            </span>
          </div>
        </section>

        <section className="section section-problem">
          <div className="container">
            <div className="section-heading centered">
              <span className="overline">
                MENOS FRAGMENTACIÓN. MÁS CONTEXTO.
              </span>
              <h2>
                Tus clientes esperan respuestas.
                <br />
                <span className="muted-heading">
                  Tus ejecutivos necesitan contexto.
                </span>
              </h2>
              <p>
                Atender bien no debería significar abrir diez pestañas
                <br className="desktop-break" /> para encontrar una sola
                respuesta.
              </p>
            </div>
            <div className="problem-grid">
              {problems.map(({ icon: Icon, number, title, text, solution }) => (
                <article className="problem-card" key={number}>
                  <div className="problem-top">
                    <span className="soft-icon">
                      <Icon size={23} />
                    </span>
                    <span className="card-number">{number}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <div className="problem-solution">
                    <ArrowDownRight size={17} />
                    <span>{solution}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="plataforma" className="section capabilities-section">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <span className="overline">CONECTADOS, RESOLVEMOS MEJOR</span>
                <h2>
                  Dos capacidades.
                  <br />
                  Una experiencia.
                </h2>
              </div>
              <p>
                La conversación y el conocimiento se encuentran en el mismo
                lugar. Tu equipo pone lo más importante: el criterio humano.
              </p>
            </div>
            <div className="feature-row">
              <div className="feature-copy">
                <span className="feature-label">
                  <Inbox size={16} /> WORKSPACE OMNICANAL
                </span>
                <h3>
                  Una sola bandeja.
                  <br />
                  Cada conversación
                  <br />
                  en su lugar.
                </h3>
                <p>
                  Del primer mensaje a la resolución, mantén a tu equipo
                  coordinado y a cada cliente en contexto.
                </p>
                <ul className="feature-list">
                  <li>
                    <Check /> Todos los canales, un mismo workspace
                  </li>
                  <li>
                    <Check /> Asignación y transferencias entre equipos
                  </li>
                  <li>
                    <Check /> Historial unificado y seguimiento de tickets
                  </li>
                </ul>
                <a className="text-link" href="#demo">
                  Conoce el workspace <ArrowRight size={16} />
                </a>
              </div>
              <InboxVisual />
            </div>
            <div id="copiloto" className="feature-row feature-row-reversed">
              <KnowledgeVisual />
              <div className="feature-copy">
                <span className="feature-label">
                  <Sparkles size={16} /> COPILOTO EMPRESARIAL
                </span>
                <h3>
                  Tu conocimiento.
                  <br />
                  En el momento
                  <br />
                  que importa.
                </h3>
                <p>
                  El conocimiento de tu empresa, justo cuando tu equipo lo
                  necesita. Respuestas basadas en documentos, con fuentes
                  visibles y límites claros.
                </p>
                <ul className="feature-list">
                  <li>
                    <Check /> Búsqueda contextual y procedimientos guiados
                  </li>
                  <li>
                    <Check /> Fuentes aprobadas y control de versiones
                  </li>
                  <li>
                    <Check /> Excepciones visibles. Decisiones humanas.
                  </li>
                </ul>
                <a className="text-link" href="#demo">
                  Prueba el copiloto <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="section workflow-section">
          <div className="container">
            <div className="section-heading centered">
              <span className="overline">DEL MENSAJE A LA SOLUCIÓN</span>
              <h2>
                Un flujo más simple.
                <br />
                Una atención más humana.
              </h2>
              <p>
                Cada paso conectado. Cada persona con el contexto que necesita.
              </p>
            </div>
            <div className="steps-grid">
              {steps.map(({ icon: Icon, title, text }, index) => (
                <article className="step-card" key={title}>
                  <div className="step-track">
                    <span className="step-icon">
                      <Icon size={25} />
                    </span>
                    {index < 3 && (
                      <span className="step-connector" aria-hidden="true">
                        <ArrowRight size={16} />
                      </span>
                    )}
                  </div>
                  <span className="step-number">0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="demo" className="section interactive-section">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <span className="overline">
                  <span className="status-dot" /> PRUÉBALO, SIN REGISTRO
                </span>
                <h2>
                  El siguiente paso es
                  <br />
                  <span className="accent-text">verlo en acción.</span>
                </h2>
              </div>
              <p>
                Elige un caso, consulta al copiloto y descubre cómo una
                respuesta con contexto cambia la conversación.
              </p>
            </div>
            <div className="demo-guide">
              <span>
                <span>1</span> Elige una conversación
              </span>
              <ArrowRight size={14} />
              <span>
                <span>2</span> Consulta al copiloto
              </span>
              <ArrowRight size={14} />
              <span>
                <span>3</span> Responde o deriva
              </span>
            </div>
            <ProductDemo />
            <p className="demo-disclaimer">
              <CircleHelp size={14} /> Demo conceptual con datos ficticios. Las
              respuestas, documentos, mensajes y derivaciones se simulan
              localmente.
            </p>
          </div>
        </section>

        <section className="section benefits-section">
          <div className="container">
            <div className="section-heading centered">
              <span className="overline">DISEÑADO PARA TU EQUIPO</span>
              <h2>
                Menos fricción operativa.
                <br />
                Más capacidad para resolver.
              </h2>
              <p>
                Herramientas que acompañan a las personas, para una mejor
                atención.
              </p>
            </div>
            <div className="benefits-grid">
              {benefits.map(({ icon: Icon, title, text }) => (
                <article className="benefit-card" key={title}>
                  <span className="benefit-icon">
                    <Icon size={22} />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="integraciones" className="section integrations-section">
          <div className="container">
            <div className="section-heading centered">
              <span className="overline">CONECTA LO QUE YA CONOCES</span>
              <h2>
                Tu ecosistema.
                <br />
                Mejor conectado.
              </h2>
              <p>
                Una visión abierta a tus canales, herramientas y conocimiento.
              </p>
            </div>
            <div className="integration-hub">
              <span className="hub-line" />
              <BrandMark compact />
              <span className="hub-line" />
            </div>
            <div className="integrations-grid">
              {integrations.map(({ icon: Icon, title, examples, tone }) => (
                <article className="integration-card" key={title}>
                  <span className={`integration-icon ${tone}`}>
                    <Icon size={25} />
                  </span>
                  <h3>{title}</h3>
                  <p>{examples}</p>
                  <span className="planned-pill">Integración potencial</span>
                </article>
              ))}
            </div>
            <p className="integration-note">
              Proveedores citados solo como ejemplos. Este prototipo no incluye
              integraciones activas, certificaciones ni alianzas comerciales.
            </p>
          </div>
        </section>

        <section id="seguridad" className="section security-section">
          <div className="container">
            <div className="security-panel">
              <div className="security-art" aria-hidden="true">
                <div className="security-orbit orbit-one" />
                <div className="security-orbit orbit-two" />
                <div className="security-orbit orbit-three" />
                <span className="security-lock">
                  <ShieldCheck size={53} strokeWidth={1.3} />
                </span>
                <span className="security-floating floating-one">
                  <Fingerprint size={21} />
                </span>
                <span className="security-floating floating-two">
                  <LockKeyhole size={19} />
                </span>
                <span className="security-floating floating-three">
                  <Database size={18} />
                </span>
              </div>
              <div className="security-copy">
                <span className="overline">LA CONFIANZA SE DISEÑA</span>
                <h2>
                  Tu conocimiento.
                  <br />
                  Bajo tu control.
                </h2>
                <p>
                  La visión del producto pone la seguridad, la trazabilidad y la
                  supervisión humana en el centro de cada decisión.
                </p>
                <div className="security-checks">
                  {[
                    "Acceso por roles",
                    "Fuentes autorizadas",
                    "Trazabilidad de consultas",
                    "Historial de cambios",
                    "Protección de información",
                    "Supervisión humana",
                  ].map((item) => (
                    <span key={item}>
                      <Check size={15} />
                      {item}
                    </span>
                  ))}
                </div>
                <p className="security-note">
                  <ShieldCheck size={15} /> Capacidades proyectadas. No
                  representan controles implementados ni certificaciones de este
                  prototipo.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="preguntas" className="section faq-section">
          <div className="container faq-layout">
            <div className="section-heading">
              <span className="overline">HABLEMOS CON CLARIDAD</span>
              <h2>
                Buenas preguntas.
                <br />
                Respuestas claras.
              </h2>
              <p>
                Lo que necesitas saber
                <br />
                antes de dar el siguiente paso.
              </p>
              <span className="faq-illustration" aria-hidden="true">
                <MessageCircle size={36} strokeWidth={1.3} />
                <Sparkles size={22} />
              </span>
            </div>
            <div className="faq-list">
              {faqs.map(({ question, answer }) => (
                <details className="faq-item" key={question}>
                  <summary>
                    {question}
                    <ChevronDown size={18} />
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="solicitar-demo" className="cta-section">
          <div className="container cta-layout">
            <div className="cta-copy">
              <span className="overline">
                <span className="status-dot" /> TU EQUIPO, POTENCIADO
              </span>
              <h2>
                Transforma la
                <br />
                manera en que
                <br />
                tu equipo <span>atiende.</span>
              </h2>
              <p>
                Conecta tus canales, organiza tu conocimiento y entrega a cada
                ejecutivo las herramientas para resolver mejor.
              </p>
              <div className="cta-proof">
                <span>
                  <MessagesSquare size={17} /> Todos tus canales
                </span>
                <span>
                  <Sparkles size={17} /> Tu conocimiento, conectado
                </span>
                <span>
                  <Headphones size={17} /> Tu equipo, al centro
                </span>
              </div>
              <span className="cta-bottom-note">
                <LifeBuoy size={16} /> Construyamos una atención con más
                contexto.
              </span>
            </div>
            <DemoForm />
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <a href="#inicio" aria-label="Volver al inicio">
                <BrandMark />
              </a>
              <p>
                Inteligencia artificial.
                <br />
                Atención humana.
              </p>
              <span className="company-note">
                Una propuesta de {brand.company}
              </span>
            </div>
            <nav aria-label="Navegación del pie">
              <span>PLATAFORMA</span>
              <a href="#plataforma">Workspace omnicanal</a>
              <a href="#copiloto">Copiloto empresarial</a>
              <a href="#como-funciona">Cómo funciona</a>
            </nav>
            <nav aria-label="Explorar">
              <span>EXPLORA</span>
              <a href="#demo">Demo interactiva</a>
              <a href="#integraciones">Integraciones</a>
              <a href="#preguntas">Preguntas frecuentes</a>
            </nav>
            <div className="footer-contact">
              <span>CONVERSEMOS</span>
              <a href="#solicitar-demo">
                Solicitar una demostración <ArrowUpRight size={14} />
              </a>
              <span className="placeholder-email">{brand.contactEmail}</span>
              <small>{brand.contactLabel}</small>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} {brand.name}. Prototipo conceptual.
            </span>
            <span>
              Diseñado para conectar. Creado para ayudar.
              <span className="footer-spark">
                <Sparkles size={13} />
              </span>
            </span>
            <a href="#inicio">
              Volver arriba <ArrowDown className="arrow-up" size={13} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
