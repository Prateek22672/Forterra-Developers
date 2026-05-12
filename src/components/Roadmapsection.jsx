"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useIsMobile } from "./useIsMobile";

const BONE  = "#F4F2EC";
const DARK  = "#0E0E0E";
const GOLD  = "#C9A96E";
const STONE = "#8A8578";
const CREAM = "#E8E5D8";

const steps = [
  { n:"01", time:"6–8 Weeks",     label:"Confirm Eligibility",         desc:"Initial assessment of investor credentials and financial readiness to ensure full alignment with USCIS program requirements.",         img:"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&q=80" },
  { n:"02", time:"",              label:"Select Investment Type",       desc:"Evaluation of investment structures — choosing between a Direct Investment or a USCIS-designated Regional Center model that best fits your goals.",     img:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=700&q=80" },
  { n:"03", time:"",              label:"Select EB-5 Project",          desc:"Identification of high-growth real estate assets in Targeted Employment Areas (TEA) with strong job creation potential and Forterra's expert guidance.", img:"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&q=80" },
  { n:"04", time:"12–18+ Months", label:"Prepare Investor Documents",   desc:"A comprehensive gathering of source-of-funds documentation and personal financial history for immigration attorney review and USCIS compliance.",      img:"https://images.unsplash.com/photo-1568667256549-094345857637?w=700&q=80" },
  { n:"05", time:"",              label:"Subscribe to the Partnership", desc:"Formally executing subscription agreements and the joinder to the limited partnership associated with the selected Forterra development project.",     img:"https://images.unsplash.com/photo-1521791136064-7986c2920216?w=700&q=80" },
  { n:"06", time:"",              label:"Invest Capital",               desc:"Execution of the $800,000 USD investment plus administrative fees, transferred into a secure corporate escrow or project's designated account.",         img:"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=700&q=80" },
  { n:"07", time:"",              label:"Submit Form I-526E",           desc:"Filing of the conditional immigrant investor petition with USCIS, documenting project eligibility, job creation commitments, and lawful source of capital.", img:"https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=700&q=80" },
  { n:"08", time:"~2 Years",      label:"Green Card Issued",            desc:"Upon petition approval, the investor and qualifying family members receive conditional permanent residency — freedom to live and work in the U.S.",       img:"https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=700&q=80" },
  { n:"09", time:"~3 Years",      label:"Submit Form I-829",            desc:"Final USCIS petition to permanently remove conditions on residency, demonstrating all investment and job creation requirements have been fully satisfied.", img:"https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=700&q=80" },
  { n:"10", time:"Final Goal",    label:"Apply for Citizenship",        desc:"With permanent residency secured, investors become eligible to apply for full U.S. naturalization and citizenship after five years of continuous residence.", img:"https://images.unsplash.com/photo-1618044733300-9472054094ee?w=700&q=80" },
];

/* ═══════════════════════════════════════════════════
   MOBILE — state-driven card switcher (no scroll bugs)
═══════════════════════════════════════════════════ */
function MobileRoadmap() {
  const [active, setActive]   = useState(0);
  const [dir,    setDir]      = useState(1);   // 1 = forward, -1 = backward
  const [playing, setPlaying] = useState(false);
  const timerRef              = useRef(null);

  const go = (i) => {
    if (i === active) return;
    setDir(i > active ? 1 : -1);
    setActive(i);
  };

  const prev = () => { if (active > 0)                 go(active - 1); };
  const next = () => { if (active < steps.length - 1)  go(active + 1); };

  /* auto-play */
  useEffect(() => {
    clearInterval(timerRef.current);
    if (playing) {
      timerRef.current = setInterval(() => {
        setActive(a => {
          const n = a < steps.length - 1 ? a + 1 : 0;
          setDir(n > a ? 1 : -1);
          return n;
        });
      }, 3000);
    }
    return () => clearInterval(timerRef.current);
  }, [playing]);

  const step    = steps[active];
  const isFinal = step.n === "10";

  const circleBase = {
    width: 38, height: 38, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", flexShrink: 0,
    WebkitTapHighlightColor: "transparent",
    transition: "all 0.2s",
  };

  return (
    <div>
      {/* ── Single card with animated swap ── */}
      <div style={{
        position: "relative",
        background: "#fff",
        border: "1px solid rgba(14,14,14,0.07)",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(14,14,14,0.07)",
      }}>

        {/* Image */}
        <div style={{ position:"relative", width:"100%", aspectRatio:"16/9", overflow:"hidden", background:"#e8e4db" }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={`img-${active}`}
              src={step.img}
              alt={step.label}
              initial={{ opacity:0, x: dir * 40 }}
              animate={{ opacity:1, x:0 }}
              exit={{ opacity:0, x: dir * -40 }}
              transition={{ duration:0.4, ease:[0.16,1,0.3,1] }}
              style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", filter:"saturate(0.88)" }}
            />
          </AnimatePresence>
          {/* fade into card */}
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,transparent 55%,rgba(255,255,255,0.6) 100%)", pointerEvents:"none" }} />
        </div>

        {/* Card body */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`body-${active}`}
            initial={{ opacity:0, x: dir * 30 }}
            animate={{ opacity:1, x:0 }}
            exit={{ opacity:0, x: dir * -30 }}
            transition={{ duration:0.38, ease:[0.16,1,0.3,1] }}
            style={{ padding:"1.5rem 1.5rem 1.4rem" }}
          >
            {/* Step circle */}
            <div style={{
              width:40, height:40, borderRadius:"50%",
              border:"1px solid rgba(14,14,14,0.18)",
              display:"flex", alignItems:"center", justifyContent:"center",
              marginBottom:"0.8rem",
            }}>
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.75rem", fontWeight:400, color:STONE }}>{step.n}</span>
            </div>

            {/* STEP 07 */}
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.58rem", fontWeight:600, letterSpacing:"0.22em", textTransform:"uppercase", color:STONE, marginBottom:"0.4rem" }}>
              Step {step.n}
            </p>

            {/* Time badge */}
            {step.time && (
              <span style={{ display:"inline-block", fontFamily:"'DM Sans',sans-serif", fontSize:"0.55rem", fontWeight:600, letterSpacing:"0.16em", textTransform:"uppercase", background: isFinal ? GOLD : DARK, color: isFinal ? DARK : CREAM, padding:"3px 10px", borderRadius:999, marginBottom:"0.75rem" }}>
                {step.time}
              </span>
            )}

            {/* Title */}
            <h3 style={{ fontFamily:"'Instrument Serif',serif", fontWeight:400, fontSize:"clamp(1.3rem,5vw,1.6rem)", color:DARK, letterSpacing:"-0.03em", lineHeight:1.1, marginBottom:"0.7rem", marginTop: step.time ? 0 : "0.5rem" }}>
              {step.label}
            </h3>

            {/* Description */}
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.83rem", fontWeight:300, color:STONE, lineHeight:1.78 }}>
              {step.desc}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* ── Controls ── */}
        <div style={{
          padding:"1rem 1.5rem 1.5rem",
          borderTop:"1px solid rgba(14,14,14,0.07)",
          display:"flex", flexDirection:"column", alignItems:"center", gap:10,
        }}>
          {/* Counter */}
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.7rem", fontWeight:400, letterSpacing:"0.1em", color:"rgba(14,14,14,0.35)" }}>
            {String(active+1).padStart(2,"0")} / {String(steps.length).padStart(2,"0")}
          </span>

          {/* ‹  ⏸/▶  › */}
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>

            {/* Prev */}
            <button
              onClick={prev}
              aria-label="Previous"
              style={{
                ...circleBase,
                border: `1px solid ${active === 0 ? "rgba(14,14,14,0.08)" : "rgba(14,14,14,0.2)"}`,
                background: "transparent",
                opacity: active === 0 ? 0.4 : 1,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8l4-4" stroke={DARK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Play / Pause — filled dark, slightly larger */}
            <button
              onClick={() => setPlaying(p => !p)}
              aria-label={playing ? "Pause" : "Play"}
              style={{ ...circleBase, width:44, height:44, background:DARK, border:`1px solid ${DARK}` }}
            >
              {playing ? (
                <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
                  <rect x="1" y="0.5" width="3" height="12" rx="1" fill={CREAM}/>
                  <rect x="7" y="0.5" width="3" height="12" rx="1" fill={CREAM}/>
                </svg>
              ) : (
                <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
                  <path d="M1.5 1.2l8.5 5-8.5 5.3V1.2z" fill={CREAM}/>
                </svg>
              )}
            </button>

            {/* Next */}
            <button
              onClick={next}
              aria-label="Next"
              style={{
                ...circleBase,
                border: `1px solid ${active === steps.length-1 ? "rgba(14,14,14,0.08)" : "rgba(14,14,14,0.2)"}`,
                background: "transparent",
                opacity: active === steps.length-1 ? 0.4 : 1,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke={DARK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

          </div>
        </div>
      </div>

      {/* Dot indicators below card */}
      <div style={{ display:"flex", justifyContent:"center", gap:6, marginTop:"1.2rem" }}>
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            style={{
              width: i === active ? 20 : 5, height:5, borderRadius:999,
              background: i === active ? DARK : "rgba(14,14,14,0.14)",
              border:"none", cursor:"pointer", padding:0,
              transition:"all 0.28s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   DESKTOP — alternating left/right timeline
═══════════════════════════════════════════════════ */
function StepCard({ step, align }) {
  return (
    <div style={{ textAlign: align === "right" ? "right" : "left" }}>
      {step.time && (
        <div style={{ display:"inline-flex", background: step.n==="10"?GOLD:DARK, color: step.n==="10"?DARK:CREAM, fontFamily:"'DM Sans',sans-serif", fontSize:"0.58rem", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", padding:"5px 12px", borderRadius:999, marginBottom:10 }}>
          {step.time}
        </div>
      )}
      <h3 style={{ fontFamily:"'Instrument Serif',serif", fontWeight:400, fontSize:"clamp(1.3rem,2.2vw,1.9rem)", color:DARK, letterSpacing:"-0.03em", lineHeight:1.1, marginBottom:"0.6rem" }}>
        {step.label}
      </h3>
      <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.87rem", fontWeight:300, color:STONE, lineHeight:1.8, maxWidth:360, marginLeft: align==="right"?"auto":0 }}>
        {step.desc}
      </p>
    </div>
  );
}

function DesktopStep({ step, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-12%" });
  const isEven = index % 2 === 0;
  return (
    <div ref={ref} style={{ display:"grid", gridTemplateColumns:"1fr 60px 1fr", alignItems:"start" }}>
      <motion.div initial={{ opacity:0, x:isEven?-40:0 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.9, ease:[0.16,1,0.3,1], delay:index*0.04 }} style={{ padding:"0 3rem 3.5rem 0", textAlign:"right" }}>
        {isEven ? <StepCard step={step} align="right" /> : <div />}
      </motion.div>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
        <motion.div initial={{ scale:0, opacity:0 }} animate={inView?{scale:1,opacity:1}:{}} transition={{ duration:0.5, delay:index*0.04+0.15 }} style={{ width:40, height:40, borderRadius:"50%", background:step.n==="10"?GOLD:DARK, border:`2px solid ${step.n==="10"?GOLD:"rgba(14,14,14,0.15)"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, zIndex:1 }}>
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.58rem", fontWeight:600, color:step.n==="10"?DARK:CREAM, letterSpacing:"0.05em" }}>{step.n}</span>
        </motion.div>
        {index < steps.length-1 && (
          <motion.div initial={{ scaleY:0 }} animate={inView?{scaleY:1}:{}} transition={{ duration:0.6, delay:index*0.04+0.25 }} style={{ width:1, flexGrow:1, background:`linear-gradient(to bottom,${DARK},rgba(14,14,14,0.12))`, transformOrigin:"top", minHeight:60 }} />
        )}
      </div>
      <motion.div initial={{ opacity:0, x:!isEven?40:0 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.9, ease:[0.16,1,0.3,1], delay:index*0.04 }} style={{ padding:"0 0 3.5rem 3rem" }}>
        {!isEven ? <StepCard step={step} align="left" /> : <div />}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   EXPORT
═══════════════════════════════════════════════════ */
export default function RoadmapSection() {
  const ref      = useRef(null);
  const inView   = useInView(ref, { once:true, margin:"-10%" });
  const isMobile = useIsMobile();

  return (
    <section ref={ref} id="journey" style={{ position:"relative", background:BONE, padding:isMobile?"4.5rem 1.25rem 5rem":"9rem 4rem", overflow:"hidden" }}>
      {!isMobile && (
        <div style={{ position:"absolute", bottom:"-5%", right:"-2%", fontFamily:"'Instrument Serif',serif", fontSize:"28vw", fontWeight:400, color:"rgba(14,14,14,0.028)", letterSpacing:"-0.08em", lineHeight:1, userSelect:"none", pointerEvents:"none" }}>Journey</div>
      )}
      <div style={{ maxWidth:isMobile?"100%":1200, margin:"0 auto" }}>
        <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:1, ease:[0.16,1,0.3,1] }} style={{ marginBottom:isMobile?"2rem":"6rem" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
            <div style={{ width:32, height:1, background:GOLD }} />
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.62rem", fontWeight:500, letterSpacing:"0.26em", textTransform:"uppercase", color:GOLD }}>Roadmap to Residency</span>
          </div>
          <h2 style={{ fontFamily:"'Instrument Serif',serif", fontWeight:400, fontSize:isMobile?"clamp(2.4rem,9vw,3.2rem)":"clamp(2.8rem,5vw,5.5rem)", color:DARK, letterSpacing:"-0.04em", lineHeight:0.95 }}>
            The Investor{" "}<span style={{ fontStyle:"italic", color:STONE }}>Journey</span>
          </h2>
          {isMobile && (
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.82rem", fontWeight:300, color:STONE, lineHeight:1.7, marginTop:"0.6rem" }}>
              10 steps from eligibility to full U.S. citizenship.
            </p>
          )}
        </motion.div>
        {isMobile
          ? <MobileRoadmap />
          : steps.map((step,i) => <DesktopStep key={step.n} step={step} index={i} />)
        }
      </div>
    </section>
  );
}