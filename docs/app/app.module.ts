import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'docs', loadChildren: '../modules/documentation/documentation.module#DocumentationModule' },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    NgbActiveModal
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: []
})
export class AppModule { }
