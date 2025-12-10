import { AdminLayout } from '@/components/layout/AdminLayout';
import { dashboardMetrics, appointments, categoryStats } from '@/data/mockData';
import {
  Calendar,
  Users,
  TrendingUp,
  TrendingDown,
  DollarSign,
  UserPlus,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const metrics = [
  {
    label: 'Agendamentos Hoje',
    value: dashboardMetrics.appointmentsToday,
    change: dashboardMetrics.appointmentsTodayChange,
    icon: Calendar,
    positive: true,
  },
  {
    label: 'Taxa de Não Comparecimento',
    value: `${dashboardMetrics.noShowRate}%`,
    change: dashboardMetrics.noShowRateChange,
    icon: AlertCircle,
    positive: dashboardMetrics.noShowRateChange < 0,
  },
  {
    label: 'Faturamento Semanal',
    value: `R$ ${dashboardMetrics.weeklyRevenue.toLocaleString('pt-BR')}`,
    change: dashboardMetrics.weeklyRevenueChange,
    icon: DollarSign,
    positive: true,
  },
  {
    label: 'Novos Clientes (Mês)',
    value: dashboardMetrics.newClientsMonth,
    change: dashboardMetrics.newClientsMonthChange,
    icon: UserPlus,
    positive: true,
  },
];

export default function AdminDashboard() {
  const todayAppointments = appointments.filter(
    (a) => a.status === 'pending' || a.status === 'confirmed'
  );

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold md:text-3xl">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Bem-vinda de volta! Aqui está o resumo do seu salão.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className="rounded-xl border border-border bg-card p-5 shadow-card transition-smooth hover:shadow-elevated animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <metric.icon className="h-5 w-5" />
              </div>
              <div
                className={cn(
                  "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
                  metric.positive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                )}
              >
                {metric.positive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {Math.abs(metric.change)}%
              </div>
            </div>
            <p className="mt-4 text-2xl font-bold">{metric.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's Appointments */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-card shadow-card">
            <div className="flex items-center justify-between border-b border-border p-5">
              <h2 className="font-semibold">Agendamentos de Hoje</h2>
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                {todayAppointments.length} pendentes
              </span>
            </div>
            <div className="divide-y divide-border">
              {todayAppointments.length === 0 ? (
                <div className="p-8 text-center">
                  <Calendar className="mx-auto h-10 w-10 text-muted-foreground/50" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Nenhum agendamento para hoje
                  </p>
                </div>
              ) : (
                todayAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center gap-4 p-4 transition-smooth hover:bg-muted/50"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <Users className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">
                        {appointment.clientName}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {appointment.serviceName}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm font-medium">
                        <Clock className="h-4 w-4 text-primary" />
                        {appointment.time}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {appointment.professionalName}
                      </p>
                    </div>
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                        appointment.status === 'confirmed'
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      )}
                    >
                      {appointment.status === 'confirmed' ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Categories Stats */}
        <div className="rounded-xl border border-border bg-card shadow-card">
          <div className="border-b border-border p-5">
            <h2 className="font-semibold">Serviços por Categoria</h2>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              {categoryStats.map((category) => {
                const total = categoryStats.reduce((sum, c) => sum + c.count, 0);
                const percentage = Math.round((category.count / total) * 100);
                return (
                  <div key={category.name}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{category.name}</span>
                      <span className="text-muted-foreground">
                        {category.count}
                      </span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full gradient-primary transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 rounded-xl border border-border bg-card shadow-card">
        <div className="border-b border-border p-5">
          <h2 className="font-semibold">Últimos Agendamentos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-5 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                  Cliente
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                  Serviço
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                  Profissional
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                  Data/Hora
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                  Valor
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="transition-smooth hover:bg-muted/50"
                >
                  <td className="whitespace-nowrap px-5 py-4 font-medium">
                    {appointment.clientName}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                    {appointment.serviceName}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                    {appointment.professionalName}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                    {new Date(appointment.date).toLocaleDateString('pt-BR')} às{' '}
                    {appointment.time}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 font-medium text-primary">
                    R$ {appointment.price.toFixed(2)}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                        appointment.status === 'completed' &&
                          "bg-green-100 text-green-700",
                        appointment.status === 'confirmed' &&
                          "bg-blue-100 text-blue-700",
                        appointment.status === 'pending' &&
                          "bg-yellow-100 text-yellow-700",
                        appointment.status === 'cancelled' &&
                          "bg-red-100 text-red-700"
                      )}
                    >
                      {appointment.status === 'completed' && 'Concluído'}
                      {appointment.status === 'confirmed' && 'Confirmado'}
                      {appointment.status === 'pending' && 'Pendente'}
                      {appointment.status === 'cancelled' && 'Cancelado'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
