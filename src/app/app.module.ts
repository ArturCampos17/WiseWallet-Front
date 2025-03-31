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
import { NbToastrModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

import { ContactComponent } from './components/contact/contact.component';
import { RegisterTransactionComponent } from './components/register-transaction/register-transaction.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { CategoryManagementComponent } from './components/category-management/category-management.component';
import { StatisticsReportComponent } from './components/statistics-report/statistics-report.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './components/interceptors/auth.interceptor';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CepPipe } from './components/shared/pipes/cep.pipe';
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryComponent } from './components/category/category.component';
import { ChartComponent } from './components/chart/chart.component';
import { ChartCategoryComponent } from './components/chart-category/chart-category.component';

registerLocaleData(localePt);

@NgModule({

  declarations: [

    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    RegisterTransactionComponent,
    CategoryManagementComponent,
    StatisticsReportComponent,
    ProfileUserComponent,
    LoginComponent,
    SidebarComponent,
    CepPipe,
    AuthLayoutComponent,
    MainLayoutComponent,
    RegisterUserComponent,
    CategoryComponent,
    ChartComponent,
    ChartCategoryComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbCardModule,
    NbListModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbAccordionModule,
    NbToastrModule.forRoot({
      duration: 3000,
      preventDuplicates: true,
      destroyByClick: true,
    }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    NgbPaginationModule,
    NgChartsModule,
    MatSlideToggleModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true, 
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }