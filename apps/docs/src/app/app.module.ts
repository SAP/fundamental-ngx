import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

const routes: Routes = [
    { path: 'core', loadChildren: () => import('./core/core-documentation.module').then(m => m.CoreDocumentationModule) },
    { path: 'platform', loadChildren: () => import('./platform/platform-documentation.module').then(m => m.PlatformDocumentationModule) },
    { path: '', redirectTo: 'core', pathMatch: 'full' }
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled'
        }),
        HttpClientModule,
        MarkdownModule.forRoot({ loader: HttpClient }),
    ],
    bootstrap: [AppComponent],
    entryComponents: []
})
export class AppModule {}
