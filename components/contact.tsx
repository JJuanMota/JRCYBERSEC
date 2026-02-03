"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle, Target } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "contato@cybershield.com.br",
    href: "mailto:contato@cybershield.com.br",
  },
  {
    icon: Phone,
    label: "Telefone",
    value: "+55 11 99150-4189",
    href: "https://wa.me/5511991504189",
  },
  {
    icon: MapPin,
    label: "Localização",
    value: "São Paulo, SP - Brasil",
    href: "#",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "/in/jairross",
    href: "https://www.linkedin.com/in/jairross/",
  },
]

const WHATSAPP_NUMBER = "5511991504189"

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const name = formData.get("name")?.toString().trim() ?? ""
    const email = formData.get("email")?.toString().trim() ?? ""
    const company = formData.get("company")?.toString().trim() ?? ""
    const subject = formData.get("subject")?.toString().trim() ?? ""
    const message = formData.get("message")?.toString().trim() ?? ""

    // Compose structured WhatsApp payload with markdown emphasis
    const whatsappMessage = [
      "*Nova mensagem pelo site JR CYBERSEC*",
      "",
      `*Assunto:* ${subject}`,
      `*Mensagem:* ${message}`,
      "",
      "*Detalhes de contato*",
      `Nome: ${name}`,
      `Email: ${email}`,
      company ? `Empresa: ${company}` : null,
    ]
      .filter(Boolean)
      .join("\n")

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, "_blank")
    form.reset()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section id="contato" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Contato
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Vamos conversar sobre segurança?
          </h2>
          <p className="text-muted-foreground leading-relaxed text-pretty">
            Entre em contato para discutir como posso ajudar a proteger 
            sua organização contra ameaças cibernéticas.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Informações de Contato
            </h3>
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors group"
                target="_blank"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <info.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">{info.label}</span>
                  <p className="text-foreground font-medium">{info.value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Envie uma Mensagem
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nome
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Seu nome completo"
                      required
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      className="bg-background"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                    Empresa
                  </label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Nome da sua empresa"
                    className="bg-background"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Assunto
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Como posso ajudar?"
                    required
                    className="bg-background"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Mensagem
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Descreva seu projeto ou necessidade..."
                    rows={4}
                    required
                    className="bg-background resize-none"
                  />
                </div>
                <Button type="submit" className="w-full gap-2" disabled={isSubmitted}>
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Mensagem Enviada!
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
