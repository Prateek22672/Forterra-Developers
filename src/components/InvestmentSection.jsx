"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { useIsMobile } from "./useIsMobile";

const BONE  = "#F4F2EC";
const DARK  = "#0E0E0E";
const GOLD  = "#C9A96E";
const STONE = "#8A8578";
const CREAM = "#E8E5D8";

const CYCLE_WORDS = ["Boundaries", "Expectations", "Horizons", "Standards"];

/* ── Arrow icon ─────────────────────────────────────────── */
const ArrowIcon = ({ color = CREAM, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Animated word cycle ─────────────────────────────────── */
function WordCycle({ words }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, [words]);

  return (
    <span style={{ display:"inline-block", overflow:"hidden", verticalAlign:"bottom", minWidth:"clamp(130px,40vw,230px)" }}>
      <motion.span
        key={index}
        initial={{ y:"110%", opacity:0 }}
        animate={{ y:"0%", opacity:1 }}
        transition={{ duration:0.65, ease:[0.16,1,0.3,1] }}
        style={{ display:"inline-block", fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontSize:"inherit", color:GOLD }}
      >
        {words[index]}
      </motion.span>
    </span>
  );
}

/* ── Section label ───────────────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
      <div style={{ width:32, height:1, background:"rgba(10,10,10,0.2)" }} />
      <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.62rem", fontWeight:500, letterSpacing:"0.26em", textTransform:"uppercase", color:STONE }}>
        {children}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */
export default function InvestmentSection() {
  const sectionRef = useRef(null);
  const imageRef   = useRef(null);
  const isMobile   = useIsMobile(768);

  const isInView  = useInView(sectionRef, { once:true, margin:"-8%"  });
  const isImgView = useInView(imageRef,   { once:true, margin:"-8%"  });

  /* Parallax — disabled on mobile (performance + layout) */
  const { scrollYProgress } = useScroll({ target:sectionRef, offset:["start end","end start"] });
  const yImgRaw  = useTransform(scrollYProgress, [0,1], isMobile ? [0,0] : [60,-60]);
  const yTextRaw = useTransform(scrollYProgress, [0,1], isMobile ? [0,0] : [30,-30]);
  const yCardRaw = useTransform(scrollYProgress, [0,1], isMobile ? [0,0] : [80,-20]);
  const smoothYImg  = useSpring(yImgRaw,  { stiffness:80, damping:20 });
  const smoothYText = useSpring(yTextRaw, { stiffness:80, damping:20 });
  const smoothYCard = useSpring(yCardRaw, { stiffness:80, damping:20 });

  const stats = [
    { label:"Asset Class",     value:"Class-A Residential" },
    { label:"Compliance",      value:"USCIS Verified"      },
    { label:"Min. Investment", value:"$800K+"              },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
        .inv-stat:hover .inv-stat-label { color: ${DARK} !important; }
        .card-arrow { transition: opacity 0.3s; }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          position: "relative",
          background: BONE,
          padding: isMobile ? "4rem 1.25rem 5rem" : "9rem 4rem 11rem",
          overflow: "hidden",
        }}
      >
        {/* Vertical centre rule — desktop only */}
        {!isMobile && (
          <div style={{ position:"absolute", left:"50%", top:0, bottom:0, width:1, background:"rgba(10,10,10,0.06)", pointerEvents:"none" }} />
        )}

        {/* Faint BG monogram */}
        <div style={{
          position:"absolute", top:"50%", left:"50%",
          transform:"translate(-50%,-50%)",
          fontFamily:"'Instrument Serif',serif",
          fontSize: isMobile ? "70vw" : "38vw",
          fontWeight:400, color:"rgba(10,10,10,0.022)",
          letterSpacing:"-0.08em", lineHeight:1,
          userSelect:"none", pointerEvents:"none", whiteSpace:"nowrap",
        }}>F</div>

        {/* ════════════════════════════
            DESKTOP — side by side
        ════════════════════════════ */}
        {!isMobile && (
          <div style={{
            maxWidth:1360, margin:"0 auto",
            display:"grid", gridTemplateColumns:"1fr 1fr", gap:"7rem",
            alignItems:"start", position:"relative", zIndex:1,
          }}>

            {/* Left text */}
            <motion.div style={{ y:smoothYText }}>
              <motion.div
                initial={{ opacity:0, x:-24 }}
                animate={isInView ? { opacity:1, x:0 } : {}}
                transition={{ duration:1.4, ease:[0.16,1,0.3,1] }}
              >
                <SectionLabel>Exclusive Partnership</SectionLabel>

                <h2 style={{ fontFamily:"'Instrument Serif',serif", fontWeight:400, fontSize:"clamp(3.2rem,5.5vw,6rem)", color:DARK, lineHeight:0.92, letterSpacing:"-0.04em", marginBottom:"0.08em" }}>
                  Forterra
                </h2>
                <h2 style={{ fontFamily:"'Instrument Serif',serif", fontWeight:300, fontStyle:"italic", fontSize:"clamp(2.2rem,3.8vw,4.2rem)", color:STONE, lineHeight:1, letterSpacing:"-0.03em", marginBottom:"1.6rem" }}>
                  Developments
                </h2>

                <div style={{ display:"flex", flexWrap:"wrap", alignItems:"baseline", gap:"0 14px", marginBottom:"3.5rem" }}>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(1rem,1.6vw,1.3rem)", fontWeight:300, letterSpacing:"-0.02em", textTransform:"uppercase", color:DARK }}>
                    Building Beyond
                  </span>
                  <div style={{ fontSize:"clamp(1.2rem,1.9vw,1.6rem)", overflow:"hidden", lineHeight:1.1 }}>
                    <WordCycle words={CYCLE_WORDS} />
                  </div>
                </div>

                <div style={{ maxWidth:480, display:"flex", flexDirection:"column", gap:"1.6rem", marginBottom:"4rem" }}>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(0.95rem,1.2vw,1.1rem)", fontWeight:300, color:DARK, lineHeight:1.85 }}>
                    In alliance with the{" "}
                    <span style={{ fontWeight:500, borderBottom:`1px solid rgba(10,10,10,0.22)` }}>Statewide EB-5 Regional Center</span>
                    , we curate institutional-grade Texas real estate for the global investor.
                  </p>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.86rem", fontWeight:300, color:STONE, lineHeight:1.9, letterSpacing:"0.01em" }}>
                    We merge architectural excellence with the EB-5 Immigrant Investor Program, transforming capital into legacy. Our projects are defined by rigorous USCIS compliance and aggressive growth benchmarks.
                  </p>
                </div>

                {/* Stats */}
                <div style={{ display:"flex", gap:"3.5rem", paddingTop:"2.5rem", borderTop:`1px solid rgba(10,10,10,0.1)` }}>
                  {stats.map(({ label, value }) => (
                    <div key={label} className="inv-stat" style={{ cursor:"default" }}>
                      <span className="inv-stat-label" style={{ display:"block", fontFamily:"'DM Sans',sans-serif", fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.22em", textTransform:"uppercase", color:STONE, marginBottom:6, transition:"color 0.25s" }}>
                        {label}
                      </span>
                      <span style={{ fontFamily:"'Instrument Serif',serif", fontSize:"1.15rem", fontStyle:"italic", color:DARK }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right image */}
            <div ref={imageRef} style={{ position:"relative", display:"flex", justifyContent:"flex-end" }}>
              <motion.div style={{ y:smoothYImg, width:"91%", position:"relative" }}>

                <div style={{ position:"relative", aspectRatio:"3/4", overflow:"hidden", background:"#ddd" }}>
                  <motion.img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85"
                    alt="Luxury Development"
                    initial={{ scale:1.18 }}
                    animate={isImgView ? { scale:1 } : {}}
                    transition={{ duration:2.2, ease:[0.16,1,0.3,1] }}
                    style={{ width:"100%", height:"100%", objectFit:"cover", borderRadius:8, filter:"saturate(0.85)" }}
                  />
                  <div style={{ position:"absolute", inset:0, background:`linear-gradient(to top, ${BONE}55 0%, transparent 50%)`, pointerEvents:"none" }} />
                </div>

                {/* Floating dark card */}
                <motion.div
                  style={{ y:smoothYCard, position:"absolute", bottom:-52, left:-52 }}
                  initial={{ opacity:0, y:60 }}
                  animate={isImgView ? { opacity:1, y:0 } : {}}
                  transition={{ delay:0.55, duration:1.3, ease:[0.16,1,0.3,1] }}
                  whileHover={{ y:-6, transition:{ duration:0.4 } }}
                  onMouseEnter={e => { const a = e.currentTarget.querySelector(".card-arrow"); if(a) a.style.opacity="1"; }}
                  onMouseLeave={e => { const a = e.currentTarget.querySelector(".card-arrow"); if(a) a.style.opacity="0.28"; }}
                >
                  <div style={{ background:DARK, color:CREAM, padding:"3rem 3rem 2.5rem", width:280, boxShadow:"0 40px 80px -20px rgba(0,0,0,0.38)", cursor:"default" }}>
                    <div style={{ width:28, height:1, background:GOLD, marginBottom:"1.8rem" }} />
                    <p style={{ fontFamily:"'Instrument Serif',serif", fontSize:"2.2rem", fontStyle:"italic", lineHeight:1.05, letterSpacing:"-0.03em", color:CREAM, marginBottom:"1.4rem", overflow:"hidden" }}>
                      <motion.span
                        initial={{ y:"105%" }}
                        animate={isImgView ? { y:0 } : {}}
                        transition={{ delay:0.9, duration:0.9, ease:[0.16,1,0.3,1] }}
                        style={{ display:"block" }}
                      >
                        Texas <br /> Refined.
                      </motion.span>
                    </p>
                    <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.62rem", fontWeight:400, letterSpacing:"0.32em", textTransform:"uppercase", color:"rgba(232,229,216,0.4)", lineHeight:1.8 }}>
                      A footprint of excellence across the Lone Star State.
                    </p>
                    <div className="card-arrow" style={{ marginTop:"2rem", display:"flex", justifyContent:"flex-end", opacity:0.28 }}>
                      <ArrowIcon color={CREAM} size={20} />
                    </div>
                  </div>
                </motion.div>

                {/* Top-right label tag */}
                <motion.div
                  initial={{ opacity:0, x:20 }}
                  animate={isImgView ? { opacity:1, x:0 } : {}}
                  transition={{ delay:0.4, duration:0.9 }}
                  style={{ position:"absolute", top:-14, right:-14, background:BONE, padding:"8px 16px", border:`1px solid rgba(10,10,10,0.08)`, display:"flex", alignItems:"center", gap:8 }}
                >
                  <span style={{ width:5, height:5, borderRadius:"50%", background:GOLD, flexShrink:0 }} />
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.58rem", fontWeight:500, letterSpacing:"0.2em", textTransform:"uppercase", color:STONE }}>Class-A · Texas</span>
                </motion.div>

              </motion.div>
            </div>
          </div>
        )}

        {/* ════════════════════════════
            MOBILE — stacked
        ════════════════════════════ */}
        {isMobile && (
          <div style={{ position:"relative", zIndex:1 }}>

            {/* ── Text block ── */}
            <motion.div
              initial={{ opacity:0, y:28 }}
              animate={isInView ? { opacity:1, y:0 } : {}}
              transition={{ duration:1, ease:[0.16,1,0.3,1] }}
              style={{ marginBottom:"3rem" }}
            >
              <SectionLabel>Exclusive Partnership</SectionLabel>

              {/* Headline */}
              <div style={{ marginBottom:"1.4rem" }}>
                <h2 style={{ fontFamily:"'Instrument Serif',serif", fontWeight:400, fontSize:"clamp(2.8rem,10vw,3.6rem)", color:DARK, lineHeight:0.9, letterSpacing:"-0.04em" }}>
                  Forterra
                </h2>
                <h2 style={{ fontFamily:"'Instrument Serif',serif", fontWeight:300, fontStyle:"italic", fontSize:"clamp(1.9rem,7vw,2.5rem)", color:STONE, lineHeight:1.05, letterSpacing:"-0.03em" }}>
                  Developments
                </h2>
              </div>

              {/* Building Beyond + cycle */}
              <div style={{ display:"flex", flexWrap:"wrap", alignItems:"baseline", gap:"0 10px", marginBottom:"2rem" }}>
                <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.95rem", fontWeight:300, letterSpacing:"-0.01em", textTransform:"uppercase", color:DARK }}>
                  Building Beyond
                </span>
                <div style={{ fontSize:"1.1rem", overflow:"hidden", lineHeight:1.2 }}>
                  <WordCycle words={CYCLE_WORDS} />
                </div>
              </div>

              {/* Body */}
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.94rem", fontWeight:300, color:DARK, lineHeight:1.85, marginBottom:"1rem" }}>
                In alliance with the{" "}
                <span style={{ fontWeight:500, borderBottom:`1px solid rgba(10,10,10,0.22)` }}>Statewide EB-5 Regional Center</span>
                , we curate institutional-grade Texas real estate for the global investor.
              </p>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.84rem", fontWeight:300, color:STONE, lineHeight:1.9 }}>
                We merge architectural excellence with the EB-5 Immigrant Investor Program, transforming capital into legacy. Rigorous USCIS compliance. Aggressive growth benchmarks.
              </p>
            </motion.div>

            {/* ── Image ── */}
            <div ref={imageRef} style={{ position:"relative", marginBottom:"3rem" }}>
              <motion.div
                initial={{ opacity:0, y:30 }}
                animate={isImgView ? { opacity:1, y:0 } : {}}
                transition={{ duration:1.1, ease:[0.16,1,0.3,1] }}
              >
                {/* Main image — 4:3 on mobile, not 3:4 */}
                <div style={{ position:"relative", aspectRatio:"4/3", overflow:"hidden", background:"#ddd" }}>
                  <motion.img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85"
                    alt="Luxury Development"
                    initial={{ scale:1.12 }}
                    animate={isImgView ? { scale:1 } : {}}
                    transition={{ duration:2, ease:[0.16,1,0.3,1] }}
                    style={{ width:"100%", height:"100%", objectFit:"cover", borderRadius:20, filter:"saturate(0.85)" }}
                  />
                  <div style={{ position:"absolute", inset:0, background:`linear-gradient(to top, ${BONE}66 0%, transparent 55%)`, pointerEvents:"none" }} />

                  {/* EB-5 tag — top right of image */}
                  <motion.div
                    initial={{ opacity:0, x:12 }}
                    animate={isImgView ? { opacity:1, x:0 } : {}}
                    transition={{ delay:0.3, duration:0.8 }}
                    style={{ position:"absolute", top:12, right:12, background:BONE, padding:"6px 12px", border:`1px solid rgba(10,10,10,0.08)`, display:"flex", alignItems:"center", gap:6 }}
                  >
                    <span style={{ width:4, height:4, borderRadius:"50%", background:GOLD, flexShrink:0 }} />
                    <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.55rem", fontWeight:500, letterSpacing:"0.18em", textTransform:"uppercase", color:STONE }}>Class-A · Texas</span>
                  </motion.div>
                </div>

                {/* Dark card — inline below image on mobile, not overlapping */}
                <motion.div
                  initial={{ opacity:0, y:24 }}
                  animate={isImgView ? { opacity:1, y:0 } : {}}
                  transition={{ delay:0.4, duration:1, ease:[0.16,1,0.3,1] }}
                  style={{ background:DARK, padding:"2rem 2rem 1.8rem", borderRadius:20, boxShadow:"0 20px 50px -12px rgba(0,0,0,0.28)" }}
                >
                  <div style={{ width:22, height:1, background:GOLD, marginBottom:"1.2rem" }} />
                  <p style={{ fontFamily:"'Instrument Serif',serif", borderRadius:20, fontStyle:"italic", fontSize:"1.7rem", lineHeight:1.05, letterSpacing:"-0.03em", color:CREAM, marginBottom:"0.9rem" }}>
                    Texas <br /> Refined.
                  </p>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.6rem", fontWeight:400, letterSpacing:"0.28em", textTransform:"uppercase", color:"rgba(232,229,216,0.38)", lineHeight:1.7 }}>
                    A footprint of excellence across the Lone Star State.
                  </p>
                </motion.div>
              </motion.div>
            </div>

            {/* ── Stats row ── */}
            <motion.div
              initial={{ opacity:0, y:20 }}
              animate={isInView ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.9, ease:[0.16,1,0.3,1], delay:0.2 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "1px",
                background: "rgba(10,10,10,0.08)",
                border: "1px solid rgba(10,10,10,0.08)",
              }}
            >
              {stats.map(({ label, value }) => (
                <div key={label} style={{ background:BONE, padding:"1.2rem 1rem", textAlign:"center" }}>
                  <span style={{ display:"block", fontFamily:"'DM Sans',sans-serif", fontSize:"0.55rem", fontWeight:500, letterSpacing:"0.18em", textTransform:"uppercase", color:STONE, marginBottom:6 }}>
                    {label}
                  </span>
                  <span style={{ fontFamily:"'Instrument Serif',serif", fontSize:"1rem", fontStyle:"italic", color:DARK }}>
                    {value}
                  </span>
                </div>
              ))}
            </motion.div>

          </div>
        )}
      </section>
    </>
  );
}