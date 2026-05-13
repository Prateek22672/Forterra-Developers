"use client";
import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "./useIsMobile";

const BONE  = "#F4F2EC";
const DARK  = "#0E0E0E";
const GOLD  = "#C9A96E";
const STONE = "#8A8578";
const CREAM = "#E8E5D8";

const PROJECTS = [
  {
    name: "Lakeside Estates",
    location: "Georgetown, TX",
    type: "Master-Planned Community",
    tag: "EB-5 Eligible",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    ],
  },
  {
    name: "Cimarron Hills",
    location: "Georgetown, TX",
    type: "Phase 3 & 4 Luxury Residential",
    tag: "EB-5 Eligible",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    ],
  },
  {
    name: "Twin Creek",
    location: "Austin ETJ",
    type: "Master-Planned Assets",
    tag: "EB-5 Eligible",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ],
  },
];

const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M10 12L6 8l4-4" stroke={CREAM} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M6 4l4 4-4 4" stroke={CREAM} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function useInvestmentNav() {
  const navigate = useNavigate();
  return useCallback(() => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("investment");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }, [navigate]);
}

function ProjectCard({ project, index, onInquire }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [imgIdx, setImgIdx] = useState(0);
  const [btnHover, setBtnHover] = useState(false);

  const prevImg = (e) => {
    e.stopPropagation();
    setImgIdx(i => (i - 1 + project.images.length) % project.images.length);
  };
  const nextImg = (e) => {
    e.stopPropagation();
    setImgIdx(i => (i + 1) % project.images.length);
  };

  const arrowBtn = {
    position: "absolute", top: "50%", transform: "translateY(-50%)",
    width: 32, height: 32, borderRadius: "50%",
    background: DARK, border: "none", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "background 0.22s, transform 0.22s",
    WebkitTapHighlightColor: "transparent",
    flexShrink: 0, zIndex: 10,
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
    >
      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: "#ddd" }}>
        <motion.img
          key={imgIdx}
          src={project.images[imgIdx]}
          alt={project.name}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55 }}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            borderRadius: 12, pointerEvents: "none", userSelect: "none",
          }}
        />

        {/* EB-5 badge */}
        <div style={{
          position: "absolute", top: 12, right: 12,
          background: DARK, color: CREAM,
          fontFamily: "'DM Sans',sans-serif", fontSize: "0.58rem", fontWeight: 600,
          letterSpacing: "0.15em", textTransform: "uppercase",
          padding: "5px 12px", borderRadius: 999,
        }}>
          {project.tag}
        </div>

        {/* Dots */}
        <div style={{
          position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
          display: "flex", gap: 5,
        }}>
          {project.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setImgIdx(i)}
              style={{
                width: i === imgIdx ? 18 : 6, height: 4, borderRadius: 999,
                background: i === imgIdx ? "#fff" : "rgba(255,255,255,0.45)",
                border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0,
              }}
            />
          ))}
        </div>

        {/* Prev arrow */}
        <button
          onClick={prevImg}
          style={{ ...arrowBtn, left: 10 }}
          onMouseEnter={e => e.currentTarget.style.background = "#333"}
          onMouseLeave={e => e.currentTarget.style.background = DARK}
          aria-label="Previous image"
        >
          <ChevronLeft />
        </button>

        {/* Next arrow */}
        <button
          onClick={nextImg}
          style={{ ...arrowBtn, right: 10 }}
          onMouseEnter={e => e.currentTarget.style.background = "#333"}
          onMouseLeave={e => e.currentTarget.style.background = DARK}
          aria-label="Next image"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Info */}
      <div style={{ padding: "1.4rem 0", borderBottom: "1px solid rgba(14,14,14,0.1)" }}>
        <h3 style={{
          fontFamily: "'Instrument Serif',serif", fontWeight: 400,
          fontSize: "clamp(1.3rem,2vw,1.9rem)", color: DARK,
          letterSpacing: "-0.03em", marginBottom: "0.35rem",
        }}>
          {project.name}
        </h3>
        <p style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", fontWeight: 300,
          color: STONE, marginBottom: "1.2rem",
        }}>
          {project.location} · {project.type}
        </p>

        {/* ── Rounded "Request Prospectus" button ── */}
        <button
          onClick={onInquire}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", fontWeight: 600,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: btnHover ? CREAM : DARK,
            background: btnHover ? DARK : "transparent",
            border: `1px solid ${btnHover ? DARK : "rgba(14,14,14,0.28)"}`,
            padding: "10px 20px", borderRadius: 999,
            cursor: "pointer",
            transition: "color 0.25s, background 0.25s, border-color 0.25s",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          Request Prospectus
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 10L10 2M10 2H4M10 2v6"
              stroke={btnHover ? CREAM : DARK}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: "stroke 0.25s" }}
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref      = useRef(null);
  const inView   = useInView(ref, { once: true, margin: "-10%" });
  const isMobile = useIsMobile();
  const [inquireHover, setInquireHover] = useState(false);

  const goToInvestment = useInvestmentNav();

  return (
    <section
      ref={ref}
      id="projects"
      style={{ background: BONE, padding: isMobile ? "5rem 1.25rem" : "9rem 4rem", overflow: "hidden" }}
    >
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "flex-end",
            marginBottom: isMobile ? "2.5rem" : "4rem",
            flexDirection: isMobile ? "column" : "row",
            gap: "1.5rem",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 32, height: 1, background: GOLD }} />
              <span style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: "0.62rem", fontWeight: 500,
                letterSpacing: "0.26em", textTransform: "uppercase", color: GOLD,
              }}>
                Available Opportunities
              </span>
            </div>
            <h2 style={{
              fontFamily: "'Instrument Serif',serif", fontWeight: 400,
              fontSize: isMobile ? "clamp(2.2rem,8vw,3rem)" : "clamp(2.5rem,5vw,5rem)",
              color: DARK, letterSpacing: "-0.04em", lineHeight: 0.95,
            }}>
              Featured EB-5 <span style={{ fontStyle: "italic", color: STONE }}>Projects</span>
            </h2>
          </div>

          {/* Header-level "Inquire Now" button */}
          <button
            onClick={goToInvestment}
            onMouseEnter={() => setInquireHover(true)}
            onMouseLeave={() => setInquireHover(false)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", fontWeight: 600,
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: inquireHover ? "#fff" : DARK,
              background: inquireHover ? DARK : "transparent",
              border: `1px solid rgba(14,14,14,0.22)`,
              padding: "12px 24px", borderRadius: 999,
              cursor: "pointer", flexShrink: 0,
              transition: "background 0.28s, color 0.28s",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            Inquire Now →
          </button>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
          gap: isMobile ? "2.5rem" : "2rem",
        }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.name}
              project={p}
              index={i}
              onInquire={goToInvestment}
            />
          ))}
        </div>
      </div>
    </section>
  );
}