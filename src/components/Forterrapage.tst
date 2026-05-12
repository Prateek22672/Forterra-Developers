// PAGE ENTRY — import hero + section separately
// Usage: replace your page.tsx with <ForterraPage />
import ForterraHero      from "./ForterraHero";
import InvestmentSection from "./InvestmentSection";

export default function ForterraPage() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #F4F2EC; overflow-x: hidden; }
        ::selection { background: #C9A96E; color: #0E0E0E; }
      `}</style>
      <div style={{ padding: "12px 12px 0", background: "#F4F2EC" }}>
        <ForterraHero />
      </div>
      <InvestmentSection />
    </>
  );
}

/* ─── below is the old combined file kept for reference ─── */
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";

/* ─────────────────────────────────────────────
   SHARED TOKENS
───────────────────────────────────────────── */
const CREAM = "#E8E5D8";
const BONE  = "#F4F2EC";
const DARK  = "#0E0E0E";
const GOLD  = "#C9A96E";
const STONE = "#8A8578";

const NAV_ITEMS = ["Our Story", "EB-5 Program", "Projects", "Process", "Inquiries"];
const CYCLE_WORDS = ["Boundaries", "Expectations", "Horizons", "Standards"];

/* ─────────────────────────────────────────────
   ANIMATED WORD CYCLE
───────────────────────────────────────────── */
function WordCycle({ words }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, [words]);
  return (
    <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", minWidth: 220 }}>
      <motion.span
        key={index}
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        exit={{ y: "-110%", opacity: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: "inline-block",
          fontFamily: "'Instrument Serif', serif",
          fontStyle: "italic",
          fontSize: "inherit",
          color: GOLD,
        }}
      >
        {words[index]}
      </motion.span>
    </span>
  );
}

/* ─────────────────────────────────────────────
   ARROW ICON
───────────────────────────────────────────── */
const ArrowIcon = ({ color = CREAM, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─────────────────────────────────────────────
   SECTION LABEL
───────────────────────────────────────────── */
function SectionLabel({ children, light = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
      <div style={{ width: 32, height: 1, background: light ? "rgba(232,229,216,0.4)" : "rgba(10,10,10,0.25)" }} />
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.62rem", fontWeight: 500,
        letterSpacing: "0.26em", textTransform: "uppercase",
        color: light ? "rgba(232,229,216,0.5)" : STONE,
      }}>
        {children}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════
   HERO SECTION
═══════════════════════════════════════════ */
function ForterraHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);

  return (
    <section style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", borderRadius: 20, background: "#000", flexShrink: 0 }}>

      {/* BG image */}
      <motion.div
        initial={{ scale: 1.14, opacity: 0 }}
        animate={{ scale: 1.05, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute", inset: "-5%",
          backgroundImage: "url('https://images.unsplash.com/photo-1546436836-07a91091f160?w=1800&q=85')",
          backgroundSize: "cover", backgroundPosition: "center",
        }}
      />

      {/* Gradient */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.02) 38%, rgba(0,0,0,0.02) 52%, rgba(0,0,0,0.60) 78%, rgba(0,0,0,0.86) 100%)",
      }} />

      {/* Noise */}
      <div style={{
        position: "absolute", inset: "-50%", width: "200%", height: "200%",
        opacity: 0.45, mixBlendMode: "overlay", pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      {/* TOP-CENTER pill nav */}
      <motion.nav
        initial={{ opacity: 0, y: "-100%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: 30 }}
      >
        <div style={{
          display: "flex", alignItems: "center", gap: 28,
          background: "rgba(0,0,0,0.90)", backdropFilter: "blur(14px)",
          borderRadius: "0 0 18px 18px", padding: "10px 24px",
        }}>
          {NAV_ITEMS.map((item, i) => (
            <a key={item} href="#" style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", fontWeight: i === 0 ? 500 : 400,
              color: i === 0 ? CREAM : "rgba(232,229,216,0.68)",
              textDecoration: "none", letterSpacing: "0.02em", whiteSpace: "nowrap",
              transition: "color 0.25s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = CREAM}
            onMouseLeave={e => { if (i !== 0) e.currentTarget.style.color = "rgba(232,229,216,0.68)"; }}
            >
              {item}
            </a>
          ))}
        </div>
      </motion.nav>

      {/* TOP-LEFT eyebrow */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.55, duration: 0.6 }}
        style={{ position: "absolute", top: 22, left: 24, zIndex: 20, display: "flex", alignItems: "center", gap: 10 }}
      >
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD, flexShrink: 0 }} />
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(232,229,216,0.5)" }}>
          EB-5 Path to U.S. Residency
        </span>
      </motion.div>

      {/* TOP-RIGHT */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.65, duration: 0.6 }}
        style={{ position: "absolute", top: 22, right: 24, zIndex: 20 }}
      >
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem", fontWeight: 400, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(232,229,216,0.28)" }}>
          Texas · Real Estate · USCIS
        </span>
      </motion.div>

      {/* GIANT WORDMARK */}
      <div style={{ position: "absolute", bottom: 0, left: 0, zIndex: 20, lineHeight: 0.85, overflow: "hidden" }}>
        <motion.span
          initial={{ y: "106%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1.1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "block",
            fontFamily: "'Instrument Serif', serif",
            fontWeight: 400,
            fontSize: "clamp(18vw, 21vw, 21vw)",
            color: CREAM,
            letterSpacing: "-0.06em",
            lineHeight: 0.85,
            whiteSpace: "nowrap",
          }}
        >
          Forterra<sup style={{ fontSize: "0.2em", verticalAlign: "super", letterSpacing: 0, color: "rgba(232,229,216,0.6)" }}>*</sup>
        </motion.span>
      </div>

      {/* BOTTOM-RIGHT block */}
      <div style={{ position: "absolute", bottom: 28, right: 32, zIndex: 20, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 18, maxWidth: 420 }}>
        <motion.p
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(0.78rem,1.05vw,0.96rem)", fontWeight: 300, color: "rgba(232,229,216,0.72)", lineHeight: 1.65, letterSpacing: "0.01em" }}
        >
          Forterra Developers' premier Texas real estate investments provide a seamless and secure pathway to U.S. permanent residency through the EB-5 program. Secure your legacy. Build your future.
        </motion.p>

        <motion.a
          href="https://www.forterraeb5.com/#projects"
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ gap: 14 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: CREAM, color: DARK,
            fontFamily: "'DM Sans',sans-serif", fontSize: "0.84rem", fontWeight: 500,
            padding: "6px 6px 6px 20px", borderRadius: 999,
            textDecoration: "none", transition: "background 0.25s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#fff"}
          onMouseLeave={e => e.currentTarget.style.background = CREAM}
        >
          View Investment Projects
          <span style={{ width: 36, height: 36, borderRadius: "50%", background: DARK, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <ArrowIcon />
          </span>
        </motion.a>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   INVESTMENT SECTION
═══════════════════════════════════════════ */
function InvestmentSection() {
  const sectionRef = useRef(null);
  const imageRef   = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-10%" });
  const isImgView  = useInView(imageRef, { once: true, margin: "-8%" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const yImg  = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yText = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yCard = useTransform(scrollYProgress, [0, 1], [80, -20]);
  const smoothYImg  = useSpring(yImg,  { stiffness: 80, damping: 20 });
  const smoothYText = useSpring(yText, { stiffness: 80, damping: 20 });
  const smoothYCard = useSpring(yCard, { stiffness: 80, damping: 20 });

  // Char-reveal headline
  const headline = "Texas Refined";
  const chars = headline.split("");

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: BONE,
        padding: "9rem 4rem 9rem",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      {/* Vertical center line */}
      <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "rgba(10,10,10,0.07)", pointerEvents: "none" }} />

      {/* Faint BG monogram */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        fontFamily: "'Instrument Serif', serif",
        fontSize: "38vw", fontWeight: 400,
        color: "rgba(10,10,10,0.025)",
        letterSpacing: "-0.08em", lineHeight: 1,
        userSelect: "none", pointerEvents: "none",
        whiteSpace: "nowrap",
      }}>
        F
      </div>

      <div style={{ maxWidth: 1360, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7rem", alignItems: "start", position: "relative", zIndex: 1 }}>

        {/* ── LEFT TEXT ── */}
        <motion.div style={{ y: smoothYText }} className="left-col">

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionLabel>Exclusive Partnership</SectionLabel>

            {/* Main headline */}
            <h2 style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontSize: "clamp(3.2rem, 5.5vw, 6rem)",
              color: DARK,
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              marginBottom: "0.1em",
            }}>
              Forterra
            </h2>
            <h2 style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "clamp(2.2rem, 3.8vw, 4.2rem)",
              color: STONE,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              marginBottom: "1.6rem",
            }}>
              Developments
            </h2>

            {/* Building Beyond + cycle */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "0 14px", marginBottom: "3.5rem" }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(1rem,1.6vw,1.3rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                color: DARK,
              }}>
                Building Beyond
              </span>
              <div style={{ fontSize: "clamp(1.2rem,1.9vw,1.6rem)", overflow: "hidden", lineHeight: 1.1 }}>
                <WordCycle words={CYCLE_WORDS} />
              </div>
            </div>

            {/* Body copy */}
            <div style={{ maxWidth: 480, display: "flex", flexDirection: "column", gap: "1.6rem", marginBottom: "4rem" }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(0.95rem,1.2vw,1.1rem)",
                fontWeight: 300,
                color: DARK,
                lineHeight: 1.85,
              }}>
                In alliance with the{" "}
                <span style={{ fontWeight: 500, borderBottom: `1px solid rgba(10,10,10,0.22)` }}>
                  Statewide EB-5 Regional Center
                </span>
                , we curate institutional-grade Texas real estate for the global investor.
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.86rem", fontWeight: 300,
                color: STONE, lineHeight: 1.9, letterSpacing: "0.01em",
              }}>
                We merge architectural excellence with the EB-5 Immigrant Investor Program, transforming capital into legacy. Our projects are defined by rigorous USCIS compliance and aggressive growth benchmarks.
              </p>
            </div>

            {/* Micro stats row */}
            <div style={{
              display: "flex", gap: "3.5rem",
              paddingTop: "2.5rem",
              borderTop: "1px solid rgba(10,10,10,0.1)",
            }}>
              {[
                { label: "Asset Class",    value: "Class-A Residential" },
                { label: "Compliance",     value: "USCIS Verified" },
                { label: "Min. Investment",value: "$800K+" },
              ].map(({ label, value }) => (
                <div key={label}
                  onMouseEnter={e => e.currentTarget.querySelector(".stat-label").style.color = DARK}
                  onMouseLeave={e => e.currentTarget.querySelector(".stat-label").style.color = STONE}
                  style={{ cursor: "default" }}
                >
                  <span className="stat-label" style={{
                    display: "block",
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: "0.6rem", fontWeight: 500,
                    letterSpacing: "0.22em", textTransform: "uppercase",
                    color: STONE, marginBottom: 6,
                    transition: "color 0.25s",
                  }}>
                    {label}
                  </span>
                  <span style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "1.15rem", fontStyle: "italic", color: DARK,
                  }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT IMAGE ── */}
        <div ref={imageRef} style={{ position: "relative", display: "flex", justifyContent: "flex-end" }}>
          <motion.div style={{ y: smoothYImg, width: "91%", position: "relative" }}>

            {/* Main image */}
            <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#ddd" }}>
              <motion.img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85"
                alt="Luxury Development"
                initial={{ scale: 1.18 }}
                animate={isImgView ? { scale: 1 } : {}}
                transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(0.85)" }}
              />
              {/* inner gradient */}
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(to top, ${BONE}55 0%, transparent 50%)`,
                pointerEvents: "none",
              }} />
            </div>

            {/* Floating dark card — offset bottom-left */}
            <motion.div
              style={{ y: smoothYCard }}
              initial={{ opacity: 0, y: 60 }}
              animate={isImgView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.4 } }}
              onMouseEnter={e => { e.currentTarget.querySelector(".card-arrow").style.opacity = "1"; }}
              onMouseLeave={e => { e.currentTarget.querySelector(".card-arrow").style.opacity = "0.28"; }}
              style={{
                position: "absolute", bottom: -52, left: -52,
                background: DARK, color: CREAM,
                padding: "3rem 3rem 2.5rem",
                width: 280,
                boxShadow: "0 40px 80px -20px rgba(0,0,0,0.38)",
                cursor: "default",
              }}
            >
              {/* Gold top rule */}
              <div style={{ width: 28, height: 1, background: GOLD, marginBottom: "1.8rem" }} />

              {/* Headline char reveal */}
              <p style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "2.2rem", fontStyle: "italic",
                lineHeight: 1.05, letterSpacing: "-0.03em",
                color: CREAM, marginBottom: "1.4rem",
                overflow: "hidden",
              }}>
                <motion.span
                  initial={{ y: "105%" }}
                  animate={isImgView ? { y: 0 } : {}}
                  transition={{ delay: 0.9, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: "block" }}
                >
                  Texas <br /> Refined.
                </motion.span>
              </p>

              <p style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.62rem", fontWeight: 400,
                letterSpacing: "0.32em", textTransform: "uppercase",
                color: "rgba(232,229,216,0.4)", lineHeight: 1.8,
              }}>
                A footprint of excellence across the Lone Star State.
              </p>

              <div className="card-arrow" style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end", opacity: 0.28, transition: "opacity 0.3s" }}>
                <ArrowIcon color={CREAM} size={20} />
              </div>
            </motion.div>

            {/* Top-right label tag */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isImgView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.9 }}
              style={{
                position: "absolute", top: -14, right: -14,
                background: BONE,
                padding: "8px 16px",
                border: `1px solid rgba(10,10,10,0.08)`,
                display: "flex", alignItems: "center", gap: 8,
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: GOLD, flexShrink: 0 }} />
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.58rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: STONE }}>
                Class-A · Texas
              </span>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FULL PAGE EXPORT
═══════════════════════════════════════════ */
export default function ForterraPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0E0E0E; overflow-x: hidden; }
        ::selection { background: #C9A96E; color: #0E0E0E; }
      `}</style>

      {/* Hero — full viewport */}
      <div style={{ padding: "12px", height: "100vh" }}>
        <ForterraHero />
      </div>

      {/* Investment section — scroll into view */}
      <InvestmentSection />
    </>
  );
}