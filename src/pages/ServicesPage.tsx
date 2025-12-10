import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/button';
import { services, categoryStats } from '@/data/mockData';
import { Sparkles, Clock, ArrowRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Todos', ...categoryStats.map((c) => c.name)];

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      !selectedCategory ||
      selectedCategory === 'Todos' ||
      service.category === selectedCategory;
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="gradient-subtle py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              Nossos <span className="text-gradient">Serviços</span>
            </h1>
            <p className="mt-4 text-muted-foreground">
              Conheça todos os serviços que oferecemos para realçar sua beleza
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur md:top-20">
        <div className="container py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar serviço..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() =>
                    setSelectedCategory(category === 'Todos' ? null : category)
                  }
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-smooth",
                    (selectedCategory === category ||
                      (!selectedCategory && category === 'Todos'))
                      ? "gradient-primary text-primary-foreground shadow-soft"
                      : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-16">
        <div className="container">
          {filteredServices.length === 0 ? (
            <div className="py-16 text-center">
              <Sparkles className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 font-semibold">Nenhum serviço encontrado</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Tente ajustar os filtros ou buscar por outro termo
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service, index) => (
                <div
                  key={service.id}
                  className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-smooth hover:shadow-elevated hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Service Image Placeholder */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-accent to-muted">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="h-12 w-12 text-primary/20" />
                    </div>
                    <div className="absolute left-4 top-4">
                      <span className="rounded-full bg-background/90 px-3 py-1 text-xs font-medium backdrop-blur">
                        {service.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold">{service.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {service.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{service.duration} min</span>
                      </div>
                      <p className="text-lg font-bold text-primary">
                        R$ {service.price.toFixed(2)}
                      </p>
                    </div>

                    <Link to="/agendar" className="mt-4 block">
                      <Button className="w-full">
                        Agendar
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
