import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCheck,
  FileText,
  GitBranch,
  History,
  Instagram,
  Mail,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

export function InboxVisual() {
  return (
    <div
      className="feature-visual inbox-visual"
      aria-label="Ejemplo conceptual de historial unificado y asignación"
    >
      <div className="visual-window-top">
        <span className="window-dot" />
        <span className="window-dot" />
        <span className="window-dot" />
        <span>Workspace omnicanal</span>
      </div>
      <div className="visual-inbox-body">
        <div className="visual-channel-rail">
          <span className="channel-tile whatsapp">
            <MessageCircle size={22} />
          </span>
          <span className="channel-tile instagram">
            <Instagram size={22} />
          </span>
          <span className="channel-tile email">
            <Mail size={22} />
          </span>
        </div>
        <div className="unified-thread">
          <div className="thread-person">
            <span className="avatar peach">CM</span>
            <div>
              <strong>Camila Morales</strong>
              <span>Un cliente. Una historia completa.</span>
            </div>
            <span className="tiny-status">En atención</span>
          </div>
          <div className="timeline-line">
            <span className="timeline-icon">
              <Instagram size={13} />
            </span>
            <div>
              <span>Instagram · 09:32</span>
              <p>Consulta por disponibilidad de un producto</p>
            </div>
            <CheckCheck size={15} />
          </div>
          <div className="timeline-line">
            <span className="timeline-icon green">
              <MessageCircle size={13} />
            </span>
            <div>
              <span>WhatsApp · 10:14</span>
              <p>Retoma la conversación con todo el contexto</p>
            </div>
            <CheckCheck size={15} />
          </div>
          <div className="assignment-card">
            <span className="avatar blue">VS</span>
            <div>
              <strong>Valentina Soto</strong>
              <span>Ejecutiva asignada</span>
            </div>
            <ArrowRight size={16} />
            <span className="avatar lilac">AR</span>
            <div>
              <strong>Andrés R.</strong>
              <span>Supervisor</span>
            </div>
          </div>
          <div className="visual-footnote">
            <History size={13} /> El contexto acompaña cada transferencia
          </div>
        </div>
      </div>
      <span className="visual-example">Vista conceptual</span>
    </div>
  );
}

export function KnowledgeVisual() {
  return (
    <div
      className="feature-visual knowledge-visual"
      aria-label="Ejemplo de respuesta con evidencia documental aprobada"
    >
      <div className="knowledge-search">
        <Search size={16} />
        <span>¿Qué condiciones de cambio aplican?</span>
        <span className="keyboard-shortcut">↵</span>
      </div>
      <div className="knowledge-answer">
        <div className="copilot-mini-label">
          <span className="sparkle-square">
            <Sparkles size={17} />
          </span>
          <strong>Tu conocimiento, conectado.</strong>
          <span className="live-dot" />
        </div>
        <p>
          Para productos de categoría A, el plazo de cambio es de{" "}
          <strong>30 días desde la compra.</strong> Revisa el estado del
          producto y el comprobante antes de confirmar.
        </p>
        <div className="source-inline">
          <FileText size={17} />
          <div>
            <strong>Política de cambios</strong>
            <span>Versión 3.2 · Sección 4.1</span>
          </div>
          <span className="source-approved">
            <ShieldCheck size={12} /> Aprobada
          </span>
        </div>
        <div className="evidence-note">
          <Check size={13} /> Respuesta sustentada en una fuente interna
        </div>
      </div>
      <div className="document-stack">
        <div>
          <BookOpen size={15} />
          <span>Manuales operativos</span>
          <span>v.2.0</span>
        </div>
        <div>
          <GitBranch size={15} />
          <span>Procedimientos internos</span>
          <span>v.1.4</span>
        </div>
        <div>
          <UserRound size={15} />
          <span>Protocolos de atención</span>
          <span>v.3.1</span>
        </div>
      </div>
      <span className="visual-example">Documentos y respuesta ficticios</span>
    </div>
  );
}
