import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { ThemingModule } from '@fundamental-ngx/core/theming';
import { AppComponent } from './app.component';
import { FD_LANGUAGE, FD_LANGUAGE_ENGLISH } from '@fundamental-ngx/i18n';
import { BehaviorSubject } from 'rxjs';
import { ClickedBehaviorModule } from '@fundamental-ngx/cdk/utils';
import { SharedDocumentationModule } from '@fundamental-ngx/docs/shared';
import packageJson from '../../../../package.json';

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
        path: 'cx',
        data: {
            library: 'CX'
        },
        loadChildren: () => import('./cx/cx-documentation.module').then((m) => m.CxDocumentationModule)
    },
    {
        path: 'cdk',
        data: {
            library: 'CDK'
        },
        loadChildren: () => import('./cdk/cdk-documentation.module').then((m) => m.CDKDocumentationModule)
    },
    { path: '', redirectTo: 'core', pathMatch: 'full' }
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(routes, {
            useHash: true,
            preloadingStrategy: PreloadAllModules
        }),
        MarkdownModule.forRoot({ loader: HttpClient }),
        ThemingModule,
        ContentDensityModule.forRoot({ storage: 'localStorage' }),
        ClickedBehaviorModule.forRoot(),
        SharedDocumentationModule.forRoot(packageJson),
        SkeletonModule
    ],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: FD_LANGUAGE,
            useValue: new BehaviorSubject(FD_LANGUAGE_ENGLISH)
        }
    ]
})
export class AppModule {}
