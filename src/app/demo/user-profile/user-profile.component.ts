import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { LocalidadeService } from '../../services/localidade.service';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTabsModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSlideToggleModule,
    MatDividerModule,
    HttpClientModule,
    CardComponent
  ],
  providers: [LocalidadeService]
})
export class UserProfileComponent implements OnInit {
  infoForm: FormGroup;
  addressForm: FormGroup;
  securityForm: FormGroup;
  notificationForm: FormGroup;
  estados: any[] = [];
  cidades: any[] = [];
  username = '';
  
  // Categorias de habilidades para freelancers
  categorias = [
    { value: 'construcao', viewValue: 'Construção e Reformas' },
    { value: 'design', viewValue: 'Design e Tecnologia' },
    { value: 'ensino', viewValue: 'Ensino e Treinamento' },
    { value: 'saude', viewValue: 'Saúde e Bem-estar' },
    { value: 'servicos', viewValue: 'Serviços Domésticos' }
  ];

  constructor(private fb: FormBuilder, private localidadeService: LocalidadeService) {
    this.infoForm = this.fb.group({
      nome: ['Gabriel Maia', [Validators.required]],
      email: ['gabriel@example.com', [Validators.required, Validators.email]],
      telefone: ['(11) 98765-4321', [Validators.required]],
      dataNascimento: ['1990-01-01', [Validators.required]],
      profissao: ['Designer UX/UI', [Validators.required]],
      bio: ['Profissional com mais de 5 anos de experiência em design de interfaces e experiência do usuário.']
    });

    this.addressForm = this.fb.group({
      cep: ['60000-000', [Validators.required]],
      estado: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      bairro: ['Centro', [Validators.required]],
      rua: ['Av. Principal', [Validators.required]],
      numero: ['123', [Validators.required]],
      complemento: ['Apto 101']
    });

    this.securityForm = this.fb.group({
      senhaAtual: ['', [Validators.required]],
      novaSenha: ['', [Validators.required, Validators.minLength(8)]],
      confirmarSenha: ['', [Validators.required]]
    });

    this.notificationForm = this.fb.group({
      emailNotificacoes: [true],
      smsNotificacoes: [false],
      pushNotificacoes: [true],
      novosServicos: [true],
      novasOfertas: [true],
      atualizacoesPlataforma: [true]
    });
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || 'Usuário';
    this.loadEstados();
  }

  loadEstados(): void {
    this.localidadeService.getEstados().subscribe((data: any) => {
      this.estados = data;
    });
  }

  onEstadoChange(event: any): void {
    const estadoId = event.value;
    this.localidadeService.getMunicipios(estadoId).subscribe((data: any) => {
      this.cidades = data;
    });
  }

  saveInfoForm(): void {
    if (this.infoForm.valid) {
      console.log('Informações salvas:', this.infoForm.value);
      // Implementar lógica para salvar as informações
    }
  }

  saveAddressForm(): void {
    if (this.addressForm.valid) {
      console.log('Endereço salvo:', this.addressForm.value);
      // Implementar lógica para salvar o endereço
    }
  }

  saveSecurityForm(): void {
    if (this.securityForm.valid) {
      console.log('Segurança atualizada:', this.securityForm.value);
      // Implementar lógica para atualizar a senha
    }
  }

  saveNotificationForm(): void {
    console.log('Notificações atualizadas:', this.notificationForm.value);
    // Implementar lógica para salvar as preferências de notificações
  }
}
