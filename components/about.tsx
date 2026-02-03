import { CheckCircle2, Award, BookOpen, Users } from "lucide-react"

const highlights = [
  "Certificações CISSP, CEH, CISM",
  "Experiência em empresas Fortune 500",
  "Metodologias ágeis e personalizadas",
  "Foco em resultados mensuráveis",
]

const workApproach = [
  {
    icon: BookOpen,
    title: "Análise Profunda",
    description: "Entendo a fundo o contexto do seu negócio e suas necessidades específicas de segurança.",
  },
  {
    icon: Users,
    title: "Parceria Estratégica",
    description: "Trabalho como extensão da sua equipe, garantindo transferência de conhecimento.",
  },
  {
    icon: Award,
    title: "Excelência Técnica",
    description: "Utilizo as melhores práticas do mercado e frameworks reconhecidos internacionalmente.",
  },
]

export function About() {
  return (
    <section id="sobre" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div>
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
              Sobre Mim
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              Transformando segurança em vantagem competitiva
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-pretty">
              Com mais de uma década de experiência em cybersegurança, ajudo empresas 
              a identificar vulnerabilidades, implementar controles eficazes e construir 
              uma cultura de segurança sustentável.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 text-pretty">
              Minha abordagem combina conhecimento técnico profundo com visão estratégica 
              de negócios, garantindo que as soluções de segurança não apenas protejam, 
              mas também habilitem o crescimento da sua organização.
            </p>
            
            <ul className="space-y-3">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - How I Work */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Como Trabalho
            </h3>
            {workApproach.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-background border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
