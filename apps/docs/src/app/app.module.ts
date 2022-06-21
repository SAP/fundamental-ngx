import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { ContentDensityService } from '@fundamental-ngx/core/utils';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { AppComponent } from './app.component';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

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
        MarkdownModule.forRoot({ loader: HttpClient }),
        ContentDensityModule.forRoot({ storage: 'localStorage' }),
        SkeletonModule.forRoot({ defaultSkeletonState: false })
    ],
    bootstrap: [AppComponent],
    providers: [ContentDensityService]
})
export class AppModule {}
