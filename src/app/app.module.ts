import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbListModule, NbInputModule, NbButtonModule,NbIconModule,NbAccordionModule  } from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './components/interceptors/auth.interceptor';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterTransactionComponent } from './components/register-transaction/register-transaction.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { CategoryManagementComponent } from './components/category-management/category-management.component';
import { StatisticsReportComponent } from './components/statistics-report/statistics-report.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CepPipe } from './components/shared/pipes/cep.pipe';
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';

registerLocaleData(localePt);

@NgModule({

  declarations: [

    AppComponent,
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    ContactComponent,
    RegisterTransactionComponent,
    TransactionListComponent,
    CategoryManagementComponent,
    StatisticsReportComponent,
    ProfileUserComponent,
    LoginComponent,
    SidebarComponent,
    CepPipe,
    AuthLayoutComponent,
    MainLayoutComponent,
    RegisterUserComponent

  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule, // 🔹 Necessário para animações do Nebular
    NbThemeModule.forRoot({ name: 'default' }), // 🔹 Inicializa o tema do Nebular
    NbLayoutModule,          // 🔹 Layout do Nebular
    NbCardModule,            // 🔹 Para usar <nb-card>
    NbListModule,            // 🔹 Para usar <nb-list> e <nb-list-item>
    NbInputModule,           // ✅ Para usar <nb-input> e <nb-input-group>
    NbButtonModule,          // ✅ Para usar <nb-button>
    NbIconModule,
    NbAccordionModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }, // Provedor existente
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true, // Permite múltiplos interceptors
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
