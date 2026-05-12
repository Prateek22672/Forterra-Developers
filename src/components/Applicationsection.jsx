"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const DARK  = "#0A0A0A";
const GOLD  = "#C9A96E";
const GOLD_LIGHT = "#e0b97c";
const STONE = "#8A8578";
const CREAM = "#E8E5D8";
const CARD_BG = "rgba(255,255,255,0.04)";
const CARD_BORDER = "rgba(232,229,216,0.09)";

const PROJECTS = ["Lakeside Estates", "Cimarron Hills", "Twin Creek Manor"];

export default function ApplicationSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const [sel, setSel] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", country: "", message: "" });
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.email) return;
    setSubmitted(true);
  };

  const fieldStyle = (key) => ({
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused === key ? GOLD : "rgba(232,229,216,0.14)"}`,
    padding: "13px 0",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.9rem",
    fontWeight: 300,
    color: CREAM,
    outline: "none",
    width: "100%",
    transition: "border-color 0.25s",
    caretColor: GOLD,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        #eb5-section ::placeholder { color: rgba(232,229,216,0.32); }

        .eb5-field-label {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${GOLD};
          margin-bottom: 2px;
        }

        .eb5-contact-link {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          padding: 10px 0;
          border-bottom: 1px solid rgba(232,229,216,0.06);
          transition: opacity 0.2s;
        }
        .eb5-contact-link:last-child { border-bottom: none; }
        .eb5-contact-link:hover { opacity: 0.75; }

        .eb5-pill {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.74rem;
          font-weight: 400;
          padding: 8px 16px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.22s;
          white-space: nowrap;
        }

        .eb5-submit-btn {
          margin-top: 0.5rem;
          background: ${GOLD};
          color: ${DARK};
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          padding: 17px;
          cursor: pointer;
          transition: background 0.22s, transform 0.22s, box-shadow 0.22s;
          width: 100%;
        }
        .eb5-submit-btn:hover {
          background: ${GOLD_LIGHT};
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(201,169,110,0.22);
        }
        .eb5-submit-btn:active { transform: translateY(0); }
        .eb5-submit-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; box-shadow: none; }

        @media (max-width: 680px) {
          .eb5-grid { grid-template-columns: 1fr !important; gap: 2.8rem !important; }
          .eb5-heading { font-size: clamp(2.4rem, 11vw, 3.2rem) !important; }
          .eb5-section-pad { padding: 5rem 1.25rem 6rem !important; }
          .eb5-form-pad { padding: 1.8rem 1.4rem !important; }
          .eb5-pill { font-size: 0.7rem; padding: 7px 13px; }
          .eb5-meta-row { flex-direction: column !important; gap: 1.1rem !important; }
        }

        @media (max-width: 380px) {
          .eb5-pill { font-size: 0.66rem; padding: 6px 11px; }
          .eb5-heading { font-size: 2.2rem !important; }
        }

        @media (min-width: 681px) and (max-width: 960px) {
          .eb5-section-pad { padding: 6rem 2.5rem !important; }
          .eb5-heading { font-size: clamp(2.8rem, 5vw, 4rem) !important; }
        }
      `}</style>

      <section
        id="eb5-section"
        ref={ref}
        className="eb5-section-pad"
        style={{
          position: "relative",
          background: DARK,
          padding: "9rem 4rem",
          overflow: "hidden",
        }}
      >
        {/* Noise texture */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.025, pointerEvents: "none",
        }} />

        {/* Ambient glow */}
        <div style={{
          position: "absolute", top: "-20%", right: "-10%",
          width: "55vw", height: "55vw", maxWidth: 600, maxHeight: 600,
          background: `radial-gradient(circle, rgba(201,169,110,0.055) 0%, transparent 65%)`,
          pointerEvents: "none",
        }} />

        {/* Top line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 1,
            background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
            transformOrigin: "left",
          }}
        />

        <div
          className="eb5-grid"
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "start",
          }}
        >

          {/* ── Left: Info column ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
              <div style={{ width: 28, height: 1, background: GOLD }} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.6rem", fontWeight: 500,
                letterSpacing: "0.26em", textTransform: "uppercase",
                color: GOLD,
              }}>Application</span>
            </div>

            {/* Heading */}
            <h2
              className="eb5-heading"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
                fontSize: "clamp(2.6rem, 4vw, 4.8rem)",
                color: CREAM,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                marginBottom: "1.3rem",
              }}
            >
              Start Your<br />
              <span style={{ fontStyle: "italic" }}>EB-5 Journey</span>
            </h2>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.93rem", fontWeight: 300,
              color: "rgba(232,229,216,0.5)",
              lineHeight: 1.85, marginBottom: "2.2rem",
              maxWidth: 420,
            }}>
              Fill out the form and our specialist team will personally guide you through investment options and the residency process.
            </p>

            {/* Contact links */}
            <div style={{ marginBottom: "2.2rem" }}>
              {[
                { icon: "📞", val: "+1 (512) 240-4090", href: "tel:+15122404090", sub: "Direct line" },
                { icon: "✉", val: "info@forterradev.com", href: "mailto:info@forterradev.com", sub: "Response within 24h" },
              ].map(({ icon, val, href, sub }) => (
                <a key={val} href={href} className="eb5-contact-link">
                  <span style={{
                    width: 38, height: 38,
                    background: "rgba(200,169,110,0.1)",
                    border: "1px solid rgba(200,169,110,0.18)",
                    borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.82rem", flexShrink: 0,
                  }}>{icon}</span>
                  <div>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.88rem", fontWeight: 400,
                      color: CREAM, display: "block",
                    }}>{val}</span>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.7rem", fontWeight: 300,
                      color: "rgba(232,229,216,0.35)",
                    }}>{sub}</span>
                  </div>
                </a>
              ))}
            </div>

            {/* Meta stats */}
            <div style={{
              paddingTop: "2rem",
              borderTop: "1px solid rgba(232,229,216,0.07)",
              display: "flex", flexDirection: "column", gap: "1rem",
            }}>
              {[
                { label: "Minimum Capital", val: "$800,000 USD" },
                { label: "Investment Focus", val: "U.S. Real Estate" },
                { label: "Eligibility Window", val: "Now Accepting 2026" },
              ].map(({ label, val }) => (
                <div key={label} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{
                    width: 3, height: 3, borderRadius: "50%",
                    background: GOLD, flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.63rem", fontWeight: 500,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    color: "rgba(232,229,216,0.35)", minWidth: 130,
                  }}>{label}</span>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.88rem", fontWeight: 400,
                    color: "rgba(232,229,216,0.7)",
                  }}>{val}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Form column ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          >
            <div
              className="eb5-form-pad"
              style={{
                background: CARD_BG,
                border: `1px solid ${CARD_BORDER}`,
                padding: "2.8rem",
                display: "flex", flexDirection: "column", gap: "1.4rem",
              }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ textAlign: "center", padding: "2rem 0" }}
                >
                  <div style={{
                    width: 56, height: 56,
                    borderRadius: "50%",
                    background: "rgba(200,169,110,0.12)",
                    border: `1px solid ${GOLD}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 1.4rem",
                    fontSize: "1.4rem",
                  }}>✓</div>
                  <h3 style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "1.7rem", fontWeight: 400,
                    color: CREAM, marginBottom: "0.6rem",
                    letterSpacing: "-0.02em",
                  }}>Application Received</h3>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.88rem", fontWeight: 300,
                    color: "rgba(232,229,216,0.5)", lineHeight: 1.7,
                  }}>
                    Our team will reach out within 24 hours to discuss next steps.
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Project selector */}
                  <div>
                    <label className="eb5-field-label">Select Project</label>
                    <div style={{
                      display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10,
                    }}>
                      {PROJECTS.map(p => (
                        <button
                          key={p}
                          className="eb5-pill"
                          onClick={() => setSel(p === sel ? null : p)}
                          style={{
                            background: sel === p ? GOLD : "transparent",
                            color: sel === p ? DARK : "rgba(232,229,216,0.5)",
                            border: `1px solid ${sel === p ? GOLD : "rgba(232,229,216,0.18)"}`,
                            fontWeight: sel === p ? 500 : 400,
                          }}
                        >{p}</button>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div style={{ height: 1, background: "rgba(232,229,216,0.07)", margin: "0 0 0.2rem" }} />

                  {/* Fields */}
                  {[
                    { key: "name",    placeholder: "Full Name",         type: "text"  },
                    { key: "email",   placeholder: "Email Address",     type: "email" },
                    { key: "country", placeholder: "Country of Origin", type: "text"  },
                  ].map(({ key, placeholder, type }) => (
                    <div key={key} style={{ position: "relative" }}>
                      {form[key] && (
                        <label className="eb5-field-label" style={{ marginBottom: 4 }}>
                          {placeholder}
                        </label>
                      )}
                      <input
                        type={type}
                        placeholder={form[key] ? "" : placeholder}
                        value={form[key]}
                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                        onFocus={() => setFocused(key)}
                        onBlur={() => setFocused(null)}
                        style={fieldStyle(key)}
                      />
                    </div>
                  ))}

                  <div style={{ position: "relative" }}>
                    {form.message && (
                      <label className="eb5-field-label" style={{ marginBottom: 4 }}>
                        Message
                      </label>
                    )}
                    <textarea
                      placeholder={form.message ? "" : "Investment Timeline/Message"}
                      rows={3}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      style={{ ...fieldStyle("message"), resize: "vertical", minHeight: 72 }}
                    />
                  </div>

                  {/* Trust line above button */}
                  <div style={{
                    display: "flex", gap: "1.2rem", flexWrap: "wrap",
                  }}>
                    {["🔒 Confidential", "⚡ 24h Response", "🌍 Global Clients"].map(item => (
                      <span key={item} style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.67rem", fontWeight: 300,
                        color: "rgba(232,229,216,0.32)",
                        letterSpacing: "0.04em",
                      }}>{item}</span>
                    ))}
                  </div>

                  <button
                    className="eb5-submit-btn"
                    onClick={handleSubmit}
                    disabled={!form.name || !form.email}
                  >
                    Submit Application →
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}