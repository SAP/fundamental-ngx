import { Component } from '@angular/core';
import { ExampleFile, getExampleFile } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-settings-generator',
    templateUrl: './settings-generator-docs.component.html'
})
export class SettingsGeneratorDocsComponent {
    settingsGeneratorDefaultExample: ExampleFile[] = [
        getExampleFile('default/settings-generator-default-example.component.html'),
        getExampleFile('default/settings-generator-default-example.component.ts')
    ];
}
