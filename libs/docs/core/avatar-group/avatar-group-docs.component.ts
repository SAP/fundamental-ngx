import { Component } from '@angular/core';
import { ExampleFile, getExampleFile } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-avatar-group',
    templateUrl: './avatar-group-docs.component.html'
})
export class AvatarGroupDocsComponent {
    avatarGroupDefaultExample: ExampleFile[] = [
        getExampleFile('default/avatar-group-default-example.component.html'),
        getExampleFile('default/avatar-group-default-example.component.ts')
    ];
}
