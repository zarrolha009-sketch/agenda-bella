import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { services as initialServices, categoryStats } from '@/data/mockData';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Clock,
  DollarSign,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function AdminServices() {
  const [services, setServices] = useState(initialServices);
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

  const handleDelete = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
    toast.success('Serviço removido com sucesso');
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Serviços</h1>
          <p className="mt-1 text-muted-foreground">
            Gerencie os serviços oferecidos no salão
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Serviço
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
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
                  : "bg-muted text-muted-foreground hover:bg-accent"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="rounded-xl border border-border bg-card py-16 text-center shadow-card">
          <Sparkles className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 font-semibold">Nenhum serviço encontrado</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Tente ajustar os filtros ou adicione um novo serviço
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="group rounded-xl border border-border bg-card p-5 shadow-card transition-smooth hover:shadow-elevated animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <Sparkles className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  {service.category}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-semibold">{service.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {service.description}
              </p>

              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{service.duration} min</span>
                </div>
                <div className="flex items-center gap-1 text-lg font-bold text-primary">
                  <DollarSign className="h-4 w-4" />
                  <span>R$ {service.price.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                <Button variant="secondary" size="sm" className="flex-1">
                  <Edit2 className="mr-1 h-4 w-4" />
                  Editar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(service.id)}
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
