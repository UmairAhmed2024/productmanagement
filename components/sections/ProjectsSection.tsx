'use client'

import { useState } from 'react'
import { portfolioData } from '@/lib/portfolio-data'
import { ProjectCard } from '@/components/ProjectCard'
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react'

export function ProjectsSection() {
  const { projects } = portfolioData
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [pageIndex, setPageIndex] = useState(0)

  if (!projects || projects.length === 0) return null

  const active = activeIndex !== null ? projects[activeIndex] : null
  const pages = active?.docViews || []

  const close = () => {
    setActiveIndex(null)
    setPageIndex(0)
  }
  const openViewer = (index: number) => {
    setActiveIndex(index)
    setPageIndex(0)
  }
  const prevPage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPageIndex((p) => (p - 1 + pages.length) % pages.length)
  }
  const nextPage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPageIndex((p) => (p + 1) % pages.length)
  }

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-slideUp">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Projects & Work Samples
          </h2>
          <p className="text-lg text-foreground/70">
            Real product artefacts — click any card to view the document, or download it directly
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="animate-slideUp"
              style={{ animationDelay: `${Math.min(index, 10) * 80}ms` }}
            >
              <ProjectCard {...project} onView={() => openViewer(index)} />
            </div>
          ))}
        </div>
      </div>

      {/* Document viewer — view AND download, unlike certifications */}
      {active && pages.length > 0 && (
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

          {pages.length > 1 && (
            <>
              <button
                onClick={prevPage}
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextPage}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                aria-label="Next page"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div
            className="max-w-3xl w-full max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pages[pageIndex]}
              alt={`${active.title} — page ${pageIndex + 1}`}
              className="max-h-[65vh] w-auto rounded-lg shadow-2xl select-none border border-white/10"
              draggable={false}
            />
            <div className="mt-4 text-center max-w-xl">
              <p className="text-white font-semibold">{active.title}</p>
              {pages.length > 1 && (
                <p className="text-white/50 text-xs mt-1">
                  Page {pageIndex + 1} of {pages.length}
                </p>
              )}
              {active.file && (
                <a
                  href={active.file.path}
                  download
                  className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                >
                  <Download className="w-4 h-4" />
                  {active.file.label || 'Download'}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
