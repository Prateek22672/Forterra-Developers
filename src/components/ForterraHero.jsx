"use client";
import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "./useIsMobile";

// Maps nav label → section element ID in the DOM
const NAV_ITEMS = [
    { label: "Our Story", id: "about" },
    { label: "EB-5 Program", id: "investment" },
    { label: "Projects", id: "projects" },
    { label: "Process", id: "process" },
    { label: "Inquiries", id: "book" },
];

/**
 * Scrolls smoothly to a section by ID.
 * Falls back to nothing if the element isn't found yet.
 */
function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

export default function ForterraHero() {
    const [m, setM] = useState(false);
    const [menuOpen, setMenu] = useState(false);
    const [activeNav, setActiveNav] = useState(0);
    const isMobile = useIsMobile(768);
    const navigate = useNavigate();

    useEffect(() => {
        const t = setTimeout(() => setM(true), 60);
        return () => clearTimeout(t);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const cls = (s) => `${s}${m ? " in" : ""}`;

    const handleNavClick = useCallback((item, index) => {
        setActiveNav(index);
        setMenu(false);
        // Navigate to root first (handles any sub-route), then scroll
        navigate("/");
        // Give React a tick to render before scrolling
        setTimeout(() => scrollTo(item.id), 80);
    }, [navigate]);

    // ── Mobile overlay rendered via portal so it escapes overflow:hidden ──
    const mobileOverlay = menuOpen && createPortal(
        <>
            <style>{`
        @keyframes fhMenuIn {
          from { opacity:0; transform: translateY(-12px); }
          to   { opacity:1; transform: translateY(0); }
        }
        .fhOverlay {
          position:fixed; inset:0; z-index:9999;
          background:rgba(6,6,6,0.97); backdrop-filter:blur(24px);
          display:flex; flex-direction:column;
          padding:76px 24px 36px;
          animation:fhMenuIn 0.26s cubic-bezier(0.16,1,0.3,1);
          overflow-y: auto;
        }
        .fhOverlayLabel {
          font-family:'DM Sans',sans-serif; font-size:0.58rem; font-weight:500;
          letter-spacing:0.26em; text-transform:uppercase;
          color:rgba(232,229,216,0.28); margin-bottom:12px;
        }
        .fhOverlayLink {
          font-family:'Instrument Serif',serif;
          font-size:2rem; font-weight:400; font-style:italic;
          color:rgba(232,229,216,0.7); text-decoration:none;
          padding:12px 0; border-bottom:1px solid rgba(232,229,216,0.07);
          display:block; transition:color 0.18s; cursor:pointer;
          background:none; border-left:none; border-right:none; border-top:none;
          text-align:left; width:100%;
          -webkit-tap-highlight-color:transparent;
        }
        .fhOverlayLink:last-of-type { border-bottom:none; }
        .fhOverlayLink:active { color:#C9A96E; }
        .fhOverlayDivider { height:1px; background:rgba(232,229,216,0.07); margin:24px 0; }
        .fhOverlayFoot {
          margin-top:auto; font-family:'DM Sans',sans-serif;
          font-size:0.62rem; font-weight:300;
          color:rgba(232,229,216,0.22); letter-spacing:0.08em;
        }
        .fhBtnGhostPortal {
          display:inline-flex; align-items:center; justify-content:center; gap:7px;
          background:rgba(255,255,255,0.1); backdrop-filter:blur(12px);
          border:1px solid rgba(232,229,216,0.22); color:#E8E5D8;
          font-family:'DM Sans',sans-serif; font-size:0.82rem; font-weight:400;
          padding:13px 22px; border-radius:999px;
          text-decoration:none; cursor:pointer;
          transition:background 0.22s; white-space:nowrap;
          -webkit-tap-highlight-color:transparent;
          flex:1 1 0; min-width:0;
        }
        .fhBtnPrimaryPortal {
          display:inline-flex; align-items:center; justify-content:center; gap:7px;
          background:#E8E5D8; color:#0E0E0E;
          font-family:'DM Sans',sans-serif; font-size:0.82rem; font-weight:600;
          padding:13px 26px; border-radius:999px;
          text-decoration:none; border:none; cursor:pointer;
          transition:background 0.22s, transform 0.22s;
          letter-spacing:0.02em; white-space:nowrap;
          -webkit-tap-highlight-color:transparent;
          flex:1 1 0; min-width:0;
        }
      `}</style>
            <div className="fhOverlay">
                <p className="fhOverlayLabel">Menu</p>

                {NAV_ITEMS.map((item, i) => (
                    <button
                        key={item.label}
                        className="fhOverlayLink"
                        onClick={() => handleNavClick(item, i)}
                    >
                        {item.label}
                    </button>
                ))}

                <div className="fhOverlayDivider" />

                <div style={{ display: "flex", gap: 10 }}>
                    <a
                        href="tel:+15122404090"
                        className="fhBtnGhostPortal"
                        onClick={() => setMenu(false)}
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.63a16 16 0 006.29 6.29l1.17-1.17a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="#E8E5D8" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                        Call Us
                    </a>
                    <button
                        className="fhBtnPrimary"
                        style={{ flex: "unset" }}
                        onClick={() => handleNavClick({ id: "investment" }, -1)}
                    >
                        Apply Now
                    </button>
                </div>

                <p className="fhOverlayFoot" style={{ marginTop: 32 }}>
                    Forterra Developers · Texas EB-5 Program
                </p>
            </div>
        </>,
        document.body
    );

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --cream: #E8E5D8;
          --gold:  #C9A96E;
          --dark:  #0E0E0E;
        }

        @keyframes fhDrift {
          from { transform: scale(1.06) translate(0,0); }
          to   { transform: scale(1.06) translate(-1.2%,-0.8%); }
        }
        @keyframes fhNoise {
          0%,100% { transform: translate(0,0); }
          20%     { transform: translate(3%,1%); }
          60%     { transform: translate(1%,-4%); }
        }
        @keyframes fhWord {
          from { transform: translateY(108%); }
          to   { transform: translateY(0); }
        }
        @keyframes fhNavDrop {
          from { opacity:0; transform: translateX(-50%) translateY(-110%); }
          to   { opacity:1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes fhUp {
          from { opacity:0; transform: translateY(20px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes fhIn {
          from { opacity:0; }
          to   { opacity:1; }
        }

        .fhBg {
          position:absolute; inset:-5%;
          background: url('https://images.unsplash.com/photo-1546436836-07a91091f160?w=1800&q=85') center/cover no-repeat;
          animation: fhDrift 34s ease-in-out infinite alternate;
        }
        .fhGrain {
          position:absolute; inset:-50%; width:200%; height:200%;
          opacity:0.35; mix-blend-mode:overlay; pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          animation: fhNoise 0.15s steps(1) infinite;
        }

        .fhWclip { overflow:hidden; line-height:0.82; }
        .fhMark {
          display:block; font-family:'Instrument Serif',serif; font-weight:400;
          color:var(--cream); letter-spacing:-0.065em; white-space:nowrap;
          transform:translateY(108%);
        }
        .fhMark.in { animation: fhWord 1.1s 0.6s cubic-bezier(0.16,1,0.3,1) forwards; }
        .fhMark sup { font-size:0.18em; vertical-align:super; letter-spacing:0; color:rgba(232,229,216,0.45); }

        /* Desktop nav pill */
        .fhNav {
          position:absolute; top:0; left:50%;
          transform:translateX(-50%) translateY(-110%);
          opacity:0; z-index:30;
        }
        .fhNav.in { animation: fhNavDrop 0.7s 1.1s cubic-bezier(0.16,1,0.3,1) forwards; }
        .fhNavInner {
          display:flex; align-items:center; gap:26px;
          background:rgba(0,0,0,0.92); backdrop-filter:blur(16px);
          border-radius:0 0 16px 16px; padding:11px 26px;
        }
        .fhNavBtn {
          font-family:'DM Sans',sans-serif; font-size:0.75rem; font-weight:400;
          letter-spacing:0.02em; color:rgba(232,229,216,0.6);
          background:none; border:none; cursor:pointer;
          white-space:nowrap; transition:color 0.2s; padding:0;
          -webkit-tap-highlight-color:transparent;
        }
        .fhNavBtn:hover, .fhNavBtn.on { color:var(--cream); }

        /* Stagger helpers */
        .fhI1{opacity:0} .fhI1.in{animation:fhIn 0.5s 1.3s ease forwards}
        .fhI2{opacity:0} .fhI2.in{animation:fhIn 0.5s 1.4s ease forwards}
        .fhU1{opacity:0} .fhU1.in{animation:fhUp 0.7s 1.1s cubic-bezier(0.16,1,0.3,1) forwards}
        .fhU2{opacity:0} .fhU2.in{animation:fhUp 0.7s 1.3s cubic-bezier(0.16,1,0.3,1) forwards}
        .fhU3{opacity:0} .fhU3.in{animation:fhUp 0.7s 1.5s cubic-bezier(0.16,1,0.3,1) forwards}
        .fhU4{opacity:0} .fhU4.in{animation:fhUp 0.7s 1.65s cubic-bezier(0.16,1,0.3,1) forwards}

        /* Buttons */
        .fhBtnPrimary {
          display:inline-flex; align-items:center; justify-content:center; gap:7px;
          background:var(--cream); color:var(--dark);
          font-family:'DM Sans',sans-serif; font-size:0.82rem; font-weight:600;
          padding:13px 26px; border-radius:999px;
          text-decoration:none; border:none; cursor:pointer;
          transition:background 0.22s, transform 0.22s;
          letter-spacing:0.02em; white-space:nowrap;
          -webkit-tap-highlight-color:transparent;
          flex:1 1 0; min-width:0;
        }
        .fhBtnPrimary:hover  { background:#fff; }
        .fhBtnPrimary:active { transform:scale(0.96); }

        .fhBtnGhost {
          display:inline-flex; align-items:center; justify-content:center; gap:7px;
          background:rgba(255,255,255,0.1); backdrop-filter:blur(12px);
          border:1px solid rgba(232,229,216,0.22); color:var(--cream);
          font-family:'DM Sans',sans-serif; font-size:0.82rem; font-weight:400;
          padding:13px 22px; border-radius:999px;
          text-decoration:none; cursor:pointer;
          transition:background 0.22s; white-space:nowrap;
          -webkit-tap-highlight-color:transparent;
          flex:1 1 0; min-width:0;
        }
        .fhBtnGhost:hover  { background:rgba(255,255,255,0.18); }

        .fhBtnOutline {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          background:transparent;
          border:1px solid rgba(232,229,216,0.28); color:rgba(232,229,216,0.75);
          font-family:'DM Sans',sans-serif; font-size:0.75rem; font-weight:400;
          padding:10px 20px; border-radius:999px;
          text-decoration:none; cursor:pointer;
          transition:border-color 0.22s, color 0.22s;
          white-space:nowrap; letter-spacing:0.02em;
          -webkit-tap-highlight-color:transparent; align-self:flex-start;
        }
        .fhBtnOutline:hover  { border-color:rgba(232,229,216,0.55); color:var(--cream); }

        /* Desktop pill CTA */
        .fhCta {
          display:inline-flex; align-items:center; gap:8px;
          background:var(--cream); color:var(--dark);
          font-family:'DM Sans',sans-serif; font-size:0.82rem; font-weight:500;
          padding:5px 5px 5px 18px; border-radius:999px;
          text-decoration:none; transition:gap 0.3s, background 0.25s;
          -webkit-tap-highlight-color:transparent; cursor:pointer;
          border:none;
        }
        .fhCta:hover { gap:14px; background:#fff; }
        .fhCtaIcon {
          width:34px; height:34px; border-radius:50%; background:var(--dark);
          display:flex; align-items:center; justify-content:center;
          flex-shrink:0; transition:transform 0.3s;
        }
        .fhCta:hover .fhCtaIcon { transform:scale(1.1); }

        /* Mobile hamburger */
        .fhBurger {
          position:absolute; top:16px; right:16px; z-index:60;
          width:44px; height:44px; border-radius:10px;
          background:rgba(0,0,0,0.65);
          border:1px solid rgba(232,229,216,0.16);
          backdrop-filter:blur(10px); cursor:pointer;
          display:flex; flex-direction:column;
          align-items:center; justify-content:center; gap:5px;
          -webkit-tap-highlight-color:transparent;
        }
        .fhBurger span {
          width:18px; height:1.5px; background:var(--cream);
          border-radius:2px; display:block;
          transition:transform 0.28s ease, opacity 0.22s;
          transform-origin:center;
        }
        .fhBurger.open span:nth-child(1) { transform:rotate(45deg) translate(4.5px,4.5px); }
        .fhBurger.open span:nth-child(2) { opacity:0; }
        .fhBurger.open span:nth-child(3) { transform:rotate(-45deg) translate(4.5px,-4.5px); }
      `}</style>

            <section style={{
                position: "relative", width: "100%", height: "100svh",
                overflow: "hidden", borderRadius: isMobile ? 16 : 20,
                background: "#000",
            }}>
                {/* Background */}
                <div className="fhBg" />
                <div style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    background: isMobile
                        ? "linear-gradient(to bottom,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0.1) 25%,rgba(0,0,0,0.05) 45%,rgba(0,0,0,0.45) 62%,rgba(0,0,0,0.88) 78%,rgba(0,0,0,0.97) 100%)"
                        : "linear-gradient(to bottom,rgba(0,0,0,0.28) 0%,rgba(0,0,0,0.02) 35%,rgba(0,0,0,0.02) 50%,rgba(0,0,0,0.68) 78%,rgba(0,0,0,0.94) 100%)",
                }} />
                <div className="fhGrain" />

                {/* ══════════════════ DESKTOP ══════════════════ */}
                {!isMobile && (
                    <>
                        {/* Logo — top left */}
                        <div className={cls("fhI1")} style={{ position: "absolute", top: 18, left: 24, zIndex: 40 }}>
                            <img
                                src="/white-logo.png"
                                alt="Forterra"
                                style={{ height: 36, width: "auto", objectFit: "contain" }}
                                onError={e => {
                                    e.currentTarget.style.display = "none";
                                    e.currentTarget.nextSibling.style.display = "block";
                                }}
                            />
                            <span style={{
                                display: "none",
                                fontFamily: "'Instrument Serif',serif", fontWeight: 400,
                                fontSize: "1.3rem", color: "var(--cream)", letterSpacing: "-0.04em",
                            }}>
                                Forterra
                            </span>
                        </div>

                        {/* Center nav pill — buttons instead of <a> */}
                        <nav className={cls("fhNav")}>
                            <div className="fhNavInner">
                                {NAV_ITEMS.map((item, i) => (
                                    <button
                                        key={item.label}
                                        className={`fhNavBtn${i === activeNav ? " on" : ""}`}
                                        onClick={() => handleNavClick(item, i)}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </nav>

                        {/* Top-right tag */}
                        <div className={cls("fhI2")} style={{ position: "absolute", top: 22, right: 24, zIndex: 20 }}>
                            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "black/70" }}>
                                Texas · Real Estate · USCIS
                            </span>
                        </div>

                        {/* Wordmark */}
                        <div style={{ position: "absolute", bottom: 0, left: 0, zIndex: 20 }}>
                            <div className="fhWclip">
                                <span className={cls("fhMark")} style={{ fontSize: "clamp(18vw,21vw,21vw)" }}>
                                    Forterra<sup>*</sup>
                                </span>
                            </div>
                        </div>

                        {/* Bottom-right content */}
                        <div style={{ position: "absolute", bottom: 32, right: 28, zIndex: 20, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16, maxWidth: 410 }}>
                            <p className={cls("fhU1")} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(0.78rem,1.05vw,0.94rem)", fontWeight: 300, color: "rgba(232,229,216,0.7)", lineHeight: 1.65, letterSpacing: "0.01em" }}>
                                Forterra Developers' premier Texas real estate investments provide a seamless and secure pathway to U.S. permanent residency through the EB-5 program. Secure your legacy. Build your future.
                            </p>
                            <div className={cls("fhU2")} style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                                <a href="tel:+15122404090" className="fhBtnGhost" style={{ flex: "unset" }}>
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.63a16 16 0 006.29 6.29l1.17-1.17a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="#E8E5D8" strokeWidth="1.8" strokeLinecap="round" />
                                    </svg>
                                    +1 (512) 240-4090
                                </a>
                                <button
                                    className="fhBtnPrimary"
                                    style={{ flex: "unset" }}
                                    onClick={() => handleNavClick({ id: "investment" }, -1)}
                                >
                                    Apply Now
                                </button>
                            </div>
                            <button
                                className={cls("fhCta fhU3")}
                                onClick={() => handleNavClick({ id: "projects" }, 2)}
                            >
                                View Investment Projects
                                <span className="fhCtaIcon">
                                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                                        <path d="M3 8h10M9 4l4 4-4 4" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </>
                )}

                {/* ══════════════════ MOBILE ══════════════════ */}
                {isMobile && (
                    <>
                        {/* Hamburger — sits inside hero but menu is portalled out */}
                        <button
                            className={`fhBurger${menuOpen ? " open" : ""}`}
                            onClick={() => setMenu(o => !o)}
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                        >
                            <span /><span /><span />
                        </button>

                        {/* Logo top-left */}
                        <div className={cls("fhI1")} style={{ position: "absolute", top: 18, left: 18, zIndex: 20 }}>
                            <img
                                src="/white-logo.png"
                                alt="Forterra Developers"
                                style={{ height: 28, width: "auto", objectFit: "contain" }}
                                onError={e => {
                                    e.currentTarget.style.display = "none";
                                    e.currentTarget.nextSibling.style.display = "block";
                                }}
                            />
                            <span style={{
                                display: "none",
                                fontFamily: "'Instrument Serif',serif", fontWeight: 400,
                                fontSize: "1.1rem", color: "var(--cream)", letterSpacing: "-0.04em",
                            }}>
                                Forterra Developers
                            </span>
                        </div>

                        {/* Wordmark — mid-left */}
                        <div style={{ position: "absolute", top: "40%", left: 0, zIndex: 20, pointerEvents: "none" }}>
                            <div className="fhWclip">
                                <span className={cls("fhMark")} style={{ fontSize: "clamp(16vw,18vw,18vw)" }}>
                                    Forterra Developers<sup>*</sup>
                                </span>
                            </div>
                        </div>

                        {/* Bottom content */}
                        <div style={{ position: "absolute", bottom: 50, left: 0, right: 0, zIndex: 20, padding: "28px 20px 28px" }}>
                            <div className={cls("fhU1")} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                                <span style={{ width: 20, height: 1, background: "rgba(200,169,110,0.6)", display: "inline-block" }} />
                                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(232,229,216,0.45)" }}>
                                    EB-5 Path to U.S. Residency
                                </span>
                            </div>

                            <p className={cls("fhU2")} style={{ fontFamily: "'Instrument Serif',serif", fontSize: "1.35rem", fontWeight: 400, color: "rgba(232,229,216,0.95)", lineHeight: 1.3, letterSpacing: "-0.02em", marginBottom: 6 }}>
                                Secure Your Legacy,<br />
                                <span style={{ fontStyle: "italic", color: "var(--gold)" }}>Build Your Future.</span>
                            </p>

                            <p className={cls("fhU3")} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", fontWeight: 300, color: "rgba(232,229,216,0.58)", lineHeight: 1.6, marginBottom: 20 }}>
                                Premier Texas real estate investments — a seamless and secure pathway to U.S. permanent residency.
                            </p>

                            <div className={cls("fhU4")} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                                <a href="tel:+15122404090" className="fhBtnGhost">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.63a16 16 0 006.29 6.29l1.17-1.17a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="#E8E5D8" strokeWidth="1.8" strokeLinecap="round" />
                                    </svg>
                                    Call Us
                                </a>
                                <button
                                    className="fhBtnPrimary"
                                    onClick={() => handleNavClick({ id: "investment" }, -1)}
                                >
                                    Apply Now
                                </button>
                            </div>

                            <button
                                className={cls("fhBtnOutline fhU4")}
                                onClick={() => handleNavClick({ id: "projects" }, 2)}
                            >
                                View Investment Projects →
                            </button>
                        </div>
                    </>
                )}
            </section>

            {/* Portal: mobile overlay lives here, OUTSIDE the overflow:hidden section */}
            {mobileOverlay}
        </>
    );
}