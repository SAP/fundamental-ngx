import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AsyncOrSyncPipe } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { ListModule } from '@fundamental-ngx/core/list';
import { TabsModule } from '@fundamental-ngx/core/tabs';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { I18nModule } from '@fundamental-ngx/i18n';
import { PlatformMessagePopoverModule } from '@fundamental-ngx/platform/message-popover';
import { SettingsGeneratorModule } from '@fundamental-ngx/platform/settings-generator';
import { PlatformSliderModule } from '@fundamental-ngx/platform/slider';
import { examples } from './examples';
import {
    PlatformFormGeneratorCustomSliderElementComponent,
    SettingsGeneratorCustomControlExampleComponent
} from './examples/custom-control/settings-generator-custom-control-example.component';
import {
    SettingsGeneratorCustomLayoutExampleComponent,
    SettingsGeneratorTabsLayoutComponent
} from './examples/custom-layout/settings-generator-custom-layout-example.component';
import { SettingsGeneratorDialogExampleComponent } from './examples/dialog/settings-generator-dialog-example.component';
import { SettingsGeneratorMessagePopoverExampleComponent } from './examples/message-popover/settings-generator-message-popover-example.component';
import { SettingsGeneratorDocsComponent } from './settings-generator-docs.component';
import { SettingsGeneratorHeaderComponent } from './settings-generator-header/settings-generator-header.component';

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
        DialogModule,
        TabsModule,
        AsyncOrSyncPipe,
        ReactiveFormsModule,
        PlatformSliderModule,
        FormsModule,
        examples,
        SettingsGeneratorDocsComponent,
        SettingsGeneratorHeaderComponent,
        SettingsGeneratorDialogExampleComponent,
        SettingsGeneratorMessagePopoverExampleComponent,
        SettingsGeneratorCustomControlExampleComponent,
        SettingsGeneratorCustomLayoutExampleComponent,
        SettingsGeneratorTabsLayoutComponent,
        PlatformFormGeneratorCustomSliderElementComponent
    ],
    exports: [
        RouterModule,
        SettingsGeneratorDialogExampleComponent,
        SettingsGeneratorMessagePopoverExampleComponent,
        SettingsGeneratorCustomControlExampleComponent,
        SettingsGeneratorCustomLayoutExampleComponent,
        SettingsGeneratorTabsLayoutComponent
    ],
    providers: [currentComponentProvider('settings-generator')]
})
export class SettingsGeneratorDocsModule {}
