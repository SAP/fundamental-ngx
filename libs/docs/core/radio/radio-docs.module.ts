import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { RadioHeaderComponent } from './radio-header/radio-header.component';
import { RadioDocsComponent } from './radio-docs.component';
import { examples } from './examples';
import { DeprecatedRadioButtonCompactDirective, RadioModule } from '@fundamental-ngx/core/radio';
import { FormModule } from '@fundamental-ngx/core/form';
import { moduleDeprecationsProvider } from '@fundamental-ngx/core/utils';

const routes: Routes = [
    {
        path: '',
        component: RadioHeaderComponent,
        children: [
            { path: '', component: RadioDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.form } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, RadioModule, FormModule],
    exports: [RouterModule],
    declarations: [examples, RadioDocsComponent, RadioHeaderComponent],
    providers: [moduleDeprecationsProvider(DeprecatedRadioButtonCompactDirective), currentComponentProvider('radio')]
})
export class RadioDocsModule {}
