"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

const Section = ({ id, title, children }) => (
  <section id={id} className="py-20 px-6 md:px-16">
    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-3xl md:text-4xl font-bold mb-12 text-center"
    >
      {title}
    </motion.h2>
    {children}
  </section>
);

export default function Portfolio() {
  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white font-sans">
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-bold tracking-wide">Gunda Sai Teja</h1>
          <div className="space-x-6 text-sm">
            <a href="#skills" className="hover:text-cyan-400">Skills</a>
            <a href="#services" className="hover:text-cyan-400">Services</a>
            <a href="#projects" className="hover:text-cyan-400">Projects</a>
            <a href="#hackathons" className="hover:text-cyan-400">Hackathons</a>
            <a href="#roadmap" className="hover:text-cyan-400">Plan</a>
            <a href="#contact" className="hover:text-cyan-400">Contact</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text"
        >
          Building Intelligent Digital Systems
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl text-gray-300"
        >
          AI • Cloud • Automation • Full‑Stack Development — Crafting scalable
          solutions that merge innovation with real‑world impact.
        </motion.p>
      </section>

      {/* SKILLS */}
      <Section id="skills" title="Skills & Tech Stack">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "AI / ML",
              items: ["LLMs", "Fine‑Tuning", "Computer Vision", "NLP"],
            },
            {
              title: "Cloud",
              items: ["AWS", "Serverless", "S3", "Lambda"],
            },
            {
              title: "Development",
              items: ["Next.js", "React", "Node.js", "Python"],
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg shadow-xl"
            >
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">
                {card.title}
              </h3>
              <ul className="space-y-2 text-gray-300">
                {card.items.map((item, j) => (
                  <li key={j}>• {item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" title="Projects">
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {[
            {
              name: "Prathinidhi - AI Job Application Agent",
              desc: "Automates job applications using resume intelligence.",
            },
            {
              name: "DailyVerse Multimodal Generator",
              desc: "Generates personalized blogs from text & images.",
            },
          ].map((project, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">
                {project.name}
              </h3>
              <p className="text-gray-300">{project.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Contact">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-gray-300">
            Let’s collaborate on building next‑generation intelligent systems.
          </p>

          <div className="flex justify-center gap-6">
            <Mail />
            <Phone />
            <Linkedin />
            <Github />
          </div>
        </div>
      </Section>

      <footer className="text-center py-6 border-t border-white/10 text-gray-400 text-sm">
        © {new Date().getFullYear()} — Built with Next.js
      </footer>
    </div>
  );
}
