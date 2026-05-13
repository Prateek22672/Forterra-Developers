"use client";
import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useIsMobile } from "./useIsMobile";

const DARK  = "#0E0E0E";
const GOLD  = "#C9A96E";
const CREAM = "#E8E5D8";

const BENEFITS = [
  {
    n: "01", tag: "Green Card",
    title: "Permanent", titleItalic: "Residency",
    desc: "U.S. green cards for the investor, spouse, and children under the age of 21.",
    icon: "🏛",
  },
  {
    n: "02", tag: "No Sponsor",
    title: "No Visa", titleItalic: "Sponsorship",
    desc: "Investors do not require a job offer or family sponsorship to qualify.",
    icon: "🗽",
  },
  {
    n: "03", tag: "Full Freedom",
    title: "Live, Work,", titleItalic: "Study",
    desc: "The flexibility to live, work, or retire anywhere in the United States without restrictions.",
    icon: "🌎",
  },
  {
    n: "04", tag: "Capital Growth",
    title: "Capital", titleItalic: "Security",
    desc: "Secure your capital in strong, high-growth EB-5 real estate projects in Texas.",
    icon: "🏗",
  },
];

// Peek cards behind the active card
function PeekCard({ offset, scale, opacity }) {
  return (
    <div style={{
      position: "absolute", bottom: -offset, left: 0, right: 0,
      height: 80, borderRadius: 20,
      background: "#141210",
      border: "1px solid rgba(201,169,110,0.1)",
      transform: `scale(${scale})`,
      transformOrigin: "center bottom",
      opacity,
      transition: "transform 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease",
      zIndex: 1,
      pointerEvents: "none",
    }} />
  );
}

