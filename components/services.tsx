import { Shield, FileSearch, Cloud, Scale, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
  {
    icon: Scale,
    title: "GRC",
    subtitle: "Governança, Risco e Compliance",
    description: "Implementação de frameworks de governança, gestão de riscos corporativos e compliance com regulamentações como LGPD, ISO 27001 e SOC 2.",
    features: ["Políticas de Segurança", "Gestão de Riscos", "Auditorias de Compliance", "Treinamentos"],
  },
  {
    icon: Shield,
    title: "Cybersegurança",
    subtitle: "Proteção Completa",
    description: "Estratégias abrangentes de segurança da informação, incluindo arquitetura de segurança, resposta a incidentes e monitoramento contínuo.",
    features: ["Arquitetura de Segurança", "SOC/SIEM", "Resposta a Incidentes", "Awareness"],
  },
  {
    icon: FileSearch,
    title: "Pentest",
    subtitle: "Testes de Penetração",
    description: "Avaliações de segurança ofensivas para identificar vulnerabilidades antes que atacantes as explorem. Relatórios detalhados e planos de remediação.",
    features: ["Web Applications", "Infraestrutura", "Mobile Apps", "Engenharia Social"],
  },
  {
    icon: Cloud,
    title: "Cloud Security",
    subtitle: "Segurança em Nuvem",
    description: "Proteção de ambientes cloud em AWS, Azure e GCP. Configuração segura, monitoramento e conformidade em infraestruturas multi-cloud.",
    features: ["AWS/Azure/GCP", "DevSecOps", "Container Security", "IAM & Zero Trust"],
  },
]

export function Services() {
  return (
    <section id="servicos" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Serviços
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Soluções completas em segurança digital
          </h2>
          <p className="text-muted-foreground leading-relaxed text-pretty">
            Ofereço um portfólio abrangente de serviços para proteger sua organização 
            em todas as frentes da segurança cibernética.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary/30 transition-all duration-300 group"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-foreground text-xl">{service.title}</CardTitle>
                <CardDescription className="text-accent font-medium text-sm">
                  {service.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" className="gap-2 bg-transparent">
            <Link href="#contato">
              Solicitar Orçamento
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
