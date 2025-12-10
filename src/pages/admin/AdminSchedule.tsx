import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { appointments, professionals } from '@/data/mockData';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  User,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminSchedule() {
  const [selectedProfessional, setSelectedProfessional] = useState<string | null>(
    null
  );
  const [currentDate, setCurrentDate] = useState(new Date());

  // Generate week days
  const getWeekDays = (date: Date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d;
    });
  };

  const weekDays = getWeekDays(currentDate);
  const timeSlots = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ];

  const filteredAppointments = selectedProfessional
    ? appointments.filter((a) => a.professionalId === selectedProfessional)
    : appointments;

  const getAppointmentForSlot = (date: Date, time: string) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredAppointments.find(
      (a) => a.date === dateStr && a.time.startsWith(time.split(':')[0])
    );
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Agenda</h1>
          <p className="mt-1 text-muted-foreground">
            Gerencie os agendamentos do salão
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Agendamento
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        {/* Professional Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedProfessional(null)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-smooth",
              !selectedProfessional
                ? "gradient-primary text-primary-foreground shadow-soft"
                : "bg-muted text-muted-foreground hover:bg-accent"
            )}
          >
            Todas
          </button>
          {professionals.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProfessional(p.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-smooth",
                selectedProfessional === p.id
                  ? "gradient-primary text-primary-foreground shadow-soft"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              )}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => navigateWeek('prev')}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card transition-smooth hover:bg-muted"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-semibold">
          {weekDays[0].toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
        </h2>
        <button
          onClick={() => navigateWeek('next')}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card transition-smooth hover:bg-muted"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-card">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-border">
              <th className="w-20 border-r border-border bg-muted/50 p-3 text-xs font-medium uppercase text-muted-foreground">
                Horário
              </th>
              {weekDays.map((day) => {
                const isToday =
                  day.toDateString() === new Date().toDateString();
                return (
                  <th
                    key={day.toISOString()}
                    className={cn(
                      "border-r border-border p-3 text-center last:border-r-0",
                      isToday && "bg-accent"
                    )}
                  >
                    <p className="text-xs font-medium uppercase text-muted-foreground">
                      {day.toLocaleDateString('pt-BR', { weekday: 'short' })}
                    </p>
                    <p
                      className={cn(
                        "mt-1 text-lg font-bold",
                        isToday && "text-primary"
                      )}
                    >
                      {day.getDate()}
                    </p>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time) => (
              <tr key={time} className="border-b border-border last:border-b-0">
                <td className="border-r border-border bg-muted/50 p-3 text-center text-sm font-medium text-muted-foreground">
                  {time}
                </td>
                {weekDays.map((day) => {
                  const appointment = getAppointmentForSlot(day, time);
                  return (
                    <td
                      key={`${day.toISOString()}-${time}`}
                      className="border-r border-border p-1 last:border-r-0"
                    >
                      {appointment && (
                        <div
                          className={cn(
                            "rounded-lg p-2 text-xs transition-smooth hover:shadow-soft cursor-pointer",
                            appointment.status === 'completed' &&
                              "bg-green-50 border border-green-200",
                            appointment.status === 'confirmed' &&
                              "bg-blue-50 border border-blue-200",
                            appointment.status === 'pending' &&
                              "bg-yellow-50 border border-yellow-200",
                            appointment.status === 'cancelled' &&
                              "bg-red-50 border border-red-200"
                          )}
                        >
                          <p className="font-medium truncate">
                            {appointment.clientName}
                          </p>
                          <p className="text-muted-foreground truncate">
                            {appointment.serviceName}
                          </p>
                          <div className="mt-1 flex items-center gap-1 text-muted-foreground">
                            <User className="h-3 w-3" />
                            <span className="truncate">
                              {appointment.professionalName}
                            </span>
                          </div>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-400" />
          <span className="text-sm text-muted-foreground">Concluído</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-400" />
          <span className="text-sm text-muted-foreground">Confirmado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="text-sm text-muted-foreground">Pendente</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <span className="text-sm text-muted-foreground">Cancelado</span>
        </div>
      </div>
    </AdminLayout>
  );
}
