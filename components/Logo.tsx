export function Logo() {
  return (
    <a href="#" className="flex items-center gap-2.5 group">
      <span className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent text-white font-bold text-sm shadow-md group-hover:shadow-lg transition-shadow duration-300 shrink-0">
        UA
      </span>
      <span className="text-xl font-bold text-primary hidden sm:inline">
        Umair Ahmed
      </span>
    </a>
  )
}
