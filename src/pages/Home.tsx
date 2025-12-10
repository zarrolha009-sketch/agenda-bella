import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { services, categoryStats } from '@/data/mockData';
import {
  Calendar,
  Star,
  Clock,
  Sparkles,
  Heart,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: 'Agendamento Online',
    description: 'Marque seu horário 24h por dia, sem precisar ligar',
  },
  {
    icon: Star,
    title: 'Profissionais Experientes',
    description: 'Equipe treinada e atualizada com as últimas tendências',
  },
  {
    icon: Clock,
    title: 'Pontualidade',
    description: 'Respeitamos seu tempo com atendimento no horário',
  },
  {
    icon: Sparkles,
    title: 'Produtos Premium',
    description: 'Utilizamos as melhores marcas do mercado',
  },
];

const testimonials = [
  {
    name: 'Maria Clara',
    text: 'Atendimento maravilhoso! Sempre saio do salão me sentindo renovada.',
    rating: 5,
  },
  {
    name: 'Ana Paula',
    text: 'As meninas são super atenciosas e o resultado é sempre perfeito.',
    rating: 5,
  },
  {
    name: 'Sofia Lima',
    text: 'Melhor salão da região! Recomendo para todas as minhas amigas.',
    rating: 5,
  },
];

export default function Home() {
  const featuredServices = services.slice(0, 6);

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-subtle">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container relative py-16 md:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
                <Heart className="h-4 w-4" />
                Bem-vinda ao seu momento
              </span>
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl animate-fade-in-up [animation-delay:100ms]">
              Realce sua{' '}
              <span className="text-gradient">beleza natural</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl animate-fade-in-up [animation-delay:200ms]">
              No Mulher Bonita, cada detalhe é pensado para você. Agende seu horário
              e viva uma experiência única de cuidado e bem-estar.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up [animation-delay:300ms]">
              <Link to="/agendar">
                <Button variant="hero">
                  <Calendar className="mr-2 h-5 w-5" />
                  Agendar Horário
                </Button>
              </Link>
              <Link to="/servicos">
                <Button variant="outline" size="lg">
                  Ver Serviços
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card">
        <div className="container py-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {categoryStats.map((stat) => (
              <div key={stat.name} className="text-center">
                <p className="text-3xl font-bold text-primary md:text-4xl">
                  {stat.count}+
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Por que escolher o <span className="text-gradient">Mulher Bonita</span>?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Oferecemos uma experiência completa de beleza e bem-estar
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-smooth hover:shadow-elevated hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-smooth group-hover:gradient-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">
                Nossos Serviços
              </h2>
              <p className="mt-2 text-muted-foreground">
                Conheça alguns dos nossos serviços mais procurados
              </p>
            </div>
            <Link to="/servicos">
              <Button variant="outline">
                Ver Todos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service, index) => (
              <div
                key={service.id}
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card transition-smooth hover:shadow-elevated animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{service.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {service.duration} min • {service.category}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">
                    R$ {service.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              O que nossas clientes dizem
            </h2>
            <p className="mt-4 text-muted-foreground">
              A satisfação das nossas clientes é nossa maior recompensa
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="rounded-2xl border border-border bg-card p-6 shadow-card animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="mt-4 text-muted-foreground">
                  "{testimonial.text}"
                </p>
                <p className="mt-4 font-medium">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden gradient-primary py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary-foreground/10 via-transparent to-transparent" />
        <div className="container relative">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">
              Pronta para se sentir ainda mais bonita?
            </h2>
            <p className="mt-4 text-primary-foreground/80">
              Agende agora mesmo e garanta seu horário com nossas profissionais
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/agendar">
                <Button
                  size="xl"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-elevated"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Agendar Agora
                </Button>
              </Link>
              <a
                href="https://wa.me/5511999990000"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="xl"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Falar no WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
