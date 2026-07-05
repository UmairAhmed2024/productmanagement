'use client'

import { useState } from 'react'
import { portfolioData } from '@/lib/portfolio-data'
import { GraduationCap, X, FileCheck } from 'lucide-react'

export function EducationSection() {
  const { education } = portfolioData
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const active = activeIndex !== null ? education[activeIndex] : null

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-slideUp">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Education
          </h2>
          <p className="text-lg text-foreground/70">
            Academic foundation behind the work
          </p>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-7 h-7 text-primary" />
            <h3 className="text-3xl font-bold text-foreground">Education</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <div
                key={index}
                className="animate-slideUp bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {edu.markSheet?.image && (
                  <button
                    onClick={() => setActiveIndex(index)}
                    className="group relative w-full aspect-[16/9] bg-muted overflow-hidden block"
                    aria-label={`View ${edu.markSheet.label || 'document'} for ${edu.degree}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={edu.markSheet.image}
                      alt={`${edu.degree} — ${edu.markSheet.label || 'document'}`}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs font-semibold bg-black/60 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <FileCheck className="w-3.5 h-3.5" />
                        {edu.markSheet.label || 'View Document'}
                      </span>
                    </div>
                  </button>
                )}

                <div className="p-8 space-y-3">
                  <div className="inline-block px-3 py-1 bg-primary/10 rounded-full">
                    <span className="text-sm font-semibold text-primary">{edu.graduationYear}</span>
                  </div>
                  <h4 className="text-xl font-bold text-foreground">{edu.degree}</h4>
                  <p className="text-primary font-semibold">{edu.institution}</p>
                  {edu.gpa && <p className="text-sm text-foreground/70">GPA: {edu.gpa}</p>}
                  {edu.details && <p className="text-sm text-foreground/70 italic">{edu.details}</p>}

                  {edu.markSheet?.meta && edu.markSheet.meta.length > 0 && (
                    <div className="pt-3 mt-3 border-t border-border/50 grid grid-cols-2 gap-y-2 gap-x-3">
                      {edu.markSheet.meta.map((m, i) => (
                        <div key={i} className="min-w-0">
                          <p className="text-[11px] uppercase tracking-wide text-foreground/45 font-semibold">{m.label}</p>
                          <p className="text-xs text-foreground/75 leading-snug">{m.value}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mark sheet / degree certificate viewer — view only, no download */}
      {active?.markSheet?.image && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setActiveIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setActiveIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="max-w-2xl w-full max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.markSheet.image}
              alt={active.degree}
              className="max-h-[75vh] w-auto rounded-lg shadow-2xl select-none"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
            <p className="text-white font-semibold mt-4 text-center">{active.degree}</p>
            <p className="text-white/60 text-sm text-center">{active.institution}</p>
          </div>
        </div>
      )}
    </section>
  )
}
