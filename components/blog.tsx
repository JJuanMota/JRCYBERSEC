import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock } from "lucide-react"

const blogPosts = [
  {
    title: "Como implementar Zero Trust em sua organização",
    excerpt: "Um guia prático para adotar o modelo de segurança Zero Trust, desde a avaliação inicial até a implementação completa.",
    category: "Estratégia",
    date: "28 Jan 2026",
    readTime: "8 min",
    slug: "#",
  },
  {
    title: "LGPD: O que mudou em 2026 e como se adequar",
    excerpt: "As últimas atualizações da Lei Geral de Proteção de Dados e os passos necessários para garantir conformidade.",
    category: "Compliance",
    date: "21 Jan 2026",
    readTime: "6 min",
    slug: "#",
  },
  {
    title: "Os 5 maiores riscos de segurança em Cloud",
    excerpt: "Identificando e mitigando as principais ameaças em ambientes de nuvem pública, privada e híbrida.",
    category: "Cloud Security",
    date: "14 Jan 2026",
    readTime: "10 min",
    slug: "#",
  },
]

export function Blog() {
  return (
    <section id="blog" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
              Blog
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              Insights e artigos sobre segurança
            </h2>
          </div>
          <Button variant="ghost" asChild className="gap-2 text-primary hover:text-primary w-fit">
            <Link href="#">
              Ver todos os artigos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <Card
              key={index}
              className="bg-background border-border hover:border-primary/30 transition-all duration-300 group"
            >
              <CardHeader>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {post.category}
                  </span>
                </div>
                <CardTitle className="text-foreground text-lg group-hover:text-primary transition-colors">
                  <Link href={post.slug}>{post.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground mb-4 leading-relaxed">
                  {post.excerpt}
                </CardDescription>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
