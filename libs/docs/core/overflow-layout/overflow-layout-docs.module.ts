import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { AvatarGroupModule } from '@fundamental-ngx/core/avatar-group';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { InfoLabelModule } from '@fundamental-ngx/core/info-label';
import { LinkModule } from '@fundamental-ngx/core/link';
import { OverflowLayoutModule } from '@fundamental-ngx/core/overflow-layout';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { QuickViewModule } from '@fundamental-ngx/core/quick-view';
import { TitleModule } from '@fundamental-ngx/core/title';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { examples } from './examples';
import { OverflowLayoutDocsComponent } from './overflow-layout-docs.component';
import { OverflowLayoutHeaderComponent } from './overflow-layout-header/overflow-layout-header.component';

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
        TitleModule,
        examples
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('overflow-layout')]
})
export class OverflowLayoutDocsModule {}
