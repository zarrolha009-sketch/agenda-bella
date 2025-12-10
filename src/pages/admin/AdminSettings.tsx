import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import {
  User,
  Bell,
  Globe,
  Shield,
  CreditCard,
  Save,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettings() {
  const handleSave = () => {
    toast.success('Configurações salvas com sucesso!');
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold md:text-3xl">Configurações</h1>
        <p className="mt-1 text-muted-foreground">
          Gerencie as configurações do seu salão
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-1 rounded-xl border border-border bg-card p-2 shadow-card">
            {[
              { icon: User, label: 'Perfil do Salão', active: true },
              { icon: Bell, label: 'Notificações', active: false },
              { icon: Globe, label: 'Integrações', active: false },
              { icon: Shield, label: 'Segurança', active: false },
              { icon: CreditCard, label: 'Pagamentos', active: false },
            ].map((item) => (
              <button
                key={item.label}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-smooth ${
                  item.active
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-card shadow-card">
            <div className="border-b border-border p-5">
              <h2 className="text-lg font-semibold">Perfil do Salão</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Informações básicas do seu estabelecimento
              </p>
            </div>

            <div className="p-5 space-y-6">
              {/* Logo */}
              <div>
                <label className="mb-2 block text-sm font-medium">Logo</label>
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <User className="h-8 w-8" />
                  </div>
                  <Button variant="secondary" size="sm">
                    Alterar Logo
                  </Button>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Nome do Salão
                </label>
                <input
                  type="text"
                  defaultValue="Mulher Bonita"
                  className="h-12 w-full rounded-lg border border-input bg-background px-4 transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Descrição
                </label>
                <textarea
                  rows={3}
                  defaultValue="Salão de beleza especializado em cuidados com cabelo, unhas e estética facial."
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Contact */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    defaultValue="(11) 99999-0000"
                    className="h-12 w-full rounded-lg border border-input bg-background px-4 transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    E-mail
                  </label>
                  <input
                    type="email"
                    defaultValue="contato@mulherbonita.com"
                    className="h-12 w-full rounded-lg border border-input bg-background px-4 transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Endereço
                </label>
                <input
                  type="text"
                  defaultValue="Rua das Flores, 123 - Centro, São Paulo - SP"
                  className="h-12 w-full rounded-lg border border-input bg-background px-4 transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  WhatsApp para Agendamentos
                </label>
                <input
                  type="tel"
                  defaultValue="5511999990000"
                  className="h-12 w-full rounded-lg border border-input bg-background px-4 transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Formato: código do país + DDD + número (sem espaços ou caracteres especiais)
                </p>
              </div>

              {/* Business Hours */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Horário de Funcionamento
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <span className="w-24 text-sm text-muted-foreground">
                      Seg - Sex:
                    </span>
                    <input
                      type="text"
                      defaultValue="09:00 - 19:00"
                      className="h-10 flex-1 rounded-lg border border-input bg-background px-3 text-sm transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-24 text-sm text-muted-foreground">
                      Sábado:
                    </span>
                    <input
                      type="text"
                      defaultValue="09:00 - 17:00"
                      className="h-10 flex-1 rounded-lg border border-input bg-background px-3 text-sm transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-border p-5">
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
