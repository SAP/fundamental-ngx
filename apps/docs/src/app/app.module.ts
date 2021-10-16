import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { ContentDensityService } from '@fundamental-ngx/core/utils';
import { AppComponent } from './app.component';

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
            library: 'Experimental'
        },
        loadChildren: () => import('./fn/fn-documentation.module').then((m) => m.ExperimentalDocumentationModule)
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
    providers: [ContentDensityService]
})
export class AppModule {}
