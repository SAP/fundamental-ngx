import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { AppComponent } from './components/app/app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

const routes: Routes = [
    { path: '', loadChildren: '../modules/documentation/documentation.module#DocumentationModule' },
    { path: '**', redirectTo: '/' }
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        MarkdownModule.forRoot({ loader: HttpClient })
    ],
    bootstrap: [AppComponent],
    entryComponents: []
})
export class AppModule {}
