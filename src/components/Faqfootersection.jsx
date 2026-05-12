"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useIsMobile } from "./useIsMobile";

const DARK  = "#0E0E0E";
const GOLD  = "#C9A96E";
const STONE = "#8A8578";
const CREAM = "#E8E5D8";
const BONE  = "#F4F2EC";

const FAQS = [
  { q:"What is the minimum investment required for EB-5?",    a:"The minimum investment is $800,000 USD for projects located in Targeted Employment Areas (TEA), such as Forterra's Texas developments. This amount includes the required capital investment plus applicable administrative fees." },
  { q:"How long does the EB-5 process take?",                 a:"The full process typically spans 2–5 years. USCIS petition review for Form I-526E currently takes 12–24 months, followed by visa processing and conditional green card issuance. Form I-829 to remove conditions is filed approximately 2 years later." },
  { q:"What family members are included?",                    a:"The EB-5 investor, their spouse, and all unmarried children under the age of 21 are all eligible to receive conditional permanent residency as derivative beneficiaries." },
  { q:"What is a Targeted Employment Area (TEA)?",            a:"A TEA is a rural area or urban area with unemployment at least 1.5× the national average. Investments in TEAs qualify for the reduced $800,000 threshold. All Forterra projects are located in certified TEAs." },
  { q:"What is the Statewide EB-5 Regional Center?",          a:"The Statewide EB-5 Regional Center is a USCIS-designated entity that pools investor capital for qualifying commercial enterprises. It manages regulatory compliance, job creation documentation, and provides investors with structured, transparent reporting." },
  { q:"Is my capital secure in a Forterra EB-5 investment?",  a:"Forterra projects are backed by tangible Class-A Texas real estate assets with verifiable appraisals. Capital is held in regulated escrow accounts and released only upon USCIS approval, providing an additional layer of security for investors." },
  { q:"Do I need to live in Texas to invest?",                a:"No. EB-5 investors are not required to live or work in the state where their investment is located. Once permanent residency is granted, you are free to reside anywhere in the United States." },
];

const FOOTER_LINKS = {
  "Main": [
    { label:"Home",         href:"#home"       },
    { label:"Our Story",    href:"#about"      },
    { label:"Projects",     href:"#projects"   },
    { label:"FAQ",          href:"#faq"        },
  ],
  "Investment": [
    { label:"EB-5 Program", href:"#investment" },
    { label:"The Process",  href:"#process"    },
    { label:"Benefits",     href:"#benefits"   },
    { label:"Partnership",  href:"#partnership"},
  ],
};

