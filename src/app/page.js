"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Mail, Phone, Linkedin, Github, ExternalLink, ArrowUpRight, ChevronRight, Zap, Cloud, Code2, Brain, Terminal, Layers } from "lucide-react";
import { useState, useRef, useEffect } from "react";

/* ─── tiny helpers ─────────────────────────────────────────────────────── */
const cx = (...classes) => classes.filter(Boolean).join(" ");

/* ─── data ──────────────────────────────────────────────────────────────── */
const NAV_LINKS = ["Skills", "Services", "Projects", "Hackathons", "Plan", "Contact"];

const SKILLS = [
  {
    icon: Brain,
    title: "AI / ML",
    color: "#38bdf8",
    items: ["Large Language Models", "Fine-Tuning & RLHF", "Computer Vision", "NLP Pipelines"],
  },
  {
    icon: Cloud,
    title: "Cloud",
    color: "#818cf8",
    items: ["AWS Architecture", "Serverless (Lambda)", "S3 & CloudFront", "CI/CD Pipelines"],
  },
  {
    icon: Code2,
    title: "Full-Stack",
    color: "#34d399",
    items: ["Next.js / React", "Node.js & REST APIs", "Python (FastAPI)", "PostgreSQL & Redis"],
  },
];

const SERVICES = [
  {
    num: "01",
    title: "AI Integration",
    desc: "Embed LLMs, vision models, and intelligent automation into your existing product stack.",
  },
  {
    num: "02",
    title: "Cloud Architecture",
    desc: "Design and deploy scalable, cost-efficient serverless infra on AWS tailored to your workload.",
  },
  {
    num: "03",
    title: "Full-Stack Development",
    desc: "End-to-end web applications from pixel-perfect UI to resilient backend services.",
  },
  {
    num: "04",
    title: "Automation & Agents",
    desc: "Build autonomous agents that streamline repetitive workflows and surface actionable insights.",
  },
];

const PROJECTS = [
  {
    name: "Prathinidhi",
    subtitle: "AI Job Application Agent",
    desc: "An autonomous agent that parses your resume, matches it semantically to job descriptions, auto-fills applications, and tracks submission status — reducing application time by 85%.",
    tags: ["LangChain", "OpenAI", "Playwright", "FastAPI"],
    year: "2025",
  },
  {
    name: "DailyVerse",
    subtitle: "Multimodal Content Generator",
    desc: "Generates context-aware, SEO-optimised blog posts from a mix of text prompts and uploaded images using a fine-tuned multimodal pipeline and a Next.js editor.",
    tags: ["GPT-4V", "Next.js", "AWS S3", "Tailwind"],
    year: "2025",
  },

];

const HACKATHONS = [
  { event: "Bhasha Bandu Hackathon", position: "Top 100 finalist", project: "Prathinidhi Agent", prize: "Azure Credits" },
  { event: "HackHazards '25", position: "Top 100 finalist", project: "DailyVerse", prize: "GCP Credits & goodies" },
];

const ROADMAP = [
  { q: "Q1 2025", title: "Agentic Workflows", desc: "Ship a multi-agent orchestration framework for enterprise task automation." },
  { q: "Q2 2025", title: "Open-Source SDK", desc: "Release a developer SDK for rapid LLM-powered SaaS bootstrapping." },
  { q: "Q3 2025", title: "AI Consulting", desc: "Launch a boutique AI consultancy focused on mid-market transformation." },
  { q: "Q4 2025", title: "Research & Publications", desc: "Submit a paper on efficient fine-tuning strategies for domain-specific LLMs." },
];

/* ─── sub-components ─────────────────────────────────────────────────────── */

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => setHovered(!!e.target.closest("a,button,[data-hover]"));
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[999] mix-blend-difference"
      animate={{ x: pos.x - (hovered ? 20 : 8), y: pos.y - (hovered ? 20 : 8), scale: 1 }}
      transition={{ type: "spring", stiffness: 1000, damping: 35 }}
    >
      <div className={cx("rounded-full bg-white transition-all duration-200", hovered ? "w-10 h-10" : "w-4 h-4")} />
    </motion.div>
  );
}

function Noise() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "200px",
      }}
    />
  );
}

