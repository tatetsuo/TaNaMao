import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { Notyf } from 'notyf';

interface ServiceData {
  id: string;
  title: string;
  profileImage: string;
  freelancerName: string;
  category: string;
  price: number;
  rating: number;
  totalReviews: number;
  description: string;
  deliveryTime: number;
  level: string;
  tags: string[];
  portfolioItems?: string[];
  experience?: string;
  certifications?: string[];
  languages?: string[];
  availability?: string[];
}

@Component({
  selector: 'app-comprar-servico',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    CardComponent
  ],
  templateUrl: './comprar-servico.component.html',
  styleUrls: ['./comprar-servico.component.scss']
})
export class ComprarServicosComponent implements OnInit {
  serviceData: ServiceData;
  contractForm: FormGroup;
  paymentMethods = [
    'Cartão de Crédito',
    'Cartão de Débito',
    'Pix',
    'Boleto'
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.serviceData = navigation?.extras.state?.['serviceData'];

    if (!this.serviceData) {
      this.router.navigate(['/']);
      return;
    }

    this.contractForm = this.fb.group({
      serviceLocation: ['', Validators.required],
      scheduleDate: ['', Validators.required],
      scheduleTime: ['', Validators.required],
      additionalRequirements: [''],
      paymentMethod: ['', Validators.required],
      agreementTerms: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    if (!this.serviceData) {
      const notify = new Notyf();
      notify.error({
        message: 'Dados do serviço não encontrados',
        position: { x: 'right', y: 'top' }
      });
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    if (this.contractForm.valid) {
      const notify = new Notyf();
      notify.success({
        message: 'Contrato enviado com sucesso!',
        position: { x: 'right', y: 'top' }
      });
      this.router.navigate(['/']);
      console.log(this.contractForm.value);
    }
  }

  calculateTotal(): number {

    return this.serviceData.price;
  }
}