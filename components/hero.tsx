import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Lock, ShieldCheck, Server } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2399ccff' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
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
              <Link href="#servicos">
                Conheça os Serviços
              </Link>
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
