import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    ApiComponent,
    currentComponentProvider,
    getI18nKey,
    I18nDocsComponent,
    SharedDocumentationPageModule
} from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';

import { GridListDocsComponent } from './grid-list-docs.component';
import { GridListHeaderComponent } from './grid-list-header/grid-list-header.component';
import { COMPONENTS } from './examples';
import { GridListModule } from '@fundamental-ngx/core/grid-list';
import { DragAndDropModule } from '@fundamental-ngx/cdk/utils';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { LinkModule } from '@fundamental-ngx/core/link';
import { TitleModule } from '@fundamental-ngx/core/title';
import { ButtonModule } from '@fundamental-ngx/core/button';

const routes: Routes = [
    {
        path: '',
        component: GridListHeaderComponent,
        children: [
            { path: '', component: GridListDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.gridList } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('coreGridList') }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        GridListModule,
        DragAndDropModule,
        AvatarModule,
        LinkModule,
        TitleModule,
        ButtonModule
    ],
    exports: [RouterModule],
    declarations: [GridListDocsComponent, GridListHeaderComponent, ...COMPONENTS],
    providers: [currentComponentProvider('grid-list')]
})
export class GridListDocsModule {}
