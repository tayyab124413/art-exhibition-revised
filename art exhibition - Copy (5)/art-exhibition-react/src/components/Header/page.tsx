interface HeaderProps {
  badge?: string
  title: string
  titleAccent?: string
  subtitle?: string
  children?: React.ReactNode
}

export default function Header({ badge, title, titleAccent, subtitle, children }: HeaderProps) {
  return (
    <div className="hero-section">
      {badge && <div className="hero-badge">{badge}</div>}
      <h1>
        {title} {titleAccent && <span>{titleAccent}</span>}
      </h1>
      {subtitle && <p>{subtitle}</p>}
      {children}
    </div>
  )
}