function GlowOrb({ className }) {
  return (
    <div aria-hidden className={cx("absolute rounded-full blur-[120px] opacity-20 pointer-events-none", className)} />
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

function SectionLabel({ children }) {
  return (
    <motion.p {...fadeUp(0)} className="text-xs font-mono tracking-[0.25em] uppercase text-sky-400 mb-3">
      {children}
    </motion.p>
  );
}

function SectionHeading({ children }) {
  return (
    <motion.h2 {...fadeUp(0.08)} className="text-4xl md:text-5xl font-extrabold tracking-tight mb-16">
      {children}
    </motion.h2>
  );
}

/* ─── main component ─────────────────────────────────────────────────────── */
export default function Portfolio() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [activeNav, setActiveNav] = useState(null);

  return (
    <div className="bg-[#080c14] text-white min-h-screen font-sans antialiased cursor-none overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { cursor: none !important; }
        body { font-family: 'DM Sans', sans-serif; }
        h1,h2,h3,h4,h5,nav { font-family: 'Syne', sans-serif; }
        :root {
          --accent: #38bdf8;
          --accent2: #818cf8;
          --surface: rgba(255,255,255,0.03);
          --border: rgba(255,255,255,0.08);
        }
      `}</style>

      <Cursor />
      <Noise />

      {/* ── NAVBAR ─────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/[0.06] bg-[#080c14]/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <span className="text-lg font-bold tracking-tight">
            <span className="text-sky-400">G</span>unda Sai Teja
          </span>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="relative hover:text-white transition-colors duration-200 group"
              >
                {link}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-sky-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase border border-white/20 px-4 py-2 rounded-full hover:bg-white/5 hover:border-sky-400/50 transition-all duration-200"
          >
            Hire Me <ArrowUpRight size={12} />
          </a>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center items-start px-6 md:px-20 overflow-hidden">
        <GlowOrb className="w-[600px] h-[600px] bg-sky-500 -top-40 -right-40" />
        <GlowOrb className="w-[400px] h-[400px] bg-indigo-600 bottom-10 left-10" />

        {/* grid lines */}
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono tracking-[0.3em] uppercase text-sky-400 mb-6 flex items-center gap-2"
          >
            <span className="w-8 h-px bg-sky-400" />
            Available for freelance & collaborations
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-8"
          >
            Building
            <br />
            <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Intelligent
            </span>
            <br />
            Systems.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-white/50 text-lg md:text-xl max-w-xl leading-relaxed mb-12"
          >
            AI engineer & full-stack developer crafting scalable, production-ready solutions that merge machine intelligence with real-world impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-sky-400 text-slate-950 font-semibold text-sm px-6 py-3 rounded-full hover:bg-sky-300 transition-colors"
            >
              View Work <ArrowUpRight size={14} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-white/20 text-sm px-6 py-3 rounded-full hover:bg-white/5 transition-colors"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>

        {/* scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-xs font-mono tracking-widest uppercase">scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── SKILLS ─────────────────────────────────────────────────────── */}
      <section id="skills" className="relative py-28 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Expertise</SectionLabel>
          <SectionHeading>Skills & Tech Stack</SectionHeading>

          <div className="grid md:grid-cols-3 gap-6">
            {SKILLS.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={i}
                  {...fadeUp(i * 0.1)}
                  data-hover
                  whileHover={{ y: -4 }}
                  className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-white/20 transition-all duration-300 overflow-hidden"
                >
                  {/* hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${skill.color}18, transparent 70%)` }}
                  />

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${skill.color}18`, border: `1px solid ${skill.color}30` }}>
                      <Icon size={18} style={{ color: skill.color }} />
                    </div>
                    <h3 className="text-lg font-bold" style={{ color: skill.color }}>{skill.title}</h3>
                  </div>

                  <ul className="space-y-3">
                    {skill.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-white/60 text-sm">
                        <ChevronRight size={12} style={{ color: skill.color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────────────────── */}
      <section id="services" className="relative py-28 px-6 md:px-20 border-t border-white/[0.06]">
        <GlowOrb className="w-[500px] h-[500px] bg-indigo-600 -left-40 top-0" />
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionLabel>What I Do</SectionLabel>
          <SectionHeading>Services</SectionHeading>

          <div className="grid md:grid-cols-2 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
            {SERVICES.map((service, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.08)}
                data-hover
                className="group p-10 bg-[#080c14] hover:bg-white/[0.03] transition-colors duration-300 relative"
              >
                <div className="absolute top-8 right-8 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={12} className="text-sky-400" />
                </div>
                <span className="text-xs font-mono text-white/20 mb-4 block">{service.num}</span>
                <h3 className="text-xl font-bold mb-3 group-hover:text-sky-400 transition-colors">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ───────────────────────────────────────────────────── */}
      <section id="projects" className="relative py-28 px-6 md:px-20 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Portfolio</SectionLabel>
          <div className="flex items-end justify-between mb-16">
            <SectionHeading>Featured Projects</SectionHeading>
          </div>

          <div className="space-y-6">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                data-hover
                whileHover={{ x: 4 }}
                className="group flex flex-col md:flex-row md:items-center gap-6 p-8 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-sky-400/20 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="md:w-16 text-right shrink-0">
                  <span className="text-xs font-mono text-white/20">{project.year}</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-sky-400 transition-colors">{project.name}</h3>
                      <span className="text-xs text-white/40">{project.subtitle}</span>
                    </div>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mb-4 max-w-2xl">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/[0.06] text-white/50 border border-white/[0.06]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-sky-400/50 group-hover:bg-sky-400/10 transition-all">
                    <ExternalLink size={14} className="text-white/30 group-hover:text-sky-400 transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HACKATHONS ─────────────────────────────────────────────────── */}
      <section id="hackathons" className="relative py-28 px-6 md:px-20 border-t border-white/[0.06]">
        <GlowOrb className="w-[400px] h-[400px] bg-sky-600 right-0 top-0" />
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionLabel>Competitions</SectionLabel>
          <SectionHeading>Hackathon Wins</SectionHeading>

          <div className="grid md:grid-cols-3 gap-6">
            {HACKATHONS.map((h, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                data-hover
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-white/20 transition-all duration-300"
              >
                <div className="text-3xl mb-4">{h.position.split(" ")[0]}</div>
                <div className="text-xs font-mono text-white/30 mb-2 tracking-widest uppercase">{h.event}</div>
                <h3 className="font-bold text-lg mb-1">{h.position.split(" ").slice(1).join(" ")}</h3>
                <p className="text-white/50 text-sm mb-4">{h.project}</p>
                <div className="inline-flex items-center gap-1 text-xs font-mono bg-sky-400/10 text-sky-400 px-3 py-1 rounded-full border border-sky-400/20">
                  <Zap size={10} /> {h.prize}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROADMAP ────────────────────────────────────────────────────── */}
      <section id="plan" className="relative py-28 px-6 md:px-20 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Vision</SectionLabel>
          <SectionHeading>2025 Roadmap</SectionHeading>

          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-px bg-white/[0.08] -translate-x-px" />

            <div className="space-y-12">
              {ROADMAP.map((item, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(i * 0.1)}
                  className={cx(
                    "relative flex items-start gap-8",
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  {/* dot */}
                  <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-sky-400 border-4 border-[#080c14] z-10 mt-1" />

                  <div className={cx("pl-8 md:pl-0 md:w-1/2", i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16")}>
                    <span className="text-xs font-mono text-sky-400 tracking-widest mb-2 block">{item.q}</span>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────────────────── */}
      <section id="contact" className="relative py-28 px-6 md:px-20 border-t border-white/[0.06]">
        <GlowOrb className="w-[600px] h-[600px] bg-sky-500 left-1/2 -translate-x-1/2 -bottom-40" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SectionLabel>Get in Touch</SectionLabel>
          <motion.h2 {...fadeUp(0.08)} className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Let's build something
            <br />
            <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">remarkable.</span>
          </motion.h2>
          <motion.p {...fadeUp(0.15)} className="text-white/40 text-lg mb-14 max-w-xl mx-auto leading-relaxed">
            Whether you have a product idea, a technical challenge, or just want to explore what's possible — I'd love to hear from you.
          </motion.p>

          <motion.div {...fadeUp(0.2)} className="flex flex-wrap justify-center gap-4 mb-16">
            {[
              { icon: Mail, label: "Email", href: "mailto:saiteja85@gmail.com" },
              { icon: Phone, label: "Phone", href: "tel:+916281363756" },
              { icon: Linkedin, label: "Linkedin", href: "https://www.linkedin.com/in/sai-teja-gunda-853454280/" },
              { icon: Github, label: "Github", href: "https://github.com/Teja616" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="group flex items-center gap-3 px-5 py-3 rounded-full border border-white/10 bg-white/[0.03] hover:border-sky-400/40 hover:bg-sky-400/5 transition-all duration-200 text-sm text-white/60 hover:text-white"
              >
                <Icon size={14} className="text-sky-400" />
                {label}
              </a>
            ))}
          </motion.div>

          <motion.a
            {...fadeUp(0.28)}
            href="mailto:saiteja85@gmail.com"
            data-hover
            className="inline-flex items-center gap-3 bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-bold text-sm px-10 py-4 rounded-full hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            Start a Conversation <ArrowUpRight size={14} />
          </motion.a>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] py-8 px-6 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-xs font-mono">
          <span>© {new Date().getFullYear()} Gunda Sai Teja — All rights reserved.</span>
          <span className="flex items-center gap-2">
            <Terminal size={10} /> Built with Next.js & Framer Motion
          </span>
        </div>
      </footer>
    </div>
  );
}