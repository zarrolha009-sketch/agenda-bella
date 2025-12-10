import { Link } from 'react-router-dom';
import { Scissors, Instagram, Facebook, Phone, MapPin, Clock } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
                <Scissors className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">
                Mulher <span className="text-gradient">Bonita</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Realçando sua beleza natural com cuidado e profissionalismo há mais de 10 anos.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background transition-smooth hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background transition-smooth hover:bg-primary hover:text-primary-foreground"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Links Rápidos</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/servicos" className="text-sm text-muted-foreground transition-smooth hover:text-primary">
                Nossos Serviços
              </Link>
              <Link to="/agendar" className="text-sm text-muted-foreground transition-smooth hover:text-primary">
                Agendar Horário
              </Link>
              <Link to="/contato" className="text-sm text-muted-foreground transition-smooth hover:text-primary">
                Fale Conosco
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>(11) 99999-0000</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Rua das Flores, 123 - Centro</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="font-semibold">Horário de Funcionamento</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                <div>
                  <p>Segunda a Sexta: 9h - 19h</p>
                  <p>Sábado: 9h - 17h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 Mulher Bonita. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
