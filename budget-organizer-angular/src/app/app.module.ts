import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BudgetOrganizerComponent } from './main/budget-organizer/budget-organizer.component';
import { BudgetOrganizerHeaderComponent } from './main/budget-organizer-header/budget-organizer-header.component';
import { AddItemComponent } from './main/add-item/add-item.component';
import { DisplayTableComponent } from './main/display-table/display-table.component';
import { DisplayChartComponent } from './main/display-chart/display-chart.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ContactUsComponent,
    AboutUsComponent,
    BudgetOrganizerComponent,
    BudgetOrganizerHeaderComponent,
    AddItemComponent,
    DisplayTableComponent,
    DisplayChartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
