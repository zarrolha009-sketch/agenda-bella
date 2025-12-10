import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { clients as initialClients } from '@/data/mockData';
import {
  Plus,
  Search,
  User,
  Phone,
  Mail,
  Calendar,
  MoreVertical,
  Eye,
  Edit2,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function AdminClients() {
  const [clients, setClients] = useState(initialClients);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery)
  );

  const handleDelete = (id: string) => {
    setClients(clients.filter((c) => c.id !== id));
    setActiveMenu(null);
    toast.success('Cliente removido com sucesso');
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Clientes</h1>
          <p className="mt-1 text-muted-foreground">
            Gerencie a base de clientes do salão
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Cliente
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por nome, email ou telefone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Clients Grid */}
      {filteredClients.length === 0 ? (
        <div className="rounded-xl border border-border bg-card py-16 text-center shadow-card">
          <User className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 font-semibold">Nenhum cliente encontrado</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Tente ajustar a busca ou adicione um novo cliente
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredClients.map((client, index) => (
            <div
              key={client.id}
              className="relative rounded-xl border border-border bg-card p-5 shadow-card transition-smooth hover:shadow-elevated animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Menu Button */}
              <div className="absolute right-3 top-3">
                <button
                  onClick={() =>
                    setActiveMenu(activeMenu === client.id ? null : client.id)
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
                {activeMenu === client.id && (
                  <div className="absolute right-0 top-10 z-10 w-40 rounded-lg border border-border bg-card py-1 shadow-elevated animate-scale-in">
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted">
                      <Eye className="h-4 w-4" />
                      Ver Detalhes
                    </button>
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted">
                      <Edit2 className="h-4 w-4" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(client.id)}
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remover
                    </button>
                  </div>
                )}
              </div>

              {/* Client Info */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <User className="h-7 w-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{client.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {client.totalVisits} visitas
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{client.phone}</span>
                </div>
                {client.lastVisit && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Última visita:{' '}
                      {new Date(client.lastVisit).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                )}
              </div>

              {client.notes && (
                <div className="mt-4 rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">{client.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <p className="text-2xl font-bold text-primary">{clients.length}</p>
          <p className="text-sm text-muted-foreground">Total de Clientes</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <p className="text-2xl font-bold text-primary">
            {Math.round(
              clients.reduce((sum, c) => sum + c.totalVisits, 0) / clients.length
            )}
          </p>
          <p className="text-sm text-muted-foreground">Média de Visitas</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <p className="text-2xl font-bold text-primary">
            {clients.filter((c) => c.totalVisits >= 10).length}
          </p>
          <p className="text-sm text-muted-foreground">Clientes Frequentes</p>
        </div>
      </div>
    </AdminLayout>
  );
}
