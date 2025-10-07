"use client"

import type React from "react"
import { memo, useCallback, useState } from "react"

// Helper components with refined icons
const ChevronDown = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)

const Badge = ({
  children,
  className = "",
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "secondary" | "outline"
}) => {
  const variants = {
    default:
      "bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 backdrop-blur-sm",
    secondary:
      "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 backdrop-blur-sm",
    outline:
      "border border-slate-300 bg-transparent hover:bg-slate-100 text-slate-900 dark:border-white/20 dark:hover:bg-white/5 dark:text-white backdrop-blur-sm",
  }

  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}

// --- TYPES ---
type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>

interface TimelineItemData {
  id: string
  title: string
  type: string
  duration: string
  icon: IconType
  responsibilities: string[]
  skills: string[]
}

type ExpandMode = "multi" | "single"

interface ProfessionalTimelineProps {
  data: TimelineItemData[]
  defaultExpandedIds?: string[]
  expandMode?: ExpandMode
}

// --- COMPONENTS ---
interface TimelineItemContentProps {
  item: TimelineItemData
}

const TimelineItemContent = memo(function TimelineItemContent({ item }: TimelineItemContentProps) {
  return (
    <div className="mt-6 space-y-6 animate-in slide-in-from-top-1 duration-200">
      {/* Responsibilities */}
      <div className="space-y-3">
        {item.responsibilities.map((responsibility, idx) => (
          <div key={`${item.id}-resp-${idx}`} className="flex items-start gap-3 group">
            <div className="w-1.5 h-1.5 bg-slate-700 dark:bg-white rounded-full mt-2 flex-shrink-0 group-hover:shadow-[0_0_8px_rgba(100,116,139,0.8)] dark:group-hover:shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-200" />
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{responsibility}</p>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200 dark:border-white/10">
        {item.skills.map((skill, skillIdx) => (
          <Badge key={`${item.id}-skill-${skillIdx}`} variant="secondary">
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  )
})
TimelineItemContent.displayName = "TimelineItemContent"

const FourPointStar = ({ filled = false, className = "" }: { filled?: boolean; className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="miter"
    />
  </svg>
)

interface TimelineItemProps {
  item: TimelineItemData
  expanded: boolean
  onToggle: (id: string) => void
  index: number
}

const TimelineItem = memo(function TimelineItem({ item, expanded, onToggle }: TimelineItemProps) {
  const Icon = item.icon
  const headerId = `timeline-header-${item.id}`
  const contentId = `timeline-content-${item.id}`
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
       <div className="absolute left-[16px] top-10 bottom-0 w-[1px] overflow-hidden transform -translate-x-1/2">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-400 via-slate-300 to-slate-200 dark:from-white/80 dark:via-white/40 dark:to-white/20" />
          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-600 to-transparent dark:via-white animate-[shimmer_1s_ease-in-out_infinite]" />
          )}
      </div>

      <div className="absolute left-[18px] top-6 transform -translate-x-1/2 z-10 transition-all duration-300">
        <FourPointStar
          filled={isHovered}
          className={`text-slate-700 dark:text-white transition-all duration-300 ${
            isHovered
              ? "drop-shadow-[0_0_8px_rgba(100,116,139,0.8)] dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.9)] scale-110"
              : ""
          }`}
        />
      </div>

      {/* Main content card */}
      <div className="ml-12 mb-8">
        <div
          className={`
          bg-white/80 dark:bg-white/5 backdrop-blur-md
          rounded-lg border border-slate-200 dark:border-white/10
          transition-all duration-200
          ${expanded ? "shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]" : "shadow-md hover:shadow-lg dark:shadow-none dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"}
        `}
        >
          {/* Header */}
          <button
            id={headerId}
            className="w-full text-left p-4 sm:p-6 group/button cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors duration-200 rounded-t-lg"
            onClick={() => onToggle(item.id)}
            aria-expanded={expanded}
            aria-controls={contentId}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="p-2 bg-slate-200 dark:bg-white/10 rounded-md backdrop-blur-sm flex-shrink-0">
                    <Icon className="w-4 h-4 text-slate-900 dark:text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white break-words">{item.title}</h3>
                </div>

                <div className="flex items-center gap-3 ml-0 sm:ml-11 flex-wrap">
                  <Badge variant="outline" className="text-xs">
                    {item.type}
                  </Badge>
                  <span className="text-xs text-slate-600 dark:text-slate-300">{item.duration}</span>
                </div>
              </div>

              <div
                className={`
                text-slate-600 dark:text-white/60 flex-shrink-0
                transition-transform duration-200
                ${expanded ? "rotate-180" : ""}
              `}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </button>

          {/* Expandable content */}
          {expanded && (
            <div
              id={contentId}
              role="region"
              aria-labelledby={headerId}
              className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-slate-200 dark:border-white/10"
            >
              <TimelineItemContent item={item} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
})
TimelineItem.displayName = "TimelineItem"

// --- MAIN TIMELINE ---
export function ProfessionalTimeline({ data, defaultExpandedIds, expandMode = "multi" }: ProfessionalTimelineProps) {
  const initial = defaultExpandedIds ?? data.map((item) => item.id)
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(initial))

  const onToggle = useCallback(
    (id: string) => {
      setExpanded((prev) => {
        const next = new Set(prev)
        if (expandMode === "single") {
          return prev.has(id) ? new Set() : new Set([id])
        }
        if (next.has(id)) {
          next.delete(id)
        } else {
          next.add(id)
        }
        return next
      })
    },
    [expandMode],
  )

  return (
    <div className="relative">
      {data.map((item, index) => (
        <TimelineItem key={item.id} item={item} expanded={expanded.has(item.id)} onToggle={onToggle} index={index} />
      ))}
    </div>
  )
}
