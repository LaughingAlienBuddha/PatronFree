"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { HomeLink } from "@/components/home-link";
import { useState, useEffect, useRef } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "@/lib/firebase";
import { formatAuthError } from "@/lib/auth-errors";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Canvas particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let animId: number;

    const particles: {
      x: number; y: number; vx: number; vy: number;
      r: number; alpha: number; alphaDir: number;
    }[] = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.6 + 0.1,
        alphaDir: (Math.random() > 0.5 ? 1 : -1) * 0.004,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaDir;
        if (p.alpha <= 0.05 || p.alpha >= 0.85) p.alphaDir *= -1;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 220, 255, ${p.alpha})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      {/* ── Keyframe styles ─────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        @keyframes gradShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes blobFloat {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          25%  { transform: translate(18px, -22px) scale(1.05); }
          50%  { transform: translate(-12px, -10px) scale(0.96); }
          75%  { transform: translate(14px, 16px)  scale(1.03); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(32px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 0.9; }
        }

        * { box-sizing: border-box; }

        .auth-root {
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          overflow: hidden;
          background: #060916;
        }

        /* Animated gradient layer */
        .auth-grad {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            130deg,
            #06091a 0%,
            #0d1b45 25%,
            #0a1628 50%,
            #141042 75%,
            #06091a 100%
          );
          background-size: 400% 400%;
          animation: gradShift 12s ease infinite;
          z-index: 0;
        }

        /* Vignette */
        .auth-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.72) 100%);
          z-index: 1;
          pointer-events: none;
        }

        /* Blobs */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .blob-1 {
          width: 420px; height: 420px;
          background: radial-gradient(circle, rgba(30,80,200,0.55) 0%, transparent 70%);
          top: -120px; left: -120px;
          animation: blobFloat 14s ease-in-out infinite;
          z-index: 1;
        }
        .blob-2 {
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(0,180,200,0.4) 0%, transparent 70%);
          bottom: -100px; right: -100px;
          animation: blobFloat 17s ease-in-out infinite reverse;
          animation-delay: -3s;
          z-index: 1;
        }
        .blob-3 {
          width: 260px; height: 260px;
          background: radial-gradient(circle, rgba(100,60,220,0.35) 0%, transparent 70%);
          bottom: 20%; left: 8%;
          animation: blobFloat 11s ease-in-out infinite;
          animation-delay: -6s;
          z-index: 1;
        }
        .blob-4 {
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(20,120,220,0.4) 0%, transparent 70%);
          top: 18%; right: 10%;
          animation: blobFloat 13s ease-in-out infinite reverse;
          animation-delay: -2s;
          z-index: 1;
        }

        /* Canvas stars */
        .auth-canvas {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
        }

        /* Radial glow behind card */
        .auth-glow {
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(56,130,250,0.18) 0%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          z-index: 3;
          pointer-events: none;
          animation: pulseGlow 6s ease-in-out infinite;
        }

        /* ── Back button ─────────────────────────── */
        .back-btn {
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 100;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 16px 8px 11px;
          border-radius: 999px;
          background: rgba(255,255,255,0.1);
          border: 1.5px solid rgba(255,255,255,0.25);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          color: #ffffff;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: background 0.25s, border-color 0.25s, transform 0.25s, box-shadow 0.25s;
          font-family: inherit;
        }
        .back-btn:hover {
          background: rgba(99,179,237,0.22);
          border-color: rgba(99,179,237,0.7);
          box-shadow: 0 0 20px rgba(99,179,237,0.35);
          transform: translateX(-4px);
          color: #a5f3fc;
        }
        .back-btn svg {
          flex-shrink: 0;
          transition: transform 0.25s;
        }
        .back-btn:hover svg { transform: translateX(-2px); }

        /* ── Card ────────────────────────────────── */
        .auth-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 440px;
          background: rgba(10, 15, 35, 0.72);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 28px;
          padding: 2.5rem 2.25rem 2.25rem;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04) inset,
            0 32px 80px rgba(0,0,0,0.65),
            0 0 100px rgba(56,130,250,0.12);
          animation: cardIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        /* Top shimmer line */
        .card-shimmer {
          position: absolute;
          top: 0; left: 12%; right: 12%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(120,200,255,0.6), rgba(200,220,255,0.5), rgba(120,200,255,0.6), transparent);
          border-radius: 50%;
          filter: blur(0.5px);
        }

        /* Logo */
        .auth-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 1.4rem;
        }
        .logo-icon {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #38bdf8, #3b82f6, #7c3aed);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-weight: 900; font-size: 15px; color: #fff;
          box-shadow: 0 0 20px rgba(56,189,248,0.45), 0 3px 10px rgba(0,0,0,0.4);
          letter-spacing: -0.02em;
        }
        .logo-name {
          font-size: 1.2rem;
          font-weight: 800;
          color: #f0f8ff;
          letter-spacing: -0.02em;
        }

        /* Title */
        .auth-title {
          font-size: 2rem;
          font-weight: 900;
          text-align: center;
          background: linear-gradient(135deg, #e0f2fe 0%, #7dd3fc 40%, #818cf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 0.3rem;
          letter-spacing: -0.03em;
          line-height: 1.1;
        }
        .auth-subtitle {
          text-align: center;
          color: rgba(200,230,255,0.45);
          font-size: 0.85rem;
          margin-bottom: 1.6rem;
          font-weight: 400;
        }

        /* Social */
        .social-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 1.4rem;
        }
        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.05);
          color: #e0f2fe;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-family: inherit;
        }
        .social-btn:hover {
          background: rgba(99,179,237,0.14);
          border-color: rgba(99,179,237,0.5);
          box-shadow: 0 0 22px rgba(99,179,237,0.18);
          transform: translateY(-2px) scale(1.03);
        }
        .social-icon { width: 18px; height: 18px; flex-shrink: 0; }

        /* Divider */
        .divider {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1.4rem;
        }
        .divider-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(120,180,255,0.2), transparent);
        }
        .divider-text {
          font-size: 10px;
          font-weight: 500;
          color: rgba(200,230,255,0.35);
          white-space: nowrap;
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }

        /* Fields */
        .fields { display: flex; flex-direction: column; gap: 14px; }
        .field { display: flex; flex-direction: column; gap: 6px; }
        .field-label {
          font-size: 11px;
          font-weight: 700;
          color: rgba(200,230,255,0.65);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .forgot-link {
          font-size: 11.5px;
          color: rgba(120,200,255,0.7);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .forgot-link:hover { color: #7dd3fc; text-decoration: underline; }

        .input-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 14px;
          height: 50px;
          border-radius: 14px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(120,180,255,0.18);
          transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
        }
        .input-wrap.focused {
          border-color: rgba(120,200,255,0.6);
          box-shadow: 0 0 0 3px rgba(120,200,255,0.12), 0 0 24px rgba(120,200,255,0.1);
          background: rgba(255,255,255,0.07);
        }
        .input-icon {
          width: 16px; height: 16px;
          color: rgba(120,200,255,0.45);
          flex-shrink: 0;
          transition: color 0.25s;
        }
        .input-wrap.focused .input-icon { color: rgba(120,200,255,0.9); }
        .auth-input {
          flex: 1; width: 100%;
          background: transparent;
          border: none; outline: none;
          color: #e0f2fe;
          font-size: 14px;
          font-family: inherit;
          caret-color: #7dd3fc;
        }
        .auth-input::placeholder { color: rgba(200,230,255,0.2); }

        /* CTA */
        .cta-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          height: 52px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(135deg, #3b82f6 0%, #38bdf8 55%, #67e8f9 100%);
          color: #05111f;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          letter-spacing: 0.02em;
          margin-top: 6px;
          box-shadow: 0 4px 28px rgba(56,189,248,0.4), 0 1px 0 rgba(255,255,255,0.25) inset;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
          font-family: inherit;
        }
        .cta-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #67e8f9 0%, #e0f2fe 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .cta-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 14px 40px rgba(56,189,248,0.55), 0 0 0 1px rgba(120,200,255,0.4);
        }
        .cta-btn:hover::before { opacity: 1; }
        .cta-btn:active { transform: translateY(-1px) scale(0.99); }
        .cta-btn > * { position: relative; z-index: 1; }

        /* Toggle */
        .toggle-text {
          text-align: center;
          font-size: 13px;
          color: rgba(200,230,255,0.4);
          margin-top: 22px;
        }
        .toggle-link {
          color: #7dd3fc;
          font-weight: 700;
          text-decoration: none;
          position: relative;
          transition: color 0.25s;
        }
        .toggle-link::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, #7dd3fc, #818cf8);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s;
        }
        .toggle-link:hover { color: #e0f2fe; }
        .toggle-link:hover::after { transform: scaleX(1); }
      `}</style>

      <div className="auth-root">
        {/* Animated background layers */}
        <div className="auth-grad" />
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
        <div className="auth-vignette" />

        {/* Canvas particle stars */}
        <canvas ref={canvasRef} className="auth-canvas" />

        {/* Radial glow behind card */}
        <div className="auth-glow" />

        {/* ── BACK TO HOME BUTTON ── */}
        <HomeLink className="back-btn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Home
        </HomeLink>

        {/* ── CARD ── */}
        <div className="auth-card">
          <div className="card-shimmer" />

          {/* Logo */}
          <div className="auth-logo">
            <div className="logo-icon">P</div>
            <span className="logo-name">Patronex</span>
          </div>

          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to continue to Patronex</p>

          {/* Social */}
          <div className="social-grid">
            <button 
              className="social-btn" 
              type="button" 
              onClick={async () => {
                try {
                  await auth.authStateReady();
                  const result = await signInWithPopup(auth, googleProvider);
                  if (result?.user) {
                    router.replace("/dashboard");
                  }
                } catch (err: unknown) {
                  setError(formatAuthError(err));
                }
              }}
            >
              <svg className="social-icon" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#4285F4" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button 
              className="social-btn" 
              type="button" 
              onClick={async () => {
                try {
                  await auth.authStateReady();
                  const result = await signInWithPopup(auth, githubProvider);
                  if (result?.user) {
                    router.replace("/dashboard");
                  }
                } catch (err: unknown) {
                  setError(formatAuthError(err));
                }
              }}
            >
              <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="divider">
            <span className="divider-line" />
            <span className="divider-text">or continue with email</span>
            <span className="divider-line" />
          </div>

          {/* Form */}
          <form className="fields" onSubmit={async (e) => {
            e.preventDefault();
            if (isLoading) return;
            setIsLoading(true);
            setError("");

            try {
              const res = await signInWithEmailAndPassword(auth, email, password);
              if (res.user) {
                router.replace("/dashboard");
                return;
              }
            } catch (err: any) {
              setError("Invalid email or password");
              setIsLoading(false);
            }
          }}>
            {error && <p style={{ color: "red", fontSize: "12px", textAlign: "center", margin: "0" }}>{error}</p>}
            <div className="field">
              <label htmlFor="email" className="field-label">Email</label>
              <div className={`input-wrap${focusedField === "email" ? " focused" : ""}`}>
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="auth-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="field">
              <div className="label-row">
                <label htmlFor="password" className="field-label">Password</label>
                <Link href="#" className="forgot-link">Forgot password?</Link>
              </div>
              <div className={`input-wrap${focusedField === "password" ? " focused" : ""}`}>
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="auth-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <button type="submit" className="cta-btn" disabled={isLoading}>
              <span>{isLoading ? "Signing In..." : "Sign In"}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>

          <p className="toggle-text">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="toggle-link">Sign up</Link>
          </p>
        </div>
      </div>
    </>
  );
}
