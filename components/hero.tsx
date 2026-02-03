"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
} from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"
import {
  ArrowRight,
  Fingerprint,
  KeyRound,
  Lock,
  Server,
  Shield,
  ShieldCheck,
} from "lucide-react"

const BACKGROUND_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2399ccff' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`

type FloatingIconConfig = {
  id: string
  icon: LucideIcon
  initial: { x: number; y: number }
  size: number
  parallax: number
  color: string
  background: string
  border: string
  pullRadius: number
  pullIntensity: number
  wobbleAmplitude: number
  wobbleFrequency: number
  wobblePhase: number
  rotationRange: number
  rotationSpeed: number
  infoKey: HeroInfoKey
}

type HeroInfoKey = "shield" | "lock" | "fingerprint" | "server" | "key"

const heroInfoContent: Record<
  HeroInfoKey,
  {
    title: string
    description: string
    highlights: string[]
    href: string
    cta: string
  }
> = {
  shield: {
    title: "Arquitetura de Proteção",
    description: "Desenhamos camadas de segurança, políticas e controles aderentes ao seu negócio.",
    highlights: ["Roadmap Zero Trust", "Políticas alinhadas à LGPD", "Monitoramento proativo"],
    href: "#servicos",
    cta: "Ver planos de proteção",
  },
  lock: {
    title: "Governança & Compliance",
    description: "Suporte para frameworks SOC 2, ISO 27001, NIST e programas de auditoria contínua.",
    highlights: ["Documentação guiada", "Assessment de controles", "Workshops executivos"],
    href: "#servicos",
    cta: "Explorar governança",
  },
  fingerprint: {
    title: "Resposta a Incidentes",
    description: "Playbooks táticos, caça a ameaças e condução de resposta 24/7.",
    highlights: ["Runbooks dedicados", "Coordenação com CSIRT", "Suporte forense inicial"],
    href: "#contato",
    cta: "Solicitar pronto atendimento",
  },
  server: {
    title: "Infraestrutura Segura",
    description: "Hardening de servidores, cloud e redes com testes de intrusão contínuos.",
    highlights: ["Pentest recorrente", "Hardening multi-cloud", "Monitoramento de ativos"],
    href: "#servicos",
    cta: "Detalhes de infraestrutura",
  },
  key: {
    title: "Treinamento & Cultura",
    description: "Preparação de equipes, simulações de phishing e capacitação técnica especializada.",
    highlights: ["Tabletop exercises", "Campanhas anti-phishing", "Mentoria para squads"],
    href: "#servicos",
    cta: "Planejar treinamentos",
  },
}

const floatingIcons: FloatingIconConfig[] = [
  {
    id: "shield",
    icon: Shield,
    initial: { x: 18, y: 34 },
    size: 76,
    parallax: 0.45,
    color: "rgba(96, 165, 250, 0.95)",
    background: "rgba(59, 130, 246, 0.08)",
    border: "rgba(59, 130, 246, 0.35)",
    pullRadius: 32,
    pullIntensity: 0.45,
    wobbleAmplitude: 14,
    wobbleFrequency: 0.5,
    wobblePhase: 0.2,
    rotationRange: 4,
    rotationSpeed: 0.35,
    infoKey: "shield",
  },
  {
    id: "lock",
    icon: Lock,
    initial: { x: 71, y: 26 },
    size: 62,
    parallax: 0.38,
    color: "rgba(191, 219, 254, 0.95)",
    background: "rgba(30, 64, 175, 0.2)",
    border: "rgba(147, 197, 253, 0.4)",
    pullRadius: 30,
    pullIntensity: 0.55,
    wobbleAmplitude: 10,
    wobbleFrequency: 0.65,
    wobblePhase: 1,
    rotationRange: 6,
    rotationSpeed: 0.5,
    infoKey: "lock",
  },
  {
    id: "fingerprint",
    icon: Fingerprint,
    initial: { x: 84, y: 60 },
    size: 70,
    parallax: 0.55,
    color: "rgba(248, 250, 252, 0.95)",
    background: "rgba(59, 130, 246, 0.12)",
    border: "rgba(148, 163, 184, 0.4)",
    pullRadius: 36,
    pullIntensity: 0.6,
    wobbleAmplitude: 16,
    wobbleFrequency: 0.42,
    wobblePhase: 2.4,
    rotationRange: 8,
    rotationSpeed: 0.3,
    infoKey: "fingerprint",
  },
  {
    id: "server",
    icon: Server,
    initial: { x: 26, y: 70 },
    size: 66,
    parallax: 0.4,
    color: "rgba(94, 234, 212, 0.95)",
    background: "rgba(13, 148, 136, 0.18)",
    border: "rgba(45, 212, 191, 0.35)",
    pullRadius: 34,
    pullIntensity: 0.5,
    wobbleAmplitude: 12,
    wobbleFrequency: 0.48,
    wobblePhase: 3.5,
    rotationRange: 5,
    rotationSpeed: 0.4,
    infoKey: "server",
  },
  {
    id: "key",
    icon: KeyRound,
    initial: { x: 50, y: 18 },
    size: 58,
    parallax: 0.5,
    color: "rgba(250, 204, 21, 0.95)",
    background: "rgba(234, 179, 8, 0.18)",
    border: "rgba(251, 191, 36, 0.45)",
    pullRadius: 28,
    pullIntensity: 0.65,
    wobbleAmplitude: 11,
    wobbleFrequency: 0.7,
    wobblePhase: 4.2,
    rotationRange: 7,
    rotationSpeed: 0.55,
    infoKey: "key",
  },
]

