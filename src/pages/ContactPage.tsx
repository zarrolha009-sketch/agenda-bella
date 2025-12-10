import { PublicLayout } from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, Clock, MessageCircle, Mail } from 'lucide-react';

export default function ContactPage() {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      'Olá! Gostaria de mais informações sobre o salão Mulher Bonita.'
    );
    window.open(`https://wa.me/5511999990000?text=${message}`, '_blank');
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="gradient-subtle py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              Fale <span className="text-gradient">Conosco</span>
            </h1>
            <p className="mt-4 text-muted-foreground">
              Estamos aqui para atender você da melhor forma
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Contact Info */}
              <div className="space-y-6">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                  <h2 className="text-xl font-semibold">Informações de Contato</h2>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Telefone</p>
                        <p className="text-muted-foreground">(11) 99999-0000</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">E-mail</p>
                        <p className="text-muted-foreground">contato@mulherbonita.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Endereço</p>
                        <p className="text-muted-foreground">
                          Rua das Flores, 123 - Centro
                          <br />
                          São Paulo - SP, 01234-567
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Horário de Funcionamento</p>
                        <p className="text-muted-foreground">
                          Segunda a Sexta: 9h - 19h
                          <br />
                          Sábado: 9h - 17h
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="rounded-2xl gradient-primary p-6 text-primary-foreground">
                  <h3 className="text-lg font-semibold">
                    Prefere falar pelo WhatsApp?
                  </h3>
                  <p className="mt-2 text-primary-foreground/80">
                    Clique no botão abaixo para iniciar uma conversa diretamente
                    conosco
                  </p>
                  <Button
                    onClick={handleWhatsApp}
                    className="mt-4 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                    size="lg"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Abrir WhatsApp
                  </Button>
                </div>
              </div>

              {/* Contact Form */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <h2 className="text-xl font-semibold">Envie uma Mensagem</h2>
                <form className="mt-6 space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Nome
                    </label>
                    <input
                      type="text"
                      placeholder="Seu nome completo"
                      className="h-12 w-full rounded-lg border border-input bg-background px-4 transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      E-mail
                    </label>
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      className="h-12 w-full rounded-lg border border-input bg-background px-4 transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      placeholder="(11) 99999-9999"
                      className="h-12 w-full rounded-lg border border-input bg-background px-4 transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Mensagem
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Como podemos ajudar?"
                      className="w-full rounded-lg border border-input bg-background px-4 py-3 transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Enviar Mensagem
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="border-t border-border">
        <div className="aspect-[21/9] w-full bg-muted">
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <MapPin className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-2 text-muted-foreground">
                Mapa será exibido aqui
              </p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
