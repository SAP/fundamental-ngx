import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { AvatarGroupModule } from '@fundamental-ngx/core/avatar-group';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { InfoLabelModule } from '@fundamental-ngx/core/info-label';
import { LinkModule } from '@fundamental-ngx/core/link';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { QuickViewModule } from '@fundamental-ngx/core/quick-view';
import { TitleModule } from '@fundamental-ngx/core/title';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { OverflowLayoutHeaderComponent } from './overflow-layout-header/overflow-layout-header.component';
import { OverflowLayoutDocsComponent } from './overflow-layout-docs.component';
import { examples } from './examples';
import { OverflowLayoutModule } from '@fundamental-ngx/core/overflow-layout';

const routes: Routes = [
    {
        path: '',
        component: OverflowLayoutHeaderComponent,
        children: [
            { path: '', component: OverflowLayoutDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.overflowLayout } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        OverflowLayoutModule,
        AvatarModule,
        AvatarGroupModule,
        InfoLabelModule,
        ButtonModule,
        PopoverModule,
        QuickViewModule,
        BarModule,
        LinkModule,
        TitleModule
    ],
    exports: [RouterModule],
    declarations: [examples]
})
export class OverflowLayoutDocsModule {}
