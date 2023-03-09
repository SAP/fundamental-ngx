import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { SettingsGeneratorHeaderComponent } from './settings-generator-header/settings-generator-header.component';
import { SettingsGeneratorDocsComponent } from './settings-generator-docs.component';
import { examples } from './examples';
import { SettingsGeneratorModule } from '@fundamental-ngx/platform/settings-generator';
import { I18nModule } from '@fundamental-ngx/i18n';
import { ListModule } from '@fundamental-ngx/core/list';
import { BarModule } from '@fundamental-ngx/core/bar';
import { PlatformMessagePopoverModule } from '@fundamental-ngx/platform';
import { SettingsGeneratorDialogExampleComponent } from './examples/dialog/settings-generator-dialog-example.component';
import { DialogModule } from '@fundamental-ngx/core/dialog';

const routes: Routes = [
    {
        path: '',
        component: SettingsGeneratorHeaderComponent,
        children: [
            { path: '', component: SettingsGeneratorDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.settingsGenerator } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        SettingsGeneratorModule,
        I18nModule,
        ListModule,
        BarModule,
        PlatformMessagePopoverModule,
        DialogModule
    ],
    exports: [RouterModule, SettingsGeneratorDialogExampleComponent],
    declarations: [
        examples,
        SettingsGeneratorDocsComponent,
        SettingsGeneratorHeaderComponent,
        SettingsGeneratorDialogExampleComponent
    ],
    providers: [currentComponentProvider('settings-generator')]
})
export class SettingsGeneratorDocsModule {}
