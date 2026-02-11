import type { TaskStatus } from '@/types';

export const projects = [
  {
    id: 1,
    title: 'Mobile App',
    description: 'Very elaborated description',
    createdBy: 'Fabio Penna',
    color: '#7d39a2',
    status: 'in_progress' as TaskStatus,
    tasks: [
      {
        id: 1,
        title: 'Planejar escopo',
        description:
          'Definir limites, entregáveis e premissas do projeto para evitar retrabalho.',
        priority: 'high',
        status: 'to_do' as TaskStatus,
        assignedTo: { name: 'Alice', avatarUrl: 'https://github.com/shadcn.png' },
      },
      {
        id: 2,
        title: 'Planejar funcionalidades',
        description: 'Listar funcionalidades principais com base no escopo definido.',
        priority: 'low',
        status: 'in_progress' as TaskStatus,
        assignedTo: { name: 'Gleide', avatarUrl: 'https://github.com/shadcn.png' },
      },
      {
        id: 3,
        title: 'Planejar recursos',
        description:
          'Determinar equipe, ferramentas e orçamento necessários para o projeto.',
        priority: 'high',
        status: 'done' as TaskStatus,
        assignedTo: { name: 'Jessica', avatarUrl: 'https://github.com/shadcn.png' },
      },
      {
        id: 4,
        title: 'Planejar recursos',
        description:
          'Determinar equipe, ferramentas e orçamento necessários para o projeto.',
        priority: 'high',
        status: 'done' as TaskStatus,
        assignedTo: { name: 'Jessica', avatarUrl: 'https://github.com/shadcn.png' },
      },
      {
        id: 5,
        title: 'Planejar recursos',
        description:
          'Determinar equipe, ferramentas e orçamento necessários para o projeto.',
        priority: 'high',
        status: 'in_progress' as TaskStatus,
        assignedTo: { name: 'Jessica', avatarUrl: 'https://github.com/shadcn.png' },
      },
    ],
  },

  // ------------------------------
  // PROJECT 2
  // ------------------------------
  {
    id: 2,
    title: 'Website Redesign',
    description: 'Redesign completo do site institucional com foco em UX.',
    createdBy: 'Maria Santos',
    color: '#e96060',
    status: 'to_do' as TaskStatus,
    tasks: [
      {
        id: 1,
        title: 'Criar wireframes',
        description: 'Estruturar novas telas com foco em usabilidade.',
        priority: 'medium',
        status: 'to_do' as TaskStatus,
        assignedTo: { name: 'Pedro', avatarUrl: 'https://github.com/shadcn.png' },
      },
      {
        id: 2,
        title: 'Atualizar identidade visual',
        description: 'Revisar paleta de cores e tipografia.',
        priority: 'low',
        status: 'to_do' as TaskStatus,
        assignedTo: { name: 'Ana', avatarUrl: 'https://github.com/shadcn.png' },
      },
    ],
  },

  // ------------------------------
  // PROJECT 3
  // ------------------------------
  {
    id: 3,
    title: 'E-commerce Platform',
    description: 'Desenvolvimento de uma plataforma completa para vendas online.',
    createdBy: 'Lucas Martins',
    color: '#1c8c5a',
    status: 'in_progress' as TaskStatus,
    tasks: [
      {
        id: 1,
        title: 'Criar sistema de carrinho',
        description: 'Implementar lógica de adicionar, remover e atualizar itens.',
        priority: 'high',
        status: 'in_progress' as TaskStatus,
        assignedTo: { name: 'Roberta', avatarUrl: 'https://github.com/shadcn.png' },
      },
      {
        id: 2,
        title: 'Integração com gateway de pagamento',
        description: 'Implementar Stripe e PayPal.',
        priority: 'high',
        status: 'to_do' as TaskStatus,
        assignedTo: { name: 'Alisson', avatarUrl: 'https://github.com/shadcn.png' },
      },
      {
        id: 3,
        title: 'Catálogo de produtos',
        description: 'Criar CRUD com categorias e filtros.',
        priority: 'medium',
        status: 'done' as TaskStatus,
        assignedTo: { name: 'Carla', avatarUrl: 'https://github.com/shadcn.png' },
      },
    ],
  },

  // ------------------------------
  // PROJECT 4
  // ------------------------------
  {
    id: 4,
    title: 'Sistema de RH',
    description: 'Sistema interno para gestão de colaboradores e folha de pagamento.',
    createdBy: 'Rafael Oliveira',
    color: '#0f6bc1',
    status: 'done' as TaskStatus,
    tasks: [
      {
        id: 1,
        title: 'Cadastro de colaboradores',
        description: 'Permitir registro completo com dados pessoais.',
        priority: 'medium',
        status: 'done' as TaskStatus,
        assignedTo: { name: 'Deborah', avatarUrl: 'https://github.com/shadcn.png' },
      },
      {
        id: 2,
        title: 'Módulo de férias',
        description: 'Calcular e programar férias automaticamente.',
        priority: 'low',
        status: 'done' as TaskStatus,
        assignedTo: { name: 'Henrique', avatarUrl: 'https://github.com/shadcn.png' },
      },
    ],
  },

  // ------------------------------
  // PROJECT 5
  // ------------------------------
  {
    id: 5,
    title: 'Dashboard Analytics',
    description: 'Dashboard interativo para monitoramento de métricas de negócio.',
    createdBy: 'Fabio Penna',
    color: '#ffaa33',
    status: 'in_progress' as TaskStatus,
    tasks: [
      {
        id: 1,
        title: 'Configurar banco de dados',
        description: 'Criar estrutura otimizada para consultas rápidas.',
        priority: 'high',
        status: 'in_progress' as TaskStatus,
        assignedTo: { name: 'Victor', avatarUrl: 'https://github.com/shadcn.png' },
      },
      {
        id: 2,
        title: 'Criar gráficos iniciais',
        description: 'Gráficos de linha, barra e pizza para principais KPIs.',
        priority: 'medium',
        status: 'to_do' as TaskStatus,
        assignedTo: { name: 'Sofia', avatarUrl: 'https://github.com/shadcn.png' },
      },
      {
        id: 3,
        title: 'Autenticação por JWT',
        description: 'Gerenciar login e sessão dos usuários.',
        priority: 'high',
        status: 'done' as TaskStatus,
        assignedTo: { name: 'Fernando', avatarUrl: 'https://github.com/shadcn.png' },
      },
    ],
  },
];
