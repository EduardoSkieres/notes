import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialComponentsModule } from '../shared/material-components.module';



@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    MaterialComponentsModule
  ]
})
export class HomeModule { }
