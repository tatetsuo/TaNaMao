import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthenticationRoutingModule, MatChipsModule]
})
export class AuthenticationModule {}
