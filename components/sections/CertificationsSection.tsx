'use client'

import { useState } from 'react'
import { portfolioData } from '@/lib/portfolio-data'
import { X, Award, ChevronLeft, ChevronRight } from 'lucide-react'

export function CertificationsSection() {
  const { certifications, additionalTraining } = portfolioData
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  if (!certifications || certifications.length === 0) return null

  const close = () => setActiveIndex(null)
  const prev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveIndex((i) => (i === null ? null : (i - 1 + certifications.length) % certifications.length))
  }
  const next = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveIndex((i) => (i === null ? null : (i + 1) % certifications.length))
  }

  const active = activeIndex !== null ? certifications[activeIndex] : null

  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-slideUp">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Certifications
          </h2>
          <p className="text-lg text-foreground/70">
            Compliance & risk training — click any certificate to view it in full
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {certifications.map((cert, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="group text-left bg-card rounded-lg border border-border overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-slideUp"
              style={{ animationDelay: `${index * 60}ms` }}
              aria-label={`View certificate: ${cert.title}`}
            >
              <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs font-semibold bg-black/60 px-3 py-1.5 rounded-full">
                    View
                  </span>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
                  {cert.title}
                </p>
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-foreground/60">
                  <Award className="w-3.5 h-3.5 text-primary" />
                  <span>{cert.date}</span>
                  {cert.score && <span>· {cert.score}</span>}
                </div>
              </div>
            </button>
          ))}
        </div>

        {additionalTraining && additionalTraining.length > 0 && (
          <div className="mt-10 text-center animate-slideUp">
            <p className="text-sm font-semibold text-foreground/60 uppercase tracking-wide mb-4">
              Additional Training Completed (Certificate Not on File)
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {additionalTraining.map((item, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-muted text-foreground/70 border border-border"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox — view only, no download affordance */}
      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prev}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            aria-label="Previous certificate"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            aria-label="Next certificate"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="max-w-3xl w-full max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.image}
              alt={active.title}
              className="max-h-[70vh] w-auto rounded-lg shadow-2xl select-none"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
            <div className="mt-4 text-center">
              <p className="text-white font-semibold">{active.title}</p>
              <p className="text-white/60 text-sm mt-1">
                {active.date}
                {active.score ? ` · Score: ${active.score}` : ''}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
