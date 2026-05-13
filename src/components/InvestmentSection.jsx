"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, useSpring, AnimatePresence } from "framer-motion";
import { useIsMobile } from "./useIsMobile";

const BONE  = "#F4F2EC";
const DARK  = "#0E0E0E";
const GOLD  = "#C9A96E";
const STONE = "#8A8578";
const CREAM = "#E8E5D8";

const CYCLE_WORDS = ["Boundaries", "Expectations", "Horizons", "Standards"];

const FACTS = [
  { num: "$800K+", label: "Minimum\nInvestment" },
  { num: "10+",    label: "Texas\nProjects" },
  { num: "100%",   label: "USCIS\nCompliant" },
];

const PILLARS = [
  {
    index: "I",
    title: "Institutional Capital",
    body:
      "We direct global capital into Class-A Texas real estate — master-planned communities built for multi-generational endurance.",
  },
  {
    index: "II",
    title: "EB-5 Expertise",
    body:
      "In exclusive alliance with the Statewide EB-5 Regional Center, every project is structured for USCIS compliance from inception.",
  },
  {
    index: "III",
    title: "Legacy Architecture",
    body:
      "Architecture that outlasts trends. Communities that define neighbourhoods. Real estate that becomes heritage.",
  },
];

/* ── Cycling italic word ────────────────────────────────── */
function WordCycle({ words }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % words.length), 2400);
    return () => clearInterval(id);
  }, [words]);
  return (
    <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-110%", opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "inline-block",
            fontFamily: "'Instrument Serif',serif",
            fontStyle: "italic",
            color: GOLD,
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ── Pillar card ─────────────────────────────────────────── */
function PillarCard({ pillar, inView, delay, isMobile }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        padding: isMobile ? "1.8rem 1.4rem" : "2.2rem 2rem",
        borderTop: `1px solid rgba(10,10,10,${hovered ? 0.18 : 0.08})`,
        borderLeft: `2px solid ${hovered ? GOLD : "transparent"}`,
        background: hovered ? "rgba(201,169,110,0.03)" : "transparent",
        transition: "border-color 0.35s, background 0.35s",
        cursor: "default",
      }}
    >
      {/* Roman numeral */}
      <span style={{
        display: "block",
        fontFamily: "'Instrument Serif',serif",
        fontStyle: "italic",
        fontSize: "0.75rem",
        color: hovered ? GOLD : "rgba(10,10,10,0.2)",
        letterSpacing: "0.12em",
        marginBottom: "0.9rem",
        transition: "color 0.3s",
      }}>
        {pillar.index}
      </span>
      <h3 style={{
        fontFamily: "'Instrument Serif',serif",
        fontWeight: 400,
        fontSize: isMobile ? "1.2rem" : "clamp(1.1rem,1.6vw,1.45rem)",
        color: DARK,
        letterSpacing: "-0.025em",
        marginBottom: "0.75rem",
        lineHeight: 1.15,
      }}>
        {pillar.title}
      </h3>
      <p style={{
        fontFamily: "'DM Sans',sans-serif",
        fontSize: "0.84rem",
        fontWeight: 300,
        color: STONE,
        lineHeight: 1.85,
      }}>
        {pillar.body}
      </p>

      {/* Hover arrow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
        transition={{ duration: 0.25 }}
        style={{
          position: "absolute",
          bottom: "1.6rem",
          right: "1.6rem",
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: DARK,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 10L10 2M10 2H4M10 2v6" stroke={CREAM} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN — InvestmentSection
══════════════════════════════════════════════════════════ */
export default function InvestmentSection() {
  const sectionRef = useRef(null);
  const imageRef   = useRef(null);
  const isMobile   = useIsMobile(768);

  const inView    = useInView(sectionRef, { once: true, margin: "-8%" });
  const imgInView = useInView(imageRef,   { once: true, margin: "-8%" });

  /* Parallax */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const yImg  = useSpring(useTransform(scrollYProgress, [0,1], isMobile ? [0,0] : [50,-50]),  { stiffness:70, damping:18 });
  const yText = useSpring(useTransform(scrollYProgress, [0,1], isMobile ? [0,0] : [25,-25]),  { stiffness:70, damping:18 });
  const yNum  = useSpring(useTransform(scrollYProgress, [0,1], isMobile ? [0,0] : [80,-20]),  { stiffness:60, damping:16 });

  /* ── Shared fade-up variant ── */
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay },
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        .inv-section { position: relative; background: ${BONE}; overflow: hidden; }

        /* ── Grain texture overlay ── */
        .inv-grain {
          position: absolute; inset: -40%; width: 180%; height: 180%;
          opacity: 0.025; mix-blend-mode: multiply; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* ── Giant editorial BG number ── */
        .inv-bg-num {
          position: absolute;
          font-family: 'Instrument Serif', serif;
          font-weight: 400;
          font-style: italic;
          line-height: 1;
          letter-spacing: -0.08em;
          color: rgba(10,10,10,0.032);
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }

        /* ── Horizontal rule with dot ── */
        .inv-rule {
          display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
        }
        .inv-rule-line { height: 1px; background: rgba(10,10,10,0.15); flex: 1; }
        .inv-rule-dot  { width: 5px; height: 5px; border-radius: 50%; background: ${GOLD}; flex-shrink: 0; }
        .inv-rule-label {
          font-family: 'DM Sans', sans-serif; font-size: 0.6rem; font-weight: 500;
          letter-spacing: 0.24em; text-transform: uppercase; color: ${STONE};
        }

        /* ── Fact items ── */
        .inv-fact-num {
          font-family: 'Instrument Serif', serif;
          font-style: italic; line-height: 1;
          letter-spacing: -0.04em; color: ${DARK};
        }
        .inv-fact-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem; font-weight: 400;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: ${STONE}; line-height: 1.55;
          white-space: pre-line;
        }

        /* ── Image inner overlay ── */
        .inv-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(244,242,236,0) 30%, rgba(244,242,236,0.22) 100%);
          pointer-events: none;
        }

        /* ── Floating credential tag ── */
        .inv-tag {
          display: inline-flex; align-items: center; gap: 6px;
          background: ${BONE}; border: 1px solid rgba(10,10,10,0.1);
          padding: 6px 13px;
        }
        .inv-tag-dot { width: 4px; height: 4px; border-radius: 50%; background: ${GOLD}; }
        .inv-tag-text {
          font-family: 'DM Sans', sans-serif; font-size: 0.56rem;
          font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: ${STONE};
        }

        /* ── "Texas Refined" dark card ── */
        .inv-dark-card {
          background: ${DARK}; border-radius: 18px;
          padding: 2.6rem 2.4rem 2.2rem;
          box-shadow: 0 48px 80px -24px rgba(0,0,0,0.32);
        }
        .inv-dark-card-title {
          font-family: 'Instrument Serif', serif;
          font-style: italic; line-height: 1;
          letter-spacing: -0.04em; color: ${CREAM};
        }
        .inv-dark-card-sub {
          font-family: 'DM Sans', sans-serif; font-size: 0.6rem;
          font-weight: 300; letter-spacing: 0.32em; text-transform: uppercase;
          color: rgba(232,229,216,0.38); line-height: 1.8;
        }

        /* ── CTA link ── */
        .inv-cta {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase; color: ${DARK};
          text-decoration: none; cursor: pointer; background: none; border: none;
          padding: 0; transition: gap 0.3s;
        }
        .inv-cta:hover { gap: 16px; }
        .inv-cta-circle {
          width: 36px; height: 36px; border-radius: 50%; background: ${DARK};
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          transition: transform 0.3s, background 0.3s;
        }
        .inv-cta:hover .inv-cta-circle { transform: scale(1.1); background: ${GOLD}; }
      `}</style>

      <section ref={sectionRef} className="inv-section" style={{ padding: isMobile ? "5rem 0 6rem" : "10rem 0 13rem" }}>
        <div className="inv-grain" />

        {/* Giant BG editorial number — shifts on scroll */}
        <motion.div
          className="inv-bg-num"
          style={{
            y: yNum,
            fontSize: isMobile ? "72vw" : "48vw",
            top: isMobile ? "-4%" : "-8%",
            right: isMobile ? "-12%" : "-4%",
          }}
        >
          01
        </motion.div>

        <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 clamp(1.25rem,4vw,4rem)" }}>

          {/* ══════════════════════════════════
              DESKTOP LAYOUT
          ══════════════════════════════════ */}
          {!isMobile && (
            <>
              {/* ── Row 1: eyebrow + mega headline ── */}
              <div style={{ marginBottom: "5rem" }}>
                <motion.div {...fadeUp(0)} style={{ marginBottom: "1.4rem" }}>
                  <div className="inv-rule">
                    <div className="inv-rule-dot" />
                    <span className="inv-rule-label">Our Story · Exclusive Partnership</span>
                    <div className="inv-rule-line" />
                    <span className="inv-rule-label" style={{ color: GOLD }}>Est. Texas</span>
                  </div>
                </motion.div>

                {/* Headline — massive, spanning full width */}
                <div style={{ overflow: "hidden" }}>
                  <motion.h2
                    initial={{ y: "105%" }}
                    animate={inView ? { y: 0 } : {}}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    style={{
                      fontFamily: "'Instrument Serif',serif",
                      fontWeight: 400,
                      fontSize: "clamp(4.5rem,8.5vw,9.5rem)",
                      color: DARK,
                      letterSpacing: "-0.055em",
                      lineHeight: 0.88,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Forterra
                    <span style={{ fontStyle: "italic", color: STONE, marginLeft: "0.18em" }}>Developments</span>
                  </motion.h2>
                </div>

                {/* Sub-headline word cycle */}
                <motion.div
                  {...fadeUp(0.35)}
                  style={{
                    display: "flex", alignItems: "baseline", gap: "0.55em",
                    marginTop: "1.2rem",
                    fontSize: "clamp(1rem,1.5vw,1.35rem)",
                    fontFamily: "'DM Sans',sans-serif",
                    fontWeight: 300, letterSpacing: "-0.01em", textTransform: "uppercase",
                    color: DARK,
                  }}
                >
                  Building Beyond
                  <span style={{ fontSize: "clamp(1.2rem,1.8vw,1.65rem)" }}>
                    <WordCycle words={CYCLE_WORDS} />
                  </span>
                </motion.div>
              </div>

              {/* ── Row 2: left body + right image (overlapping) ── */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start", marginBottom: "6rem" }}>

                {/* Left: body copy + facts */}
                <motion.div style={{ y: yText }}>
                  <motion.div {...fadeUp(0.2)} style={{ marginBottom: "3.5rem" }}>
                    <p style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: "clamp(0.95rem,1.2vw,1.08rem)",
                      fontWeight: 300, color: DARK,
                      lineHeight: 1.9, marginBottom: "1.4rem", maxWidth: 500,
                    }}>
                      In alliance with the{" "}
                      <span style={{ fontWeight: 500, borderBottom: `1px solid rgba(10,10,10,0.25)`, paddingBottom: 1 }}>
                        Statewide EB-5 Regional Center
                      </span>
                      , we curate institutional-grade Texas real estate for the global investor seeking a permanent legacy.
                    </p>
                    <p style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: "0.88rem", fontWeight: 300, color: STONE,
                      lineHeight: 1.9, maxWidth: 460,
                    }}>
                      We merge architectural excellence with the EB-5 Immigrant Investor Program — transforming capital
                      into green cards, and land into legacy. Every project is defined by rigorous USCIS compliance
                      and aggressive growth benchmarks.
                    </p>
                  </motion.div>

                  {/* Facts — vertical stack */}
                  <motion.div
                    {...fadeUp(0.38)}
                    style={{
                      display: "grid", gridTemplateColumns: "repeat(3,1fr)",
                      gap: "1px", background: "rgba(10,10,10,0.08)",
                      border: "1px solid rgba(10,10,10,0.08)",
                    }}
                  >
                    {FACTS.map(({ num, label }) => (
                      <div key={num} style={{ background: BONE, padding: "1.6rem 1.4rem" }}>
                        <div className="inv-fact-num" style={{ fontSize: "clamp(1.6rem,2.4vw,2.4rem)", marginBottom: "0.55rem" }}>
                          {num}
                        </div>
                        <div className="inv-fact-label">{label}</div>
                      </div>
                    ))}
                  </motion.div>

                  {/* CTA */}
                  <motion.div {...fadeUp(0.5)} style={{ marginTop: "2.8rem" }}>
                    <button
                      className="inv-cta"
                      onClick={() => {
                        const el = document.getElementById("investment");
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                    >
                      Begin Your Application
                      <span className="inv-cta-circle">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M2 11L11 2M11 2H4M11 2v7" stroke={CREAM} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                  </motion.div>
                </motion.div>

                {/* Right: image + floating card */}
                <div ref={imageRef} style={{ position: "relative" }}>
                  <motion.div style={{ y: yImg }}>

                    {/* Primary image */}
                    <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", borderRadius: 4, background: "#ccc" }}>
                      <motion.img
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85"
                        alt="Forterra luxury development"
                        initial={{ scale: 1.16 }}
                        animate={imgInView ? { scale: 1 } : {}}
                        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(0.82)" }}
                      />
                      <div className="inv-img-overlay" />

                      {/* Tag — top right */}
                      <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        animate={imgInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5, duration: 0.9 }}
                        className="inv-tag"
                        style={{ position: "absolute", top: 16, right: 16 }}
                      >
                        <div className="inv-tag-dot" />
                        <span className="inv-tag-text">Class-A · Texas</span>
                      </motion.div>
                    </div>

                    {/* Dark floating card — overlaps below-left */}
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={imgInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -7, transition: { duration: 0.4 } }}
                      className="inv-dark-card"
                      style={{ position: "absolute", bottom: -50, left: -56, width: 276 }}
                    >
                      <div style={{ width: 24, height: 1.5, background: GOLD, marginBottom: "1.6rem" }} />
                      <div style={{ overflow: "hidden", marginBottom: "1.2rem" }}>
                        <motion.div
                          initial={{ y: "105%" }}
                          animate={imgInView ? { y: 0 } : {}}
                          transition={{ delay: 1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                          className="inv-dark-card-title"
                          style={{ fontSize: "clamp(1.9rem,2.8vw,2.4rem)" }}
                        >
                          Texas<br />Refined.
                        </motion.div>
                      </div>
                      <p className="inv-dark-card-sub">
                        A footprint of excellence<br />across the Lone Star State.
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* ── Row 3: Three pillars — full width grid ── */}
              <div>
                <motion.div {...fadeUp(0)} style={{ marginBottom: "2rem" }}>
                  <div className="inv-rule">
                    <div className="inv-rule-line" />
                    <div className="inv-rule-dot" />
                    <span className="inv-rule-label">What We Stand For</span>
                    <div className="inv-rule-line" />
                  </div>
                </motion.div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
                  {PILLARS.map((p, i) => (
                    <PillarCard key={p.index} pillar={p} inView={inView} delay={0.1 + i * 0.12} isMobile={false} />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ══════════════════════════════════
              MOBILE LAYOUT
          ══════════════════════════════════ */}
          {isMobile && (
            <div style={{ position: "relative", zIndex: 1 }}>

              {/* ── Eyebrow ── */}
              <motion.div {...fadeUp(0)} style={{ marginBottom: "1.2rem" }}>
                <div className="inv-rule">
                  <div className="inv-rule-dot" />
                  <span className="inv-rule-label">Our Story · Exclusive Partnership</span>
                  <div className="inv-rule-line" />
                </div>
              </motion.div>

              {/* ── Headline ── */}
              <div style={{ overflow: "hidden", marginBottom: "0.2rem" }}>
                <motion.h2
                  initial={{ y: "105%" }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                  style={{
                    fontFamily: "'Instrument Serif',serif", fontWeight: 400,
                    fontSize: "clamp(3rem,11vw,4rem)", color: DARK,
                    letterSpacing: "-0.05em", lineHeight: 0.88,
                  }}
                >
                  Forterra
                </motion.h2>
              </div>
              <div style={{ overflow: "hidden", marginBottom: "1.2rem" }}>
                <motion.h2
                  initial={{ y: "105%" }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
                  style={{
                    fontFamily: "'Instrument Serif',serif", fontWeight: 300,
                    fontStyle: "italic",
                    fontSize: "clamp(2rem,7.5vw,2.8rem)", color: STONE,
                    letterSpacing: "-0.04em", lineHeight: 1.05,
                  }}
                >
                  Developments
                </motion.h2>
              </div>

              {/* ── Word cycle ── */}
              <motion.div
                {...fadeUp(0.25)}
                style={{
                  display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "0 8px",
                  fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", fontWeight: 300,
                  textTransform: "uppercase", letterSpacing: "-0.01em", color: DARK,
                  marginBottom: "2.2rem",
                }}
              >
                Building Beyond
                <span style={{ fontSize: "1.05rem" }}><WordCycle words={CYCLE_WORDS} /></span>
              </motion.div>

              {/* ── Body copy ── */}
              <motion.div {...fadeUp(0.3)} style={{ marginBottom: "2rem" }}>
                <p style={{
                  fontFamily: "'DM Sans',sans-serif", fontSize: "0.93rem", fontWeight: 300,
                  color: DARK, lineHeight: 1.88, marginBottom: "1rem",
                }}>
                  In alliance with the{" "}
                  <span style={{ fontWeight: 500, borderBottom: `1px solid rgba(10,10,10,0.22)`, paddingBottom: 1 }}>
                    Statewide EB-5 Regional Center
                  </span>
                  , we curate institutional-grade Texas real estate for the global investor.
                </p>
                <p style={{
                  fontFamily: "'DM Sans',sans-serif", fontSize: "0.84rem", fontWeight: 300,
                  color: STONE, lineHeight: 1.9,
                }}>
                  We merge architectural excellence with the EB-5 program — transforming capital into legacy.
                  Rigorous USCIS compliance. Aggressive growth benchmarks.
                </p>
              </motion.div>

              {/* ── Image ── */}
              <div ref={imageRef} style={{ marginBottom: "1.5rem" }}>
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  animate={imgInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", borderRadius: 16, background: "#ccc", marginBottom: "1.2rem" }}>
                    <motion.img
                      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85"
                      alt="Forterra luxury development"
                      initial={{ scale: 1.12 }}
                      animate={imgInView ? { scale: 1 } : {}}
                      transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                      style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(0.84)" }}
                    />
                    <div className="inv-img-overlay" />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={imgInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.35, duration: 0.8 }}
                      className="inv-tag"
                      style={{ position: "absolute", top: 12, right: 12 }}
                    >
                      <div className="inv-tag-dot" />
                      <span className="inv-tag-text">Class-A · Texas</span>
                    </motion.div>
                  </div>

                  {/* Dark card — inline */}
                  <div className="inv-dark-card">
                    <div style={{ width: 20, height: 1.5, background: GOLD, marginBottom: "1.2rem" }} />
                    <div className="inv-dark-card-title" style={{ fontSize: "1.7rem", marginBottom: "0.9rem" }}>
                      Texas<br />Refined.
                    </div>
                    <p className="inv-dark-card-sub">
                      A footprint of excellence across the Lone Star State.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* ── Facts ── */}
              <motion.div
                {...fadeUp(0.2)}
                style={{
                  display: "grid", gridTemplateColumns: "repeat(3,1fr)",
                  gap: "1px", background: "rgba(10,10,10,0.08)",
                  border: "1px solid rgba(10,10,10,0.08)", marginBottom: "2.5rem",
                }}
              >
                {FACTS.map(({ num, label }) => (
                  <div key={num} style={{ background: BONE, padding: "1.2rem 1rem", textAlign: "center" }}>
                    <div className="inv-fact-num" style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>{num}</div>
                    <div className="inv-fact-label" style={{ textAlign: "center" }}>{label}</div>
                  </div>
                ))}
              </motion.div>

              {/* ── CTA ── */}
              <motion.div {...fadeUp(0.35)} style={{ marginBottom: "3rem" }}>
                <button
                  className="inv-cta"
                  onClick={() => {
                    const el = document.getElementById("investment");
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  Begin Your Application
                  <span className="inv-cta-circle">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M2 11L11 2M11 2H4M11 2v7" stroke={CREAM} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              </motion.div>

              {/* ── Pillars ── */}
              <div>
                <motion.div {...fadeUp(0)} style={{ marginBottom: "1.4rem" }}>
                  <div className="inv-rule">
                    <div className="inv-rule-line" />
                    <div className="inv-rule-dot" />
                    <span className="inv-rule-label">What We Stand For</span>
                    <div className="inv-rule-line" />
                  </div>
                </motion.div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {PILLARS.map((p, i) => (
                    <PillarCard key={p.index} pillar={p} inView={inView} delay={0.1 + i * 0.1} isMobile={true} />
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </section>
    </>
  );
}