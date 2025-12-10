// Mock data for Mulher Bonita salon management system

export interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number; // in minutes
  description: string;
  image?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  totalVisits: number;
  lastVisit?: string;
  notes?: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  serviceId: string;
  serviceName: string;
  professionalId: string;
  professionalName: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  price: number;
}

export interface Professional {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  specialties: string[];
}

export const services: Service[] = [
  {
    id: '1',
    name: 'Corte Feminino',
    category: 'Cabelo',
    price: 80,
    duration: 45,
    description: 'Corte personalizado com lavagem e finalização',
  },
  {
    id: '2',
    name: 'Hidratação Profunda',
    category: 'Cabelo',
    price: 100,
    duration: 60,
    description: 'Tratamento intensivo para cabelos ressecados',
  },
  {
    id: '3',
    name: 'Coloração Raiz',
    category: 'Cabelo',
    price: 150,
    duration: 90,
    description: 'Retoque de raiz com produtos de alta qualidade',
  },
  {
    id: '4',
    name: 'Mechas Californianas',
    category: 'Cabelo',
    price: 450,
    duration: 180,
    description: 'Mechas naturais com efeito iluminado',
  },
  {
    id: '5',
    name: 'Escova Modeladora',
    category: 'Cabelo',
    price: 70,
    duration: 40,
    description: 'Escova com modelagem e finalização',
  },
  {
    id: '6',
    name: 'Penteado para Festa',
    category: 'Cabelo',
    price: 170,
    duration: 60,
    description: 'Penteado elaborado para ocasiões especiais',
  },
  {
    id: '7',
    name: 'Manicure',
    category: 'Unhas',
    price: 40,
    duration: 30,
    description: 'Cuidado completo das unhas das mãos',
  },
  {
    id: '8',
    name: 'Pedicure',
    category: 'Unhas',
    price: 45,
    duration: 40,
    description: 'Cuidado completo das unhas dos pés',
  },
  {
    id: '9',
    name: 'Unhas em Gel',
    category: 'Unhas',
    price: 120,
    duration: 90,
    description: 'Alongamento e esmaltação em gel',
  },
  {
    id: '10',
    name: 'Design de Sobrancelhas',
    category: 'Estética Facial',
    price: 60,
    duration: 30,
    description: 'Design personalizado com henna opcional',
  },
  {
    id: '11',
    name: 'Limpeza de Pele',
    category: 'Estética Facial',
    price: 150,
    duration: 60,
    description: 'Limpeza profunda com extração e máscara',
  },
  {
    id: '12',
    name: 'Depilação Meia Perna',
    category: 'Depilação',
    price: 50,
    duration: 30,
    description: 'Depilação com cera quente',
  },
];

export const professionals: Professional[] = [
  {
    id: '1',
    name: 'Ana Paula',
    role: 'Cabeleireira Senior',
    specialties: ['Corte', 'Coloração', 'Mechas'],
  },
  {
    id: '2',
    name: 'Carla Mendes',
    role: 'Cabeleireira',
    specialties: ['Corte', 'Escova', 'Penteados'],
  },
  {
    id: '3',
    name: 'Juliana Santos',
    role: 'Manicure',
    specialties: ['Manicure', 'Pedicure', 'Unhas em Gel'],
  },
  {
    id: '4',
    name: 'Fernanda Lima',
    role: 'Esteticista',
    specialties: ['Design de Sobrancelhas', 'Limpeza de Pele', 'Depilação'],
  },
];

export const clients: Client[] = [
  {
    id: '1',
    name: 'Maria Clara Souza',
    email: 'maria.clara@email.com',
    phone: '(11) 99999-1111',
    totalVisits: 12,
    lastVisit: '2024-07-22',
    notes: 'Prefere produtos sem sulfato',
  },
  {
    id: '2',
    name: 'Ana Paula Mendes',
    email: 'ana.paula@email.com',
    phone: '(11) 99999-2222',
    totalVisits: 8,
    lastVisit: '2024-07-22',
  },
  {
    id: '3',
    name: 'Sofia Lima Costa',
    email: 'sofia.lima@email.com',
    phone: '(11) 99999-3333',
    totalVisits: 15,
    lastVisit: '2024-07-21',
    notes: 'Cliente VIP - sempre oferece café',
  },
  {
    id: '4',
    name: 'Laura Ribeiro',
    email: 'laura.ribeiro@email.com',
    phone: '(11) 99999-4444',
    totalVisits: 5,
    lastVisit: '2024-07-21',
  },
  {
    id: '5',
    name: 'Patrícia Alves',
    email: 'patricia.alves@email.com',
    phone: '(11) 99999-5555',
    totalVisits: 20,
    lastVisit: '2024-07-23',
    notes: 'Alérgica a amônia',
  },
  {
    id: '6',
    name: 'Camila Barros',
    email: 'camila.barros@email.com',
    phone: '(11) 99999-6666',
    totalVisits: 3,
    lastVisit: '2024-07-23',
  },
];

export const appointments: Appointment[] = [
  {
    id: '1',
    clientId: '1',
    clientName: 'Maria Clara Souza',
    serviceId: '1',
    serviceName: 'Corte Feminino + Hidratação',
    professionalId: '1',
    professionalName: 'Ana Paula',
    date: '2024-07-22',
    time: '14:00',
    status: 'completed',
    price: 180,
  },
  {
    id: '2',
    clientId: '2',
    clientName: 'Ana Paula Mendes',
    serviceId: '3',
    serviceName: 'Coloração Raiz + Escova',
    professionalId: '1',
    professionalName: 'Ana Paula',
    date: '2024-07-22',
    time: '16:30',
    status: 'pending',
    price: 250,
  },
  {
    id: '3',
    clientId: '3',
    clientName: 'Sofia Lima Costa',
    serviceId: '7',
    serviceName: 'Manicure e Pedicure',
    professionalId: '3',
    professionalName: 'Juliana Santos',
    date: '2024-07-21',
    time: '10:00',
    status: 'completed',
    price: 85,
  },
  {
    id: '4',
    clientId: '4',
    clientName: 'Laura Ribeiro',
    serviceId: '10',
    serviceName: 'Design de Sobrancelhas',
    professionalId: '4',
    professionalName: 'Fernanda Lima',
    date: '2024-07-21',
    time: '15:00',
    status: 'pending',
    price: 60,
  },
  {
    id: '5',
    clientId: '5',
    clientName: 'Patrícia Alves',
    serviceId: '4',
    serviceName: 'Mechas Californianas',
    professionalId: '1',
    professionalName: 'Ana Paula',
    date: '2024-07-23',
    time: '09:30',
    status: 'confirmed',
    price: 450,
  },
  {
    id: '6',
    clientId: '6',
    clientName: 'Camila Barros',
    serviceId: '6',
    serviceName: 'Penteado para Festa',
    professionalId: '2',
    professionalName: 'Carla Mendes',
    date: '2024-07-23',
    time: '13:00',
    status: 'pending',
    price: 170,
  },
];

export const dashboardMetrics = {
  appointmentsToday: 18,
  appointmentsTodayChange: 15,
  noShowRate: 8,
  noShowRateChange: -2,
  weeklyRevenue: 7890,
  weeklyRevenueChange: 10,
  newClientsMonth: 42,
  newClientsMonthChange: 7,
};

export const categoryStats = [
  { name: 'Cabelo', count: 124 },
  { name: 'Unhas', count: 87 },
  { name: 'Estética Facial', count: 35 },
  { name: 'Depilação', count: 22 },
];

export const availableTimes = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
];
