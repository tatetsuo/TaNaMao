import { PortifolioItem } from "./servico";

export interface PerfilBase {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
    cidade: string;
    estado: string;
    
}

// Interface para contratos de serviço
export interface ContratoServico {
  id: string;
  servicoId: string;
  titulo: string;
  colaboradorId: string;
  nomeColaborador: string;
  fotoColaborador: string;
  preco: number;
  dataAgendada: Date;
  horaAgendada: string;
  local: string;
  status: 'agendado' | 'confirmado' | 'em-andamento' | 'concluido' | 'cancelado';
  requisitosAdicionais?: string;
  metodoPagamento: string;
  totalPago: number;
  dataCriacao: Date;
  dataAtualizacao?: Date;
}

// Interface para serviços oferecidos
export interface Servico {
  id: string | number;
  titulo: string;
  categoria: string;
  subcategoria?: string;
  preco: number;
  avaliacao: number;
  totalAvaliacoes: number;
  nomeColaborador: string;
  fotoColaborador: string;
  tags: string[];
  tempoEntrega: number;
  descricao: string;
  nivel: 'Iniciante' | 'Intermediário' | 'Expert';
  certificacoes?: string[];
  portfolioItems?: PortifolioItem[];
}

// Interface para filtros de busca
export interface Filtro {
  nome: string;
  opcoes: string[];
}

// Interface para profissionais próximos no mapa
export interface ProfissionalProximo {
  lat: number;
  lng: number;
  profissao: string;
  nome: string;
  distancia: number; // em km
  fotoPerfil?: string;
  avaliacao?: number;
  projetosCompletos?: number;
  valorHora?: number;
  nivel?: string;
}

// Configuração para componente Card
export interface ConfiguracaoCard {
  tituloCard?: string;
  classeCard?: string;
  classeBloco?: string;
  classeHeader?: string;
  temOpcoes?: boolean;
  ocultarHeader?: boolean;
  headerPersonalizado?: boolean;
  legendaCard?: string;
  classeLegenda?: string;
  temRodape?: boolean;
  classeRodape?: string;
}