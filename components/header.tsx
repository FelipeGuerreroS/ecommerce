"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { BrandMark } from "./brand-mark";

const links = [
  ["Plataforma", "plataforma"],
  ["Copiloto IA", "copiloto"],
  ["Cómo funciona", "como-funciona"],
  ["Integraciones", "integraciones"],
  ["Preguntas frecuentes", "preguntas"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header className="site-header">
      <div className="nav-container">
        <a
          href="#inicio"
          className="home-link"
          aria-label="Ir al inicio"
          onClick={() => setOpen(false)}
        >
          <BrandMark />
        </a>
        <nav className="desktop-nav" aria-label="Navegación principal">
          {links.map(([label, id]) => (
            <a href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
        </nav>
        <a href="#solicitar-demo" className="button button-primary nav-cta">
          Solicitar demo <ArrowUpRight size={15} />
        </a>
        <button
          className="menu-toggle"
          ref={toggleRef}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        hidden={!open}
        aria-label="Navegación móvil"
      >
        {links.map(([label, id]) => (
          <a href={`#${id}`} key={id} onClick={() => setOpen(false)}>
            {label}
            <ArrowUpRight size={16} />
          </a>
        ))}
        <a
          href="#solicitar-demo"
          className="button button-primary"
          onClick={() => setOpen(false)}
        >
          Solicitar demo <ArrowUpRight size={16} />
        </a>
      </nav>
    </header>
  );
}
