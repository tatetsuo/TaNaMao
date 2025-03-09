import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalidadeService {
  private apiUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades';

  constructor(private http: HttpClient) { }

  getEstados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/estados?orderBy=nome`)
      .pipe(
        catchError(error => {
          console.error('Erro ao obter estados:', error);
          // Retorna alguns estados em caso de falha na API
          return of([
            { id: 'CE', nome: 'Ceará' },
            { id: 'SP', nome: 'São Paulo' },
            { id: 'RJ', nome: 'Rio de Janeiro' },
            { id: 'MG', nome: 'Minas Gerais' },
            { id: 'RS', nome: 'Rio Grande do Sul' }
          ]);
        })
      );
  }

  getMunicipios(estadoId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/estados/${estadoId}/municipios?orderBy=nome`)
      .pipe(
        catchError(error => {
          console.error('Erro ao obter municípios:', error);
          // Retorna alguns municípios em caso de falha na API
          return of([
            { id: '1', nome: 'Fortaleza' },
            { id: '2', nome: 'São Paulo' },
            { id: '3', nome: 'Rio de Janeiro' },
            { id: '4', nome: 'Belo Horizonte' },
            { id: '5', nome: 'Porto Alegre' }
          ]);
        })
      );
  }
}
