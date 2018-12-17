import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'docs', loadChildren: '../modules/documentation/documentation.module#DocumentationModule' },
    { path: '**', redirectTo: '/' }
];

@NgModule({
    declarations: [AppComponent, HomeComponent],
    imports: [BrowserAnimationsModule, RouterModule.forRoot(routes)],
    bootstrap: [AppComponent],
    entryComponents: []
})
export class AppModule {}
