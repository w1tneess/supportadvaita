import React from 'react'
import { PAYMENT_CONFIG } from '../config/payment.js'
import { ExternalLink, GitFork, ArrowUpRight, Code, Laptop, BookOpen } from 'lucide-react'

export default function ProjectsShowcase({ onOpenBadgeModal }) {
  const getIcon = (type) => {
    switch (type) {
      case 'Website': return <Laptop className="w-4 h-4 text-[#C2956A]" />
      case 'Repository': return <Code className="w-4 h-4 text-[#C2956A]" />
      default: return <BookOpen className="w-4 h-4 text-[#C2956A]" />
    }
  }

  return (
    <section className="mt-12 pt-8 border-t border-[#262421]/80">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-lg font-bold text-[#F8F6F0] tracking-tight">
            Projects You're Fueling
          </h2>
          <p className="text-xs text-[#8E8A83] mt-0.5">
            Every contribution directly backs these open-source and creative works
          </p>
        </div>

        <button
          onClick={onOpenBadgeModal}
          className="self-start sm:self-auto text-xs font-mono-code text-[#C2956A] hover:text-[#DFC3A5] flex items-center gap-1 cursor-pointer"
        >
          <span>Connect your own repos</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PAYMENT_CONFIG.projects.map((proj) => (
          <div
            key={proj.id}
            className="group p-4 rounded-xl bg-[#151412] hover:bg-[#1A1916] border border-[#262421] hover:border-[#38342D] flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-[#22201C]">
                    {getIcon(proj.type)}
                  </span>
                  <span className="text-[11px] font-mono-code px-2 py-0.5 rounded-md bg-[#1C1A17] text-[#8E8A83] border border-[#262421]">
                    {proj.stars}
                  </span>
                </div>

                <a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8E8A83] hover:text-[#F8F6F0] p-1 transition-colors"
                  aria-label={`Open ${proj.name}`}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <h3 className="text-sm font-bold text-[#F8F6F0] group-hover:text-[#C2956A] transition-colors mb-1">
                {proj.name}
              </h3>
              <p className="text-xs text-[#8E8A83] leading-relaxed mb-3">
                {proj.description}
              </p>
            </div>

            <div className="pt-2 border-t border-[#22201C] flex flex-wrap gap-1.5">
              {proj.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-[#1C1A17] text-[#736F68]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
