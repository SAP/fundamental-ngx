import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DragAndDropModule } from '@fundamental-ngx/cdk/utils';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { DisplayListItemModule, PlatformListModule } from '@fundamental-ngx/platform/list';

import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';

import { PlatformDisplayListItemBorderLessExampleComponent } from './examples/platform-display-list-item-border-less-example.component';
import { PlatformDisplayListItemExampleComponent } from './examples/platform-display-list-item-example.component';
import { PlatformDisplayListItemWithNavigationExampleComponent } from './examples/platform-display-list-item-with-navigation-example.component';
import { PlatformDisplayListItemDocsComponent } from './platform-display-list-item-docs.component';
import { PlatformDisplayListItemHeaderComponent } from './platform-display-list-item-header/platform-display-list-item-header.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformDisplayListItemHeaderComponent,
        children: [
            { path: '', component: PlatformDisplayListItemDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.displaylistitem } }
        ]
    }
];

@NgModule({
    imports: [
        DragDropModule,
        DragAndDropModule,
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        ToolbarModule,
        PlatformListModule,
        PlatformButtonModule,
        DisplayListItemModule,
        PlatformDisplayListItemDocsComponent,
        PlatformDisplayListItemHeaderComponent,
        PlatformDisplayListItemExampleComponent,
        PlatformDisplayListItemBorderLessExampleComponent,
        PlatformDisplayListItemWithNavigationExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('display-list-item')]
})
export class PlatformDisplayListItemDocsModule {}
