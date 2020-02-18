import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApiComponent} from '../../../documentation/core-helpers/api/api.component';
import {SharedDocumentationModule} from '../../../documentation/shared-documentation.module';
import {API_FILES} from '../../api-files';
import {
    SelectNativeExampleComponent,
    SelectNativeInlineHelpExampleComponent,
    SelectNativeStateExampleComponent
} from './examples/select-native-examples.component';
import {SelectNativeFormGroupExampleComponent} from './examples/select-native-form-group-example.component';
import {SelectNativeHeaderComponent} from './select-native-header/select-native-header.component';
import {SelectNativeDocsComponent} from './select-native-docs.component';

const routes: Routes = [
    {
        path: '',
        component: SelectNativeHeaderComponent,
        children: [
            {path: '', component: SelectNativeDocsComponent},
            {path: 'api', component: ApiComponent, data: {content: API_FILES.form}}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule
    ],
    exports: [RouterModule],
    declarations: [
        SelectNativeDocsComponent,
        SelectNativeHeaderComponent,
        SelectNativeExampleComponent,
        SelectNativeStateExampleComponent,
        SelectNativeFormGroupExampleComponent,
        SelectNativeInlineHelpExampleComponent
    ]
})
export class SelectNativeDocsModule {
}
