import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { ContentDensityService } from '@fundamental-ngx/core/utils';
import { AppComponent } from './app.component';
import { FD_LANGUAGE, FD_LANGUAGE_ENGLISH } from '@fundamental-ngx/i18n';
import { BehaviorSubject } from 'rxjs';

const routes: Routes = [
    {
        path: 'core',
        data: {
            library: 'Core'
        },
        loadChildren: () => import('./core/core-documentation.module').then((m) => m.CoreDocumentationModule)
    },
    {
        path: 'platform',
        data: {
            library: 'Platform'
        },
        loadChildren: () =>
            import('./platform/platform-documentation.module').then((m) => m.PlatformDocumentationModule)
    },
    {
        path: 'fn',
        data: {
            library: 'Fiori Next'
        },
        loadChildren: () => import('./fn/fn-documentation.module').then((m) => m.FnDocumentationModule)
    },
    { path: '', redirectTo: 'core', pathMatch: 'full' }
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' }),
        MarkdownModule.forRoot({ loader: HttpClient })
    ],
    bootstrap: [AppComponent],
    providers: [
        ContentDensityService,
        {
            provide: FD_LANGUAGE,
            useValue: new BehaviorSubject(FD_LANGUAGE_ENGLISH)
        }
    ]
})
export class AppModule {}
