import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepeatModule } from '@fundamental-ngx/cdk/utils';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { LinkModule } from '@fundamental-ngx/core/link';
import { ListModule } from '@fundamental-ngx/core/list';
import { RadioModule } from '@fundamental-ngx/core/radio';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import {
    ApiComponent,
    SharedDocumentationModule,
    SharedDocumentationPageModule,
    currentComponentProvider
} from '@fundamental-ngx/docs/shared';
import { ListBylineBorderlessExampleComponent } from './examples/list-byline-borderless-example/list-byline-borderless-example.component';
import { ListBylineButtonExampleComponent } from './examples/list-byline-button-example/list-byline-button-example.component';
import { ListBylineInteractiveExampleComponent } from './examples/list-byline-interactive-example/list-byline-interactive-example.component';
import { ListBylineLoadingExampleComponent } from './examples/list-byline-loading-example/list-byline-loading-examples.component';
import { ListBylineNavigationExampleComponent } from './examples/list-byline-navigation-example/list-byline-navigation-example.component';
import { ListBylineSelectionExampleComponent } from './examples/list-byline-selection-example/list-byline-selection-example.component';
import { ListBylineStandardExampleComponent } from './examples/list-byline-standard-example/list-byline-standard-example.component';
import { ListBylineUnreadExampleComponent } from './examples/list-byline-unread-example/list-byline-unread-example.component';
import { ListBylineWrapExampleComponent } from './examples/list-byline-wrap-example/list-byline-wrap-example.component';
import { ListBylineDocsComponent } from './list-byline-docs.component';
import { ListBylineHeaderComponent } from './list-byline-header/list-byline-header.component';

const routes: Routes = [
    {
        path: '',
        component: ListBylineHeaderComponent,
        children: [
            { path: '', component: ListBylineDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.list } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        ListModule,
        LinkModule,
        CheckboxModule,
        RadioModule,
        SharedDocumentationModule,
        SkeletonModule,
        RepeatModule,
        ListBylineDocsComponent,
        ListBylineHeaderComponent,
        ListBylineSelectionExampleComponent,
        ListBylineBorderlessExampleComponent,
        ListBylineNavigationExampleComponent,
        ListBylineStandardExampleComponent,
        ListBylineButtonExampleComponent,
        ListBylineInteractiveExampleComponent,
        ListBylineWrapExampleComponent,
        ListBylineLoadingExampleComponent,
        ListBylineUnreadExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('list-byline')]
})
export class ListDocsModule {}
