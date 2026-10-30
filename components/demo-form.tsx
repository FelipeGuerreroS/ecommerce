"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, CheckCircle2, LockKeyhole } from "lucide-react";
import "./demo-form.css";

type FormValues = {
  name: string;
  company: string;
  email: string;
  agents: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const emptyValues: FormValues = {
  name: "",
  company: "",
  email: "",
  agents: "",
  message: "",
};

export function DemoForm() {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const confirmationRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const returningToForm = useRef(false);

  useEffect(() => {
    if (submitted) confirmationRef.current?.focus();
    else if (returningToForm.current) {
      nameRef.current?.focus();
      returningToForm.current = false;
    }
  }, [submitted]);

  function updateField(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FormErrors = {};

    if (!values.name.trim()) nextErrors.name = "Escribe tu nombre.";
    if (!values.company.trim())
      nextErrors.company = "Escribe el nombre de tu empresa.";
    if (!values.email.trim())
      nextErrors.email = "Escribe tu correo corporativo.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email =
        "Revisa el formato de tu correo. Por ejemplo: nombre@empresa.com.";
    }
    if (!values.agents)
      nextErrors.agents = "Selecciona una cantidad aproximada.";

    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
        ?.focus();
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="df-card df-confirmation" aria-live="polite">
        <span className="df-success-icon" aria-hidden="true">
          <CheckCircle2 size={32} strokeWidth={1.6} />
        </span>
        <span className="df-eyebrow">PROTOTIPO INTERACTIVO</span>
        <h3 ref={confirmationRef} tabIndex={-1}>
          ¡Todo listo para el siguiente paso!
        </h3>
        <p>
          Gracias, {values.name.trim().split(/\s+/)[0]}. Así se vería la
          confirmación de tu solicitud.
        </p>
        <div className="df-simulation-note">
          <Check size={18} aria-hidden="true" />
          <p>
            <strong>Esto es una simulación.</strong> No se enviaron datos a un
            servidor ni se agendó una demostración. La información solo
            permanece en esta página mientras está abierta.
          </p>
        </div>
        <button
          type="button"
          className="df-submit"
          onClick={() => {
            returningToForm.current = true;
            setSubmitted(false);
          }}
        >
          Volver al formulario <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      className="df-card"
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="demo-form-title"
    >
      <div className="df-form-heading">
        <h3 id="demo-form-title">Hablemos de tu equipo</h3>
        <p>Cuéntanos un poco sobre tu operación.</p>
      </div>
      <div className="df-fields">
        <div className="df-field">
          <label htmlFor="demo-name">
            Nombre <span aria-hidden="true">*</span>
          </label>
          <input
            ref={nameRef}
            id="demo-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Tu nombre"
            required
            maxLength={100}
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "demo-name-error" : undefined}
          />
          {errors.name && (
            <p id="demo-name-error" className="df-error">
              {errors.name}
            </p>
          )}
        </div>
        <div className="df-field">
          <label htmlFor="demo-company">
            Empresa <span aria-hidden="true">*</span>
          </label>
          <input
            id="demo-company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Nombre de tu empresa"
            required
            maxLength={150}
            value={values.company}
            onChange={(event) => updateField("company", event.target.value)}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "demo-company-error" : undefined}
          />
          {errors.company && (
            <p id="demo-company-error" className="df-error">
              {errors.company}
            </p>
          )}
        </div>
        <div className="df-field df-full">
          <label htmlFor="demo-email">
            Correo corporativo <span aria-hidden="true">*</span>
          </label>
          <input
            id="demo-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="nombre@empresa.com"
            required
            maxLength={254}
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "demo-email-error" : undefined}
          />
          {errors.email && (
            <p id="demo-email-error" className="df-error">
              {errors.email}
            </p>
          )}
        </div>
        <div className="df-field df-full">
          <label htmlFor="demo-agents">
            Cantidad aproximada de ejecutivos <span aria-hidden="true">*</span>
          </label>
          <select
            id="demo-agents"
            name="agents"
            required
            value={values.agents}
            onChange={(event) => updateField("agents", event.target.value)}
            aria-invalid={Boolean(errors.agents)}
            aria-describedby={errors.agents ? "demo-agents-error" : undefined}
          >
            <option value="" disabled>
              Selecciona el tamaño de tu equipo
            </option>
            <option value="1-10">1 a 10 ejecutivos</option>
            <option value="11-50">11 a 50 ejecutivos</option>
            <option value="51-200">51 a 200 ejecutivos</option>
            <option value="201-500">201 a 500 ejecutivos</option>
            <option value="501+">Más de 500 ejecutivos</option>
            <option value="defining">Estamos definiendo el equipo</option>
          </select>
          {errors.agents && (
            <p id="demo-agents-error" className="df-error">
              {errors.agents}
            </p>
          )}
        </div>
        <div className="df-field df-full">
          <label htmlFor="demo-message">
            ¿Qué te gustaría resolver?{" "}
            <span className="df-optional">(opcional)</span>
          </label>
          <textarea
            id="demo-message"
            name="message"
            rows={3}
            maxLength={1500}
            placeholder="Cuéntanos sobre tus canales o desafíos actuales…"
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
          />
        </div>
      </div>
      <button type="submit" className="df-submit">
        Solicitar una demostración <ArrowRight size={18} aria-hidden="true" />
      </button>
      <p className="df-disclaimer">
        <LockKeyhole size={13} aria-hidden="true" />
        <span>
          Formulario de demostración. El envío es simulado y tus datos no se
          envían a ningún servidor. Los campos con * son obligatorios.
        </span>
      </p>
    </form>
  );
}

export default DemoForm;
