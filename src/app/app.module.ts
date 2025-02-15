import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Adicione esta linha
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { BreadcrumbComponent } from './theme/shared/components/breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [
    AppComponent,
    // ...existing declarations...
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Adicione esta linha
    BrowserAnimationsModule,
    BreadcrumbComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