export default function BenefitsSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });
  const isMobile = useIsMobile();

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [animating, setAnimating] = useState(false);

  const advance = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setDirection(1);
    setTimeout(() => {
      setCurrent(i => (i + 1) % BENEFITS.length);
      setAnimating(false);
    }, 420);
  }, [animating]);

  const goTo = useCallback((idx) => {
    if (animating || idx === current) return;
    setAnimating(true);
    setDirection(idx > current ? 1 : -1);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 420);
  }, [animating, current]);

  const card = BENEFITS[current];
  const remaining = BENEFITS.length - current - 1;
  const isLast = current === BENEFITS.length - 1;

  // How many peek layers to show (max 2)
  const peekCount = Math.min(BENEFITS.length - 1 - current, 2);

  return (
    <section
      ref={sectionRef}
      id="benefits"
      style={{
        position: "relative",
        background: DARK,
        padding: isMobile ? "5rem 1.25rem 6rem" : "9rem 4rem",
        overflow: "hidden",
      }}
    >
      {/* Dot-grid bg */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(200,169,110,0.07) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        pointerEvents: "none",
      }} />

      {/* Gold top rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg,transparent,${GOLD},transparent)`,
          transformOrigin: "left",
        }}
      />

      <div style={{ maxWidth: 1360, margin: "0 auto" }}>

        {/* ── Two-col grid: left = header + stack, right = image (desktop) ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 0 : "5rem",
          alignItems: "center",
        }}>

          {/* ── LEFT: header + card stack ── */}
          <div>
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginBottom: isMobile ? "2.5rem" : "3.5rem" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 32, height: 1.5, background: GOLD, borderRadius: 2 }} />
                <span style={{
                  fontFamily: "'DM Sans',sans-serif", fontSize: "0.62rem", fontWeight: 500,
                  letterSpacing: "0.26em", textTransform: "uppercase", color: GOLD,
                }}>
                  Investment Benefits
                </span>
              </div>
              <h2 style={{
                fontFamily: "'Instrument Serif',serif", fontWeight: 400,
                fontSize: isMobile ? "clamp(2.2rem,8vw,3rem)" : "clamp(2.5rem,3.5vw,4rem)",
                color: CREAM, letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: "1rem",
              }}>
                More Than Just<br />
                <span style={{ fontStyle: "italic" }}>Financial Returns</span>
              </h2>
              <p style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: "0.93rem", fontWeight: 300,
                color: "rgba(232,229,216,0.5)", lineHeight: 1.8, maxWidth: 420,
              }}>
                The EB-5 Program offers a unique opportunity to secure your family's future
                while investing in high-quality Texas real estate.
              </p>
            </motion.div>

            {/* ── Card stack ── */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              {/* Stack wrapper — relative container holds peeking cards */}
              <div style={{
                position: "relative",
                maxWidth: 480,
                paddingBottom: peekCount >= 2 ? 28 : peekCount === 1 ? 16 : 0,
              }}>
                {/* Peek card 2 (furthest back) */}
                {peekCount >= 2 && (
                  <PeekCard offset={18} scale={0.93} opacity={0.55} />
                )}
                {/* Peek card 1 */}
                {peekCount >= 1 && (
                  <PeekCard offset={9} scale={0.965} opacity={0.75} />
                )}

                {/* Active card with slide animation */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ x: direction > 0 ? "110%" : "-110%", rotate: direction > 0 ? 6 : -6, opacity: 0 }}
                    animate={{ x: 0, rotate: 0, opacity: 1 }}
                    exit={{ x: direction > 0 ? "-120%" : "120%", rotate: direction > 0 ? -8 : 8, opacity: 0 }}
                    transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
                    onClick={!isLast ? advance : () => setCurrent(0)}
                    style={{
                      position: "relative", zIndex: 10,
                      background: "#141210",
                      border: "1px solid rgba(201,169,110,0.18)",
                      borderRadius: 20,
                      padding: isMobile ? "1.8rem 1.5rem" : "2.2rem 2.4rem",
                      cursor: "pointer",
                      willChange: "transform",
                    }}
                  >
                    {/* Card eyebrow */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.3rem" }}>
                      <span style={{
                        fontFamily: "'DM Sans',sans-serif", fontSize: "0.57rem", fontWeight: 600,
                        letterSpacing: "0.22em", color: "rgba(201,169,110,0.5)",
                      }}>
                        {card.n}
                      </span>
                      <span style={{
                        fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem", fontWeight: 500,
                        letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(201,169,110,0.7)",
                        background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.15)",
                        padding: "3px 10px", borderRadius: 999,
                      }}>
                        {card.tag}
                      </span>
                    </div>

                    {/* Title + icon row */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: "1rem" }}>
                      <h3 style={{
                        fontFamily: "'Instrument Serif',serif", fontWeight: 400,
                        fontSize: "clamp(1.5rem,3.5vw,2rem)", color: CREAM,
                        letterSpacing: "-0.04em", lineHeight: 1.1,
                      }}>
                        {card.title}<br />
                        <em style={{ color: GOLD }}>{card.titleItalic}</em>
                      </h3>
                      <div style={{
                        width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                        background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.14)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "1.25rem",
                      }}>
                        {card.icon}
                      </div>
                    </div>

                    {/* Description */}
                    <p style={{
                      fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", fontWeight: 300,
                      color: "rgba(232,229,216,0.52)", lineHeight: 1.78, marginBottom: "1.5rem",
                    }}>
                      {card.desc}
                    </p>

                    {/* Footer: dots + button */}
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      borderTop: "1px solid rgba(232,229,216,0.07)", paddingTop: "1.1rem",
                    }}>
                      {/* Progress dots */}
                      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        {BENEFITS.map((_, i) => (
                          <button
                            key={i}
                            onClick={(e) => { e.stopPropagation(); goTo(i); }}
                            style={{
                              width: i === current ? 18 : 5,
                              height: 5,
                              borderRadius: 999,
                              background: i === current ? GOLD : "rgba(201,169,110,0.25)",
                              border: "none", cursor: "pointer", padding: 0,
                              transition: "width 0.35s cubic-bezier(0.16,1,0.3,1), background 0.3s",
                            }}
                          />
                        ))}
                      </div>

                      {/* Next / restart button */}
                      <button
                        onClick={(e) => { e.stopPropagation(); isLast ? setCurrent(0) : advance(); }}
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 7,
                          fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", fontWeight: 500,
                          color: "rgba(232,229,216,0.6)", background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(232,229,216,0.12)", borderRadius: 999,
                          padding: "7px 14px", cursor: "pointer",
                          transition: "color 0.22s, border-color 0.22s, background 0.22s",
                          letterSpacing: "0.02em",
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.color = GOLD;
                          e.currentTarget.style.borderColor = "rgba(201,169,110,0.35)";
                          e.currentTarget.style.background = "rgba(201,169,110,0.07)";
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.color = "rgba(232,229,216,0.6)";
                          e.currentTarget.style.borderColor = "rgba(232,229,216,0.12)";
                          e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                        }}
                      >
                        {isLast ? "Start over ↺" : "Next benefit →"}
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Hint text */}
              <p style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem", fontWeight: 400,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "rgba(232,229,216,0.2)", marginTop: "1rem",
              }}>
                {isLast ? "You've seen all benefits" : `${remaining} more benefit${remaining !== 1 ? "s" : ""} remaining — tap to advance`}
              </p>
            </motion.div>
          </div>

          {/* ── RIGHT: image (desktop) / below (mobile) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{
              position: "relative",
              aspectRatio: "4/3",
              overflow: "hidden",
              borderRadius: 20,
              marginTop: isMobile ? "3rem" : 0,
            }}
          >
            <img
              src="/benfits.png"
              alt="Texas luxury real estate"
              style={{
                width: "100%", height: "100%", objectFit: "cover",
                filter: "saturate(0.8)", borderRadius: 20,
                pointerEvents: "none", userSelect: "none",
              }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(14,14,14,0.6) 0%, transparent 55%)",
              pointerEvents: "none", borderRadius: 20,
            }} />
            {/* Image caption */}
            <div style={{ position: "absolute", bottom: 20, left: 20 }}>
              <p style={{
                fontFamily: "'Instrument Serif',serif", fontStyle: "italic",
                fontSize: "1.1rem", color: CREAM,
              }}>
                Texas · Class-A · 2026
              </p>
            </div>
            {/* Subtle gold border accent */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: 20,
              border: "1px solid rgba(201,169,110,0.15)",
              pointerEvents: "none",
            }} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}