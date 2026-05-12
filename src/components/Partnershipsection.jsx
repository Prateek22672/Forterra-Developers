"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useIsMobile } from "./useIsMobile";

const BONE  = "#F4F2EC";
const DARK  = "#0E0E0E";
const GOLD  = "#C9A96E";
const STONE = "#8A8578";
const CREAM = "#E8E5D8";

export default function PartnershipSection() {
  const ref    = useRef(null);
  const imgRef = useRef(null);
  const inView = useInView(ref,    { once:true, margin:"-10%" });
  const isImg  = useInView(imgRef, { once:true, margin:"-8%"  });
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({ target:ref, offset:["start end","end start"] });
  const yRaw = useTransform(scrollYProgress, [0,1], isMobile ? [0,0] : [80,-80]);
  const y    = useSpring(yRaw, { stiffness:80, damping:20 });

  return (
    <section 
      ref={ref} 
      id="about" 
      style={{ 
        position:"relative", 
        background:BONE, 
        overflow:"hidden",
        borderBottomLeftRadius: 20, // Rounded bottom left
        borderBottomRightRadius: 20  // Rounded bottom right
      }}
    >

      <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", minHeight: isMobile ? "auto" : "90vh" }}>

        {/* TEXT */}
        <motion.div
          initial={{ opacity:0, x: isMobile ? 0 : -30, y: isMobile ? 24 : 0 }}
          animate={inView ? { opacity:1, x:0, y:0 } : {}}
          transition={{ duration:1.1, ease:[0.16,1,0.3,1] }}
          style={{ padding: isMobile ? "5rem 1.25rem" : "9rem 5rem 9rem 4rem", display:"flex", flexDirection:"column", justifyContent:"center" }}
        >
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
            <div style={{ width:32, height:1, background:GOLD }} />
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.62rem", fontWeight:500, letterSpacing:"0.26em", textTransform:"uppercase", color:GOLD }}>Forterra + Statewide EB-5</span>
          </div>

          <h2 style={{ fontFamily:"'Instrument Serif',serif", fontWeight:400, fontSize: isMobile ? "clamp(2.2rem,8vw,3rem)" : "clamp(2.8rem,5vw,5.5rem)", color:DARK, letterSpacing:"-0.04em", lineHeight:0.95, marginBottom:"2rem" }}>
            Meet your pathway<br/><span style={{ fontStyle:"italic", color:STONE }}>to U.S. residency.</span>
          </h2>

          <div style={{ display:"flex", gap:16, alignItems:"flex-start", marginBottom:"2.5rem" }}>
            <div style={{ width:52, height:52, borderRadius:8, overflow:"hidden", flexShrink:0 }}>
              <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=200&q=80" alt="Partnership" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
            </div>
            <div>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.95rem", fontWeight:500, color:DARK, marginBottom:"0.4rem" }}>Invest with confidence.</p>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.88rem", fontWeight:300, color:STONE, lineHeight:1.8 }}>
                With Forterra's premium real estate assets and Statewide EB-5's legal expertise, your immigration journey is backed by a track record of 100% project approval and financial transparency.
              </p>
            </div>
          </div>

          <button 
            onClick={() => {
                document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{ background: "none", border: "none", cursor: "pointer", display:"inline-flex", alignItems:"center", gap:6, fontFamily:"'DM Sans',sans-serif", fontSize:"0.82rem", fontWeight:500, color:DARK, textDecoration:"none", borderBottom:`1px solid rgba(14,14,14,0.28)`, paddingBottom:3, alignSelf:"flex-start", transition:"color 0.25s, border-color 0.25s" }}
            onMouseEnter={e=>{e.currentTarget.style.color=GOLD;e.currentTarget.style.borderBottomColor=GOLD}}
            onMouseLeave={e=>{e.currentTarget.style.color=DARK;e.currentTarget.style.borderBottomColor="rgba(14,14,14,0.28)"}}
          >Start your journey ›</button>

          {/* Stats */}
          <div style={{ display:"flex", gap: isMobile ? "2rem" : "3rem", marginTop:"3.5rem", paddingTop:"2.5rem", borderTop:`1px solid rgba(14,14,14,0.1)`, flexWrap:"wrap" }}>
            {[{ n:"100%", l:"Project Approval Rate" }, { n:"$2B+", l:"Real Estate Portfolio" }, { n:"15+", l:"Years of Excellence" }].map(({ n, l }) => (
              <div key={l}>
                <div style={{ fontFamily:"'Instrument Serif',serif", fontWeight:400, fontSize:"clamp(1.6rem,3vw,2.2rem)", color:DARK, letterSpacing:"-0.04em", lineHeight:1 }}>{n}</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.2em", textTransform:"uppercase", color:STONE, marginTop:5 }}>{l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* IMAGE */}
        <div ref={imgRef} style={{ position:"relative", overflow:"hidden", minHeight: isMobile ? "60vw" : "auto" }}>
          <motion.div style={{ y, position:"absolute", inset:"-15%" }}>
            <motion.img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85"
              alt="Texas luxury development"
              initial={{ scale:1.2 }}
              animate={isImg ? { scale:1 } : {}}
              transition={{ duration:2.5, ease:[0.16,1,0.3,1] }}
              style={{ width:"100%", height:"100%", objectFit:"cover", filter:"saturate(0.85)" }}
            />
          </motion.div>

          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, rgba(244,242,236,0.25) 0%, transparent 40%)", pointerEvents:"none" }} />

          {/* Floating card — hidden on mobile */}
          {!isMobile && (
            <motion.div
              initial={{ opacity:0, y:40 }}
              animate={isImg ? { opacity:1, y:0 } : {}}
              transition={{ delay:0.6, duration:1.2, ease:[0.16,1,0.3,1] }}
              style={{ 
                position:"absolute", 
                bottom:48, 
                left:40, 
                background:DARK, 
                padding:"2.5rem 2.8rem", 
                maxWidth:260, 
                boxShadow:"0 40px 80px -16px rgba(0,0,0,0.4)",
                borderRadius: 20 // Added rounding here for consistency
              }}
            >
              <div style={{ width:24, height:1, background:GOLD, marginBottom:"1.4rem" }} />
              <p style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontSize:"1.8rem", color:CREAM, lineHeight:1.1, marginBottom:"1rem" }}>Texas<br/>Refined.</p>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.62rem", letterSpacing:"0.28em", textTransform:"uppercase", color:"rgba(232,229,216,0.38)" }}>A legacy of excellence across the Lone Star State</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}