export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null)
  const iconRefs = useRef<Record<HeroInfoKey, HTMLDivElement | null>>({
    shield: null,
    lock: null,
    fingerprint: null,
    server: null,
    key: null,
  })
  const targetRef = useRef({ x: 50, y: 50 })
  const animationFrameRef = useRef<number>()
  const timeRef = useRef(0)
  const infoTimeoutRef = useRef<number>()
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 })
  const [isPointerActive, setIsPointerActive] = useState(false)
  const [heroSize, setHeroSize] = useState({ width: 0, height: 0 })
  const [activeInfo, setActiveInfo] = useState<HeroInfoKey | null>(null)

  const handleMouseMove = useCallback((event: ReactMouseEvent<HTMLElement>) => {
    if (!heroRef.current) return

    const rect = heroRef.current.getBoundingClientRect()
    const relativeX = ((event.clientX - rect.left) / rect.width) * 100
    const relativeY = ((event.clientY - rect.top) / rect.height) * 100

    targetRef.current = {
      x: Math.min(100, Math.max(0, relativeX)),
      y: Math.min(100, Math.max(0, relativeY)),
    }

    if (!isPointerActive) {
      setIsPointerActive(true)
    }
  }, [isPointerActive])

  const handleMouseLeave = useCallback(() => {
    setIsPointerActive(false)
    targetRef.current = { x: 50, y: 50 }
  }, [])

  const handleIconInfo = useCallback((infoKey: HeroInfoKey) => {
    setActiveInfo((current) => {
      const next = current === infoKey ? null : infoKey
      if (infoTimeoutRef.current) {
        window.clearTimeout(infoTimeoutRef.current)
      }
      if (next) {
        infoTimeoutRef.current = window.setTimeout(() => setActiveInfo(null), 7000)
      }
      return next
    })
  }, [])

  const handleInfoClose = useCallback(() => {
    setActiveInfo(null)
    if (infoTimeoutRef.current) {
      window.clearTimeout(infoTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    const node = heroRef.current
    if (!node) return

    const updateSize = () => {
      const rect = node.getBoundingClientRect()
      setHeroSize({ width: rect.width, height: rect.height })
    }

    updateSize()

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(() => updateSize())
      observer.observe(node)
      return () => observer.disconnect()
    }

    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  useEffect(() => {
    const animate = () => {
      timeRef.current = performance.now() / 1000
      setCursorPosition((current) => ({
        x: current.x + (targetRef.current.x - current.x) * 0.08,
        y: current.y + (targetRef.current.y - current.y) * 0.08,
      }))
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (infoTimeoutRef.current) {
        window.clearTimeout(infoTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!activeInfo) return

    const handlePointerDown = (event: PointerEvent) => {
      const activeNode = iconRefs.current[activeInfo]
      if (activeNode && !activeNode.contains(event.target as Node)) {
        setActiveInfo(null)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
    }
  }, [activeInfo])

  const percentToPxX = heroSize.width / 100 || 0
  const percentToPxY = heroSize.height / 100 || 0
  const time = timeRef.current

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: BACKGROUND_PATTERN }} />
        {floatingIcons.map((iconConfig) => {
          const IconComponent = iconConfig.icon
          const baseX = iconConfig.initial.x
          const baseY = iconConfig.initial.y
          const dxPercent = cursorPosition.x - baseX
          const dyPercent = cursorPosition.y - baseY
          const distance = Math.sqrt(dxPercent * dxPercent + dyPercent * dyPercent)
          const pullProgress = isPointerActive
            ? Math.max(0, 1 - Math.min(distance, iconConfig.pullRadius) / iconConfig.pullRadius)
            : 0

          const parallaxBase = 0.35
          const parallaxX = dxPercent * iconConfig.parallax * parallaxBase * percentToPxX
          const parallaxY = dyPercent * iconConfig.parallax * parallaxBase * percentToPxY
          const attractionX = dxPercent * pullProgress * iconConfig.pullIntensity * percentToPxX
          const attractionY = dyPercent * pullProgress * iconConfig.pullIntensity * percentToPxY
          const wobbleX = Math.sin(time * iconConfig.wobbleFrequency + iconConfig.wobblePhase) * iconConfig.wobbleAmplitude
          const wobbleY = Math.cos(time * iconConfig.wobbleFrequency * 0.85 + iconConfig.wobblePhase) * iconConfig.wobbleAmplitude * 0.6
          const totalOffsetX = parallaxX + attractionX + wobbleX
          const totalOffsetY = parallaxY + attractionY + wobbleY
          const rotation = Math.sin(time * iconConfig.rotationSpeed + iconConfig.wobblePhase) * iconConfig.rotationRange
          const scale = 1 + pullProgress * 0.12
          const isActive = activeInfo === iconConfig.infoKey

          const style: CSSProperties = {
            top: `calc(${baseY}% + ${totalOffsetY}px)`,
            left: `calc(${baseX}% + ${totalOffsetX}px)`,
            backgroundColor: isActive ? "rgba(7, 11, 26, 0.92)" : iconConfig.background,
            borderColor: iconConfig.border,
            color: isActive ? "var(--foreground)" : iconConfig.color,
            transform: isActive
              ? "translate(-50%, -50%)"
              : `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
          }

          if (!isActive) {
            style.width = iconConfig.size
            style.height = iconConfig.size
          } else {
            style.width = "min(22rem, calc(100vw - 3rem))"
            style.minWidth = "16rem"
            style.minHeight = "11rem"
            style.padding = "1.5rem"
          }

          return (
            <div
              key={iconConfig.id}
              className={`hero-floating-icon${isPointerActive ? " hero-floating-icon--active" : ""}${
                isActive ? " hero-floating-icon--expanded" : ""
              }`}
              style={style}
              ref={(node) => {
                iconRefs.current[iconConfig.infoKey] = node
              }}
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
              aria-label={`Saiba mais sobre ${heroInfoContent[iconConfig.infoKey].title}`}
              onClick={() => handleIconInfo(iconConfig.infoKey)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  handleIconInfo(iconConfig.infoKey)
                }
              }}
            >
              {isActive ? (
                <div className="hero-floating-icon__card">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-primary/80 mb-1">
                    Serviço em destaque
                  </p>
                  <h4 className="text-lg font-semibold text-foreground mb-1">
                    {heroInfoContent[iconConfig.infoKey].title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {heroInfoContent[iconConfig.infoKey].description}
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1.5 mb-4">
                    {heroInfoContent[iconConfig.infoKey].highlights.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button size="sm" variant="secondary" asChild>
                    <Link
                      href={heroInfoContent[iconConfig.infoKey].href}
                      onClick={() => {
                        handleInfoClose()
                      }}
                    >
                      {heroInfoContent[iconConfig.infoKey].cta}
                    </Link>
                  </Button>
                </div>
              ) : (
                <IconComponent className="w-1/2 h-1/2" />
              )}
            </div>
          )
        })}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Proteção Digital Especializada</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 text-balance">
            Proteja seu negócio com{" "}
            <span className="text-primary">segurança inteligente</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed text-pretty">
            Consultoria especializada em cybersegurança para empresas que valorizam
            a proteção de seus dados e a continuidade dos negócios.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="gap-2">
              <Link href="#contato">
                Agende uma Consultoria
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#serviços">Conheça os Serviços</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-bold text-foreground">10+</span>
              <span className="text-sm text-muted-foreground">Anos de Experiência</span>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-bold text-foreground">150+</span>
              <span className="text-sm text-muted-foreground">Empresas Protegidas</span>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Server className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-bold text-foreground">99.9%</span>
              <span className="text-sm text-muted-foreground">Taxa de Sucesso</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
