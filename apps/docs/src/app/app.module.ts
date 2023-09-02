import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

import { ClickedBehaviorModule } from '@fundamental-ngx/cdk/utils';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { ThemingModule } from '@fundamental-ngx/core/theming';
import { SharedDocumentationModule } from '@fundamental-ngx/docs/shared';
import { FD_LANGUAGE, FD_LANGUAGE_ENGLISH } from '@fundamental-ngx/i18n';
import { BehaviorSubject } from 'rxjs';
import lernaJson from '../../../../lerna.json';
import packageJson from '../../../../package.json';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

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
        SharedDocumentationModule.forRoot({ packageJson, lernaJson }),
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
