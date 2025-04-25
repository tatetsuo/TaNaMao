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
  nomeCliente: string;
  endereco: string;
  data: string;
  hora: string;
  servico: string;
  preco: number;
  status: 'pendente' | 'confirmado' | 'concluido' | 'cancelado';
  distancia?: string;
  fotoCliente?: string;
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
