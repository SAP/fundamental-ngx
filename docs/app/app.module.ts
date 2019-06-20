import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HighlightModule } from 'ngx-highlightjs';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

export function hljsLanguages() {
    return [
        {name: 'typescript', func: typescript},
        {name: 'scss', func: scss},
        {name: 'html', func: xml},
    ];
}

const routes: Routes = [
    { path: '', loadChildren: './documentation/documentation.module#DocumentationModule' },
    { path: '**', redirectTo: '/home' }
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        MarkdownModule.forRoot({ loader: HttpClient }),
        HighlightModule.forRoot({ languages: hljsLanguages })
    ],
    bootstrap: [AppComponent],
    entryComponents: []
})
export class AppModule {}