function FAQItem({ q, a, index, inView }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity:0, y:20 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.7, ease:[0.16,1,0.3,1], delay:index * 0.05 }}
      style={{ borderBottom:`1px solid rgba(14,14,14,0.1)` }}
    >
      <button onClick={() => setOpen(o => !o)} style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1.4rem 0", background:"none", border:"none", cursor:"pointer", textAlign:"left", gap:20 }}>
        <span style={{ fontFamily:"'Instrument Serif',serif", fontWeight:400, fontSize:"clamp(0.95rem,1.6vw,1.2rem)", color:DARK, letterSpacing:"-0.02em", lineHeight:1.3 }}>{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration:0.3 }} style={{ fontSize:"1.4rem", color:GOLD, flexShrink:0, lineHeight:1 }}>+</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }}
            transition={{ duration:0.38, ease:[0.16,1,0.3,1] }}
            style={{ overflow:"hidden" }}
          >
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.9rem", fontWeight:300, color:STONE, lineHeight:1.85, paddingBottom:"1.5rem" }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQFooterSection() {
  const faqRef = useRef(null);
  const faqInView = useInView(faqRef, { once:true, margin:"-10%" });
  const isMobile = useIsMobile();

  return (
    <>
      {/* FAQ SECTION */}
      <section ref={faqRef} id="faq" style={{ background:BONE, padding: isMobile ? "5rem 1.25rem" : "9rem 4rem", overflow:"hidden" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div
            initial={{ opacity:0, y:24 }} animate={faqInView ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.9, ease:[0.16,1,0.3,1] }}
            style={{ marginBottom: isMobile ? "3rem" : "5rem" }}
          >
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <div style={{ width:32, height:1, background:GOLD }} />
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.62rem", fontWeight:500, letterSpacing:"0.26em", textTransform:"uppercase", color:GOLD }}>Investor FAQ</span>
            </div>
            <h2 style={{ fontFamily:"'Instrument Serif',serif", fontWeight:400, fontSize: isMobile ? "clamp(2.2rem,8vw,3rem)" : "clamp(2.5rem,5vw,5rem)", color:DARK, letterSpacing:"-0.04em", lineHeight:0.95 }}>
              Your EB-5 Questions,<br/><span style={{ fontStyle:"italic", color:STONE }}>Expertly Answered.</span>
            </h2>
          </motion.div>

          <div>{FAQS.map((faq,i) => <FAQItem key={i} {...faq} index={i} inView={faqInView} />)}</div>

          {/* CTA block */}
          <motion.div
            initial={{ opacity:0, y:20 }} animate={faqInView ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.8, ease:[0.16,1,0.3,1], delay:0.5 }}
            style={{ marginTop:"3.5rem", padding: isMobile ? "2rem" : "3rem", background:DARK, display:"flex", justifyContent:"space-between", alignItems:"center", flexDirection: isMobile ? "column" : "row", flexWrap:"wrap", gap:"1.5rem", textAlign: isMobile ? "center" : "left" }}
          >
            <div>
              <p style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontSize:"1.4rem", color:CREAM, marginBottom:"0.5rem" }}>Still have questions?</p>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.88rem", fontWeight:300, color:"rgba(232,229,216,0.52)" }}>Our EB-5 specialists are available to guide you.</p>
            </div>
            <a href="mailto:info@forterradev.com" style={{ display:"inline-flex", alignItems:"center", gap:8, background:GOLD, color:DARK, fontFamily:"'DM Sans',sans-serif", fontSize:"0.78rem", fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", padding:"14px 28px", textDecoration:"none", transition:"background 0.25s", whiteSpace:"nowrap" }}
              onMouseEnter={e=>e.currentTarget.style.background="#e0b97c"}
              onMouseLeave={e=>e.currentTarget.style.background=GOLD}
            >Contact a Specialist →</a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer style={{ background:DARK, padding: isMobile ? "4rem 1.25rem 2.5rem" : "5rem 4rem 3rem", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${GOLD},transparent)` }} />

        <div style={{ maxWidth:1360, margin:"0 auto" }}>
          {/* Top grid */}
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr", gap: isMobile ? "3rem" : "5rem", marginBottom: isMobile ? "3rem" : "5rem" }}>

            {/* Brand column */}
            <div>
              <img src="/white-logo.png" alt="Forterra" style={{ height:30, objectFit:"contain", marginBottom:"1.5rem", opacity:0.85 }} />
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.88rem", fontWeight:300, color:"rgba(232,229,216,0.45)", lineHeight:1.85, maxWidth:380, marginBottom:"1.4rem" }}>
                Forterra Developers is a leading Texas-based real estate firm specializing in luxury residential communities and strategic land development.
              </p>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.88rem", fontWeight:300, color:"rgba(232,229,216,0.38)", lineHeight:1.8, maxWidth:380 }}>
                Through our exclusive partnership with Statewide EB-5 Regional Center, we provide international investors with a secure and transparent pathway to U.S. residency.
              </p>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <div key={section}>
                <h4 style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.62rem", fontWeight:600, letterSpacing:"0.24em", textTransform:"uppercase", color:GOLD, marginBottom:"1.4rem" }}>{section}</h4>
                <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"0.8rem" }}>
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <a href={href} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.88rem", fontWeight:300, color:"rgba(232,229,216,0.52)", textDecoration:"none", transition:"color 0.22s" }}
                        onMouseEnter={e=>e.currentTarget.style.color=CREAM}
                        onMouseLeave={e=>e.currentTarget.style.color="rgba(232,229,216,0.52)"}
                      >{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact strip */}
          <div style={{ padding:"2rem 0", borderTop:"1px solid rgba(232,229,216,0.07)", borderBottom:"1px solid rgba(232,229,216,0.07)", marginBottom:"2rem", display:"flex", gap: isMobile ? "1.5rem" : "4rem", flexDirection: isMobile ? "column" : "row", flexWrap:"wrap" }}>
            <div>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.58rem", fontWeight:500, letterSpacing:"0.22em", textTransform:"uppercase", color:GOLD, marginBottom:6 }}>Get In Touch</p>
              <a href="mailto:info@forterradev.com" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.9rem", fontWeight:300, color:CREAM, textDecoration:"none", display:"block", marginBottom:4 }}>info@forterradev.com</a>
              <a href="tel:+15122404090" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.9rem", fontWeight:300, color:"rgba(232,229,216,0.55)", textDecoration:"none" }}>+1 (512) 240-4090</a>
            </div>
          </div>

          {/* Copyright section */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.8rem", flexDirection: isMobile ? "column" : "row", textAlign: isMobile ? "center" : "left" }}>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.72rem", fontWeight:300, color:"rgba(232,229,216,0.25)", letterSpacing:"0.05em" }}>
              © Copyright 2026 Forterra Developers — All rights reserved.
            </p>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.72rem", fontWeight:300, color:"rgba(232,229,216,0.18)", letterSpacing:"0.05em" }}>
              EB-5 investments involve risk. Consult a qualified immigration attorney.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}