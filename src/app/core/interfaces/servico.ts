export interface Servico {
  id: string;
  titulo: string;
  descricao: string;
  preco: number;
  categoria: string;
  subcategoria?: string;
  avaliacao?: number;
  totalAvaliacoes?: number;
  colaboradorId: string;
  nomeColaborador?: string;
  fotoColaborador?: string;
  imagemUrl?: string;
  tempoEntrega?: number;
  disponibilidade?: string;
  nivel?: string;
  
  // Adicionando as propriedades que estão causando erros
  certificacoes?: string[];
  portfolioItems?: PortifolioItem[];
}

export interface PortifolioItem {
    titulo: string;
    imagem: string;
    descricao: string;
}
