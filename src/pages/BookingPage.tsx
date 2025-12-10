import { useState } from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/button';
import { services, professionals, availableTimes } from '@/data/mockData';
import {
  Calendar,
  Clock,
  User,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type Step = 'service' | 'professional' | 'datetime' | 'confirm';

export default function BookingPage() {
  const [step, setStep] = useState<Step>('service');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const service = services.find((s) => s.id === selectedService);
  const professional = professionals.find((p) => p.id === selectedProfessional);

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      value: date.toISOString().split('T')[0],
      day: date.toLocaleDateString('pt-BR', { weekday: 'short' }),
      number: date.getDate(),
      month: date.toLocaleDateString('pt-BR', { month: 'short' }),
    };
  });

  const steps: { key: Step; label: string; icon: typeof Calendar }[] = [
    { key: 'service', label: 'Serviço', icon: Calendar },
    { key: 'professional', label: 'Profissional', icon: User },
    { key: 'datetime', label: 'Data e Hora', icon: Clock },
    { key: 'confirm', label: 'Confirmar', icon: CheckCircle2 },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === step);

  const canProceed = () => {
    switch (step) {
      case 'service':
        return !!selectedService;
      case 'professional':
        return !!selectedProfessional;
      case 'datetime':
        return !!selectedDate && !!selectedTime;
      case 'confirm':
        return clientName.trim() && clientPhone.trim();
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!canProceed()) return;
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setStep(steps[nextIndex].key);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setStep(steps[prevIndex].key);
    }
  };

  const handleConfirm = () => {
    if (!service || !professional || !selectedDate || !selectedTime) return;

    const message = encodeURIComponent(
      `Olá! Gostaria de confirmar meu agendamento:\n\n` +
        `📋 *Serviço:* ${service.name}\n` +
        `👩‍💼 *Profissional:* ${professional.name}\n` +
        `📅 *Data:* ${new Date(selectedDate).toLocaleDateString('pt-BR')}\n` +
        `🕐 *Horário:* ${selectedTime}\n` +
        `👤 *Nome:* ${clientName}\n` +
        `📱 *Telefone:* ${clientPhone}\n\n` +
        `Aguardo confirmação!`
    );

    window.open(`https://wa.me/5511999990000?text=${message}`, '_blank');
    toast.success('Redirecionando para o WhatsApp...');
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="gradient-subtle py-8 md:py-12">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold md:text-4xl">
              Agendar <span className="text-gradient">Horário</span>
            </h1>
            <p className="mt-3 text-muted-foreground">
              Escolha o serviço, profissional e horário de sua preferência
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="border-b border-border bg-card">
        <div className="container py-4">
          <div className="flex items-center justify-center">
            {steps.map((s, index) => (
              <div key={s.key} className="flex items-center">
                <div
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-smooth",
                    index <= currentStepIndex
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-smooth",
                      index < currentStepIndex
                        ? "gradient-primary text-primary-foreground"
                        : index === currentStepIndex
                        ? "border-2 border-primary text-primary"
                        : "border-2 border-muted text-muted-foreground"
                    )}
                  >
                    {index < currentStepIndex ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "mx-2 h-0.5 w-8 transition-smooth md:w-16",
                      index < currentStepIndex ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            {/* Step: Service */}
            {step === 'service' && (
              <div className="animate-fade-in space-y-4">
                <h2 className="text-xl font-semibold">
                  Escolha o serviço desejado
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {services.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedService(s.id)}
                      className={cn(
                        "flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-smooth",
                        selectedService === s.id
                          ? "border-primary bg-accent shadow-soft"
                          : "border-border bg-card hover:border-primary/50"
                      )}
                    >
                      <div className="flex-1">
                        <h3 className="font-medium">{s.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {s.duration} min • {s.category}
                        </p>
                      </div>
                      <p className="font-semibold text-primary">
                        R$ {s.price.toFixed(2)}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step: Professional */}
            {step === 'professional' && (
              <div className="animate-fade-in space-y-4">
                <h2 className="text-xl font-semibold">
                  Escolha a profissional
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {professionals.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProfessional(p.id)}
                      className={cn(
                        "flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-smooth",
                        selectedProfessional === p.id
                          ? "border-primary bg-accent shadow-soft"
                          : "border-border bg-card hover:border-primary/50"
                      )}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <User className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{p.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {p.role}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step: Date & Time */}
            {step === 'datetime' && (
              <div className="animate-fade-in space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">Escolha a data</h2>
                  <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                    {dates.map((d) => (
                      <button
                        key={d.value}
                        onClick={() => setSelectedDate(d.value)}
                        className={cn(
                          "flex min-w-[80px] flex-col items-center rounded-xl border-2 p-3 transition-smooth",
                          selectedDate === d.value
                            ? "border-primary bg-accent shadow-soft"
                            : "border-border bg-card hover:border-primary/50"
                        )}
                      >
                        <span className="text-xs uppercase text-muted-foreground">
                          {d.day}
                        </span>
                        <span className="text-2xl font-bold">{d.number}</span>
                        <span className="text-xs text-muted-foreground">
                          {d.month}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold">Escolha o horário</h2>
                  <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={cn(
                          "rounded-lg border-2 py-3 text-sm font-medium transition-smooth",
                          selectedTime === time
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-card hover:border-primary/50"
                        )}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step: Confirm */}
            {step === 'confirm' && (
              <div className="animate-fade-in space-y-6">
                <h2 className="text-xl font-semibold">Confirme seus dados</h2>

                {/* Summary */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-semibold">Resumo do Agendamento</h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Serviço:</span>
                      <span className="font-medium">{service?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Profissional:</span>
                      <span className="font-medium">{professional?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Data:</span>
                      <span className="font-medium">
                        {selectedDate &&
                          new Date(selectedDate).toLocaleDateString('pt-BR', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                          })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Horário:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-3">
                      <span className="font-semibold">Total:</span>
                      <span className="text-lg font-bold text-primary">
                        R$ {service?.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Client Info */}
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Seu nome
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Digite seu nome completo"
                      className="h-12 w-full rounded-lg border border-input bg-background px-4 transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="h-12 w-full rounded-lg border border-input bg-background px-4 transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStepIndex === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>

              {step === 'confirm' ? (
                <Button
                  onClick={handleConfirm}
                  disabled={!canProceed()}
                  size="lg"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Confirmar via WhatsApp
                </Button>
              ) : (
                <Button onClick={handleNext} disabled={!canProceed()}>
                  Continuar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
