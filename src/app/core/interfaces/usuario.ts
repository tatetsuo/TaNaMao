// Interface principal para usuários que contratam serviços
export interface Usuario {
  id: string;
  nome: string;
  email: string;
  foto?: string;
  telefone?: string;
  endereco?: string;
  cidade?: string;
  tipo: 'cliente' | 'colaborador' | 'visitante';
  dataCriacao: Date;
}

// Interface para configurações da carteira do usuário
export interface ConfiguracoesCarteira {
  alertaSaldoBaixo: boolean;
  confirmacaoTransacao: boolean;
  alertaAtividadeSuspeita: boolean;
  requererPinParaSaques: boolean;
  limiteSaque: number;
  limiteTransferencia: number;
  pinSeguranca?: string;
}

// Interface para representar cartões de pagamento
export interface Cartao {
  id: string;
  numero: string;
  titular: string;
  dataValidade: string;
  cvv?: string;
  tipo: 'credito' | 'debito' | 'ambos';
  bandeira: string;
  padrao: boolean;
  ultimosQuatroDigitos: string;
  favorito?: boolean;
}

// Interface para transações financeiras
export interface Transacao {
  id: string;
  data: string | Date;
  valor: number;
  descricao: string;
  tipo: 'deposito' | 'saque' | 'pagamento' | 'reembolso' | 'receita';
  servicoId?: string;
  nomeServico?: string;
  colaboradorId?: string;
  nomeColaborador?: string;
  status: 'pendente' | 'concluido' | 'falhou' | 'cancelado';
}
