"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "./useIsMobile";

const DARK  = "#0E0E0E";
const GOLD  = "#C9A96E";
const STONE = "#8A8578";
const CREAM = "#E8E5D8";

const BENEFITS = [
  { n:"01", title:"Permanent Residency",  desc:"U.S. green cards for the investor, spouse, and children under the age of 21.", icon:"🏛" },
  { n:"02", title:"No Visa Sponsorship",  desc:"Investors do not require a job offer or family sponsorship to qualify.", icon:"🗽" },
  { n:"03", title:"Live, Work, Study",    desc:"The flexibility to live, work, or retire anywhere in the United States without restrictions.", icon:"🌎" },
  { n:"04", title:"Capital Security",     desc:"Secure your capital in strong, high-growth EB-5 real estate projects in Texas.", icon:"🏗" },
];

function BenefitCard({ n, title, desc, icon, index, inView, isMobile }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      initial={{ opacity:0, x: isMobile ? 0 : 30, y: isMobile ? 24 : 0 }}
      animate={inView ? { opacity:1, x:0, y:0 } : {}}
      transition={{ duration:0.9, ease:[0.16,1,0.3,1], delay:index * 0.1 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: isMobile ? "2rem 1.5rem" : "3rem 2.8rem",
        background: hover ? "rgba(200,169,110,0.06)" : "rgba(255,255,255,0.02)",
        borderLeft:`2px solid ${hover ? GOLD : "transparent"}`,
        transition:"all 0.35s",
        cursor:"default",
      }}
    >
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1.2rem" }}>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.58rem", fontWeight:600, letterSpacing:"0.2em", color: hover ? GOLD : "rgba(200,169,110,0.45)", transition:"color 0.3s" }}>{n}</span>
          <h3 style={{ fontFamily:"'Instrument Serif',serif", fontWeight:400, fontSize: isMobile ? "1.25rem" : "clamp(1.2rem,1.8vw,1.55rem)", color:CREAM, letterSpacing:"-0.02em" }}>{title}</h3>
        </div>
        <span style={{ fontSize:"1.3rem", opacity: hover ? 1 : 0.4, transition:"opacity 0.3s" }}>{icon}</span>
      </div>
      <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.88rem", fontWeight:300, color:"rgba(232,229,216,0.5)", lineHeight:1.8 }}>{desc}</p>
    </motion.div>
  );
}

export default function BenefitsSection() {
  const ref    = useRef(null);
  const imgRef = useRef(null);
  const inView    = useInView(ref,    { once:true, margin:"-10%" });
  const isImgView = useInView(imgRef, { once:true, margin:"-10%" });
  const isMobile  = useIsMobile();

  return (
    <section ref={ref} id="benefits" style={{ position:"relative", background:DARK, padding: isMobile ? "5rem 1.25rem" : "9rem 4rem", overflow:"hidden" }}>

      {/* dot-grid bg */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle, rgba(200,169,110,0.07) 1px, transparent 1px)", backgroundSize:"40px 40px", pointerEvents:"none" }} />

      {/* gold top rule */}
      <motion.div
        initial={{ scaleX:0 }} animate={inView ? { scaleX:1 } : {}}
        transition={{ duration:1.1, ease:[0.16,1,0.3,1] }}
        style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${GOLD},transparent)`, transformOrigin:"left" }}
      />

      <div style={{ maxWidth:1360, margin:"0 auto" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:24 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.9, ease:[0.16,1,0.3,1] }}
          style={{ marginBottom: isMobile ? "2.5rem" : "4rem" }}
        >
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20, borderRadius:20 }}>
            <div style={{ width:32, height:1, background:GOLD }} />
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.62rem", fontWeight:500, letterSpacing:"0.26em", textTransform:"uppercase", color:GOLD }}>Investment Benefits</span>
          </div>
          <h2 style={{ fontFamily:"'Instrument Serif',serif", fontWeight:400, fontSize: isMobile ? "clamp(2.2rem,8vw,3rem)" : "clamp(2.5rem,4.5vw,5rem)", color:CREAM, letterSpacing:"-0.04em", lineHeight:0.95, marginBottom:"1rem" }}>
            More Than Just<br/><span style={{ fontStyle:"italic" }}>Financial Returns</span>
          </h2>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.95rem", fontWeight:300, color:"rgba(232,229,216,0.52)", lineHeight:1.8, maxWidth:480 }}>
            The EB-5 Program offers a unique opportunity to secure your family's future in the United States while investing in high-quality real estate.
          </p>
        </motion.div>

        {/* Two-col desktop, stacked mobile */}
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "0" : "5rem", alignItems:"start" }}>

          {/* Benefit cards */}
          <div style={{ display:"flex", flexDirection:"column", gap:"1px", background:"rgba(255,255,255,0.05)" }}>
            {BENEFITS.map(({ n, title, desc, icon }, i) => (
              <BenefitCard key={n} n={n} title={title} desc={desc} icon={icon} index={i} inView={inView} isMobile={isMobile} />
            ))}
          </div>

          {/* Decorative image — desktop only (below on mobile) */}
          <div 
            ref={imgRef} 
            style={{ 
              position:"relative", 
              aspectRatio:"4/3", 
              overflow:"hidden", 
              marginTop: isMobile ? "2.5rem" : 0,
              borderRadius: 20 // Parent container rounded
            }}
          >
            <motion.img
              src="/benfits.png"
              alt="Texas luxury real estate"
              initial={{ scale:1.18 }}
              animate={isImgView ? { scale:1 } : {}}
              transition={{ duration:2.2, ease:[0.16,1,0.3,1] }}
              style={{ 
                width:"100%", 
                height:"100%", 
                objectFit:"cover", 
                filter:"saturate(0.8)", 
                borderRadius:20, 
                pointerEvents:"none", 
                userSelect:"none" 
              }}
            />
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(14,14,14,0.6) 0%, transparent 55%)", pointerEvents:"none", borderRadius: 20 }} />
            <div style={{ position:"absolute", bottom:20, left:20 }}>
              <p style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontSize:"1.1rem", color:CREAM }}>Texas · Class-A · 2026</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}