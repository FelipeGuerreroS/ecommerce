"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCheck,
  ChevronDown,
  CircleHelp,
  Copy,
  FileText,
  Inbox,
  LoaderCircle,
  MoreHorizontal,
  PanelLeftClose,
  Plus,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  Users,
  X,
} from "lucide-react";
import { demoConversations, type Channel } from "@/lib/demo-data";
import { ChannelIcon } from "./channel-icon";
import "./product-demo.css";

type LocalCase = {
  consulted: boolean;
  draft: string;
  sent: string[];
  escalated: boolean;
};
type Pane = "inbox" | "conversation" | "copilot";

export function ProductDemo({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState("sofia");
  const [filter, setFilter] = useState<Channel | "Todos">("Todos");
  const [pane, setPane] = useState<Pane>("conversation");
  const [cases, setCases] = useState<Record<string, LocalCase>>(() =>
    Object.fromEntries(
      demoConversations.map((c) => [
        c.id,
        {
          consulted: compact && c.id === "sofia",
          draft: "",
          sent: [],
          escalated: false,
        },
      ]),
    ),
  );
  const [loading, setLoading] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [search, setSearch] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const sourceButtonRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const uid = useId();
  const conversation = demoConversations.find((c) => c.id === selected)!;
  const state = cases[selected];
  const visible = demoConversations.filter(
    (c) =>
      (filter === "Todos" || c.channel === filter) &&
      `${c.name} ${c.preview}`.toLowerCase().includes(search.toLowerCase()),
  );
  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  function updateCase(patch: Partial<LocalCase>, id = selected) {
    setCases((previous) => ({
      ...previous,
      [id]: { ...previous[id], ...patch },
    }));
  }
  function selectCase(id: string) {
    setSelected(id);
    setFeedback("");
    setPane("conversation");
  }
  function changeChannel(value: Channel | "Todos") {
    setFilter(value);
    setSearch("");
    if (value !== "Todos" && conversation.channel !== value) {
      const next = demoConversations.find((c) => c.channel === value);
      if (next) setSelected(next.id);
    }
    setFeedback("");
  }
  function consult() {
    if (loading) return;
    const caseId = selected;
    setLoading(caseId);
    setFeedback("");
    setPane("copilot");
    timerRef.current = setTimeout(() => {
      updateCase({ consulted: true }, caseId);
      setLoading(null);
    }, 850);
  }
  function insert() {
    updateCase({ draft: conversation.answer });
    setPane("conversation");
    setFeedback("Respuesta insertada. Puedes editarla antes de enviarla.");
    requestAnimationFrame(() => textareaRef.current?.focus());
  }
  async function copy() {
    let copied = false;
    try {
      await navigator.clipboard.writeText(conversation.answer);
      copied = true;
    } catch {
      const previousFocus = document.activeElement as HTMLElement | null;
      const fallback = document.createElement("textarea");
      fallback.value = conversation.answer;
      fallback.readOnly = true;
      fallback.style.position = "fixed";
      fallback.style.left = "-9999px";
      document.body.appendChild(fallback);
      fallback.select();
      try {
        copied = document.execCommand("copy");
      } catch {
        copied = false;
      }
      fallback.remove();
      previousFocus?.focus();
    }
    setFeedback(
      copied
        ? "Respuesta copiada al portapapeles."
        : "No se pudo acceder al portapapeles. Usa Insertar respuesta para seleccionarla y copiarla.",
    );
  }
  function send() {
    if (!state.draft.trim()) return;
    updateCase({ sent: [...state.sent, state.draft.trim()], draft: "" });
    setFeedback("Mensaje enviado solo en esta simulación.");
    requestAnimationFrame(() =>
      messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight }),
    );
  }
  function escalate() {
    updateCase({ escalated: true });
    setPane("conversation");
    setFeedback(
      "Derivación simulada: el supervisor recibe el resumen y el historial.",
    );
    requestAnimationFrame(() =>
      messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight }),
    );
  }

  return (
    <div className={`pd-shell ${compact ? "pd-compact" : "pd-full"}`}>
      <div className="pd-windowbar">
        <div className="pd-windowdots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <span className="pd-windowtitle">
          <ShieldCheck size={12} /> Tu workspace de atención
        </span>
        <span className="pd-demo-tag">
          <span /> Demo conceptual
        </span>
      </div>
      <div className="pd-mobile-tabs" aria-label="Panel de la demostración">
        {(
          [
            ["inbox", "Bandeja"],
            ["conversation", "Conversación"],
            ["copilot", "Copiloto IA"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            aria-pressed={pane === value}
            onClick={() => setPane(value)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="pd-workspace">
        <aside className="pd-rail" aria-label="Vista del workspace">
          <div className="pd-rail-brand" aria-hidden="true">
            <span />
            <span />
          </div>
          <div className="pd-rail-item pd-rail-item-active" title="Bandeja">
            <Inbox size={18} />
          </div>
          <div className="pd-rail-item" title="Equipo">
            <Users size={18} />
          </div>
          <div className="pd-rail-item" title="Conocimiento">
            <BookOpen size={18} />
          </div>
          <div className="pd-rail-divider" />
          <div className="pd-rail-item" title="Copiloto">
            <Sparkles size={18} />
          </div>
          <div className="pd-rail-bottom">
            <CircleHelp size={17} />
            <span className="pd-user-avatar">AL</span>
          </div>
        </aside>
        <section
          className={`pd-inbox pd-pane-${pane === "inbox" ? "visible" : "hidden"}`}
          aria-label="Bandeja de conversaciones"
        >
          <div className="pd-inbox-heading">
            <h3>
              Conversaciones <span>4</span>
            </h3>
            <PanelLeftClose size={15} aria-hidden="true" />
          </div>
          <label className="pd-search">
            <Search size={13} />
            <input
              aria-label="Buscar conversaciones"
              placeholder="Buscar conversación"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <div className="pd-filter-label">
            <span>
              Mi bandeja <ChevronDown size={11} />
            </span>
            <span>4 abiertas</span>
          </div>
          <label className="pd-channel-filter">
            <span className="pd-sr-only">Filtrar por canal</span>
            <select
              value={filter}
              onChange={(e) =>
                changeChannel(e.target.value as Channel | "Todos")
              }
            >
              <option value="Todos">Todos los canales</option>
              {(["WhatsApp", "Instagram", "Email", "Webchat"] as Channel[]).map(
                (c) => (
                  <option key={c}>{c}</option>
                ),
              )}
            </select>
          </label>
          <div className="pd-conversation-list">
            {visible.map((c) => (
              <button
                type="button"
                className={`pd-inbox-card ${selected === c.id ? "pd-selected" : ""}`}
                key={c.id}
                onClick={() => selectCase(c.id)}
                aria-pressed={selected === c.id}
              >
                <div className="pd-card-top">
                  <span className={`pd-avatar pd-${c.color}`}>
                    {c.initials}
                  </span>
                  <span className="pd-card-person">
                    <strong>{c.name}</strong>
                    <span>
                      <ChannelIcon channel={c.channel} size={10} /> {c.channel}
                    </span>
                  </span>
                  <span className="pd-card-time">{c.time}</span>
                </div>
                <p>{c.preview}</p>
                <div className="pd-card-bottom">
                  <span
                    className={`pd-status ${c.status === "En atención" ? "pd-status-blue" : ""}`}
                  >
                    {c.status}
                  </span>
                  <span>
                    <span className="pd-tiny-avatar">A</span>
                    {c.assigned}
                  </span>
                </div>
              </button>
            ))}
            {visible.length === 0 && (
              <p className="pd-no-results">
                No hay conversaciones para esta búsqueda.
              </p>
            )}
          </div>
          <div className="pd-inbox-footer">
            <span className="pd-online-dot" /> Tu equipo, conectado
          </div>
        </section>
        <section
          className={`pd-chat pd-pane-${pane === "conversation" ? "visible" : "hidden"}`}
          aria-label={`Conversación con ${conversation.name}`}
        >
          <header className="pd-chat-header">
            <span className={`pd-avatar pd-${conversation.color}`}>
              {conversation.initials}
            </span>
            <div>
              <h3>{conversation.name}</h3>
              <span>
                <ChannelIcon channel={conversation.channel} size={11} />{" "}
                {conversation.channel} <b>·</b>{" "}
                {state.escalated ? "Derivada a supervisión" : "En atención"}
              </span>
            </div>
            <span className="pd-chat-header-more">
              <MoreHorizontal size={20} aria-hidden="true" />
            </span>
          </header>
          <div className="pd-chat-context">
            <span>
              <span className="pd-tiny-avatar">A</span> Ana López
            </span>
            <span>{conversation.subject}</span>
          </div>
          <div
            ref={messagesRef}
            className="pd-messages"
            role="log"
            tabIndex={0}
            aria-label="Mensajes de la conversación"
            aria-live="polite"
          >
            <div className="pd-date">Hoy, 10:42</div>
            {conversation.messages.map((message, index) => (
              <div
                key={`${selected}-${index}`}
                className={`pd-message pd-message-${message.role}`}
              >
                <p>{message.text}</p>
                <span>
                  {message.time}
                  {message.role === "agent" && <CheckCheck size={11} />}
                </span>
              </div>
            ))}
            {state.sent.map((message, index) => (
              <div
                key={`sent-${selected}-${index}`}
                className="pd-message pd-message-agent"
              >
                <p>{message}</p>
                <span>
                  Ahora <CheckCheck size={11} />
                </span>
              </div>
            ))}
            {state.escalated && (
              <div className="pd-escalation">
                <span>
                  <Users size={14} /> Caso derivado a supervisión
                </span>
                <p>{conversation.summary}</p>
                <small>Resumen e historial conservados · Simulación</small>
              </div>
            )}
          </div>
          <div className="pd-chat-actions">
            <button type="button" onClick={consult} disabled={!!loading}>
              <Sparkles size={13} />{" "}
              {loading === selected ? "Consultando…" : "Consultar copiloto"}
            </button>
            <button type="button" onClick={escalate} disabled={state.escalated}>
              <ArrowUpRight size={13} />
              {state.escalated ? "Derivado" : "Derivar"}
            </button>
          </div>
          <form
            className="pd-composer"
            onSubmit={(event) => {
              event.preventDefault();
              send();
            }}
          >
            <label htmlFor={`${uid}-reply`} className="pd-sr-only">
              Respuesta para {conversation.name}
            </label>
            <textarea
              ref={textareaRef}
              id={`${uid}-reply`}
              placeholder="Escribe tu respuesta…"
              value={state.draft}
              onChange={(e) => updateCase({ draft: e.target.value })}
              rows={2}
            />
            <div>
              <span>
                <ShieldCheck size={11} /> Tú tienes la última palabra
              </span>
              <button
                type="submit"
                aria-label="Enviar mensaje simulado"
                disabled={!state.draft.trim()}
              >
                <Send size={14} />
              </button>
            </div>
          </form>
        </section>
        <section
          className={`pd-copilot pd-pane-${pane === "copilot" ? "visible" : "hidden"}`}
          aria-label="Copiloto de inteligencia artificial"
        >
          <header className="pd-copilot-header">
            <span className="pd-sparkle-icon">
              <Sparkles size={16} />
            </span>
            <div>
              <h3>Tu copiloto IA</h3>
              <span>Conocimiento que acompaña</span>
            </div>
            <span className="pd-ai-badge">IA</span>
          </header>
          <div className="pd-copilot-content">
            <div className="pd-context-tag">
              <span /> Contexto de la conversación conectado
            </div>
            {loading === selected ? (
              <div className="pd-empty">
                <LoaderCircle className="pd-spinner" size={25} />
                <h4>Consultando las fuentes</h4>
                <p>Buscando información relevante para este caso…</p>
              </div>
            ) : state.consulted ? (
              <>
                <div className="pd-answer-label">
                  <Sparkles size={13} />
                  <span>Respuesta sugerida</span>
                  <span className="pd-verified">
                    <ShieldCheck size={11} /> Verificada*
                  </span>
                </div>
                <div className="pd-answer">
                  <p>{conversation.answer}</p>
                </div>
                <button
                  ref={sourceButtonRef}
                  type="button"
                  className="pd-source"
                  onClick={() => dialogRef.current?.showModal()}
                >
                  <span className="pd-source-icon">
                    <FileText size={16} />
                  </span>
                  <span>
                    <strong>{conversation.source}</strong>
                    <small>
                      v{conversation.version} <b>·</b> {conversation.section}
                    </small>
                  </span>
                  <ArrowUpRight size={13} />
                  <span className="pd-sr-only">Ver fuente documental</span>
                </button>
                <div className="pd-approved">
                  <ShieldCheck size={11} /> Fuente aprobada{" "}
                  <span>· Datos de ejemplo</span>
                </div>
                <div
                  className={`pd-exception ${conversation.requiresApproval ? "pd-exception-important" : ""}`}
                >
                  <TriangleAlert size={13} />
                  <p>{conversation.exception}</p>
                </div>
                <div className="pd-next">
                  <span>PRÓXIMO PASO</span>
                  <p>
                    <ArrowRight size={12} />
                    {conversation.nextStep}
                  </p>
                </div>
                <div className="pd-response-actions">
                  <button type="button" className="pd-insert" onClick={insert}>
                    <Plus size={13} /> Insertar respuesta{" "}
                    <ArrowDown size={12} />
                  </button>
                  <button
                    type="button"
                    className="pd-copy"
                    onClick={copy}
                    aria-label="Copiar respuesta"
                  >
                    <Copy size={14} />
                  </button>
                </div>
                {conversation.requiresApproval && (
                  <button
                    className="pd-supervisor"
                    type="button"
                    onClick={escalate}
                    disabled={state.escalated}
                  >
                    <Users size={13} />{" "}
                    {state.escalated
                      ? "Caso derivado"
                      : "Derivar a supervisor con resumen"}
                  </button>
                )}
                <p className="pd-disclaimer">
                  *Basada en una fuente ficticia. Revisión humana antes de
                  responder.
                </p>
              </>
            ) : (
              <div className="pd-empty">
                <span className="pd-empty-icon">
                  <Sparkles size={27} />
                </span>
                <h4>El contexto, a tu favor.</h4>
                <p>
                  Consulta el conocimiento de la empresa para ayudar a{" "}
                  {conversation.name.split(" ")[0]} con una respuesta
                  sustentada.
                </p>
                <button className="pd-insert" type="button" onClick={consult}>
                  <Sparkles size={13} /> Consultar copiloto
                </button>
                <small>Fuentes y respuestas simuladas</small>
              </div>
            )}
          </div>
        </section>
      </div>
      <div className="pd-bottom-bar">
        <span>
          <span className="pd-online-dot" /> Entorno de demostración
        </span>
        <span role="status" aria-live="polite">
          {feedback ||
            "Conversaciones ficticias. Sin conexiones a servicios reales."}
        </span>
        <span className="pd-bottom-end">
          <ShieldCheck size={11} /> Siempre con control humano
        </span>
      </div>
      <dialog
        ref={dialogRef}
        className="pd-dialog"
        aria-labelledby={`${uid}-source-title`}
        onClose={() => sourceButtonRef.current?.focus()}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        <div className="pd-dialog-heading">
          <span className="pd-sparkle-icon">
            <FileText size={20} />
          </span>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Cerrar fuente"
          >
            <X size={20} />
          </button>
        </div>
        <span className="pd-dialog-eyebrow">BASE DE CONOCIMIENTO · DEMO</span>
        <h3 id={`${uid}-source-title`}>{conversation.source}</h3>
        <div className="pd-dialog-meta">
          <span>Versión {conversation.version}</span>
          <span>{conversation.section}</span>
          <span>
            <ShieldCheck size={12} /> Aprobada en esta simulación
          </span>
        </div>
        <p>{conversation.sourceText}</p>
        <div className="pd-dialog-note">
          <TriangleAlert size={16} /> Este documento y sus condiciones son
          ficticios. Se muestran para ilustrar cómo el copiloto cita el
          conocimiento de una empresa.
        </div>
        <button
          type="button"
          className="pd-insert"
          onClick={() => dialogRef.current?.close()}
        >
          Entendido <Check size={14} />
        </button>
      </dialog>
    </div>
  );
}

export default ProductDemo;
