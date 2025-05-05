// Interface principal para prestadores de serviços (freelancers)
export interface Colaborador {
  id: string;
  nome: string;
  titulo: string;
  descricao: string;
  valorHora: number;
  valorOriginal?: number;
  avaliacao: number;
  totalAvaliacoes?: number;
  fotoPerfil: string;
  projetosCompletos: number;
  categoria: string;
  subcategoria?: string;
  habilidades: Habilidade[];
  tags: string[];
  tempoEntrega?: number;
  nivel: 'Iniciante' | 'Intermediário' | 'Expert';
  disponibilidade?: string;
  desconto?: number;
  experiencia?: string;
  certificacoes?: string[];
  idiomas?: string[];
  destaque?: boolean;
}

// Interface para habilidades com níveis de proficiência
export interface Habilidade {
  nome: string;
  nivel: number; // 1-5
}

// Interface para agendamentos de trabalhos
export interface AgendamentoServico {
  id: number;
  // Campos em português (originais)
  nomeCliente: string;
  fotoCliente: string;
  endereco: string;
  data: string;
  hora: string;
  servico: string;
  preco: number;
  status: string;
  distancia?: string;
  observacoes?: string;

  // Campos em inglês (para suporte à tabela)
  clientName?: string;
  clientPhoto?: string;
  address?: string;
  date?: string;
  time?: string;
  service?: string;
  price?: number;
  distance?: string;
  notes?: string;
}

// Interface para histórico de trabalhos
export interface HistoricoTrabalho {
  id: string;
  nomeCliente: string;
  data: Date;
  servico: string;
  avaliacao: number;
  valor: number;
  status: 'concluido' | 'em-andamento' | 'cancelado';
}
