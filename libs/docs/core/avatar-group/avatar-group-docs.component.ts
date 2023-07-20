import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets, getExampleFile } from '@fundamental-ngx/docs/shared';

const service = () => ({
    language: 'typescript',
    name: 'avatar-group-data-example.service.ts',
    code: getAssetFromModuleAssets('avatar-group-data-example.service.ts'),
    fileName: 'avatar-group-data-example',
    component: 'AvatarGroupDataExampleService',
    service: true
});

@Component({
    selector: 'app-avatar-group',
    templateUrl: './avatar-group-docs.component.html'
})
export class AvatarGroupDocsComponent {
    avatarGroupDefaultExample: ExampleFile[] = [
        getExampleFile('default/avatar-group-default-example.component.html'),
        getExampleFile('default/avatar-group-default-example.component.ts'),
        service()
    ];
    avatarGroupGroupExample: ExampleFile[] = [
        getExampleFile('group-type/group-type-example.component.html'),
        getExampleFile('group-type/group-type-example.component.ts', { component: 'GroupTypeExampleComponent' }),
        service()
    ];
    verticalAvatarGroupExample: ExampleFile[] = [
        getExampleFile('vertical/avatar-group-vertical-example.component.html'),
        getExampleFile('vertical/avatar-group-vertical-example.component.ts', {
            component: 'AvatarGroupVerticalExampleComponent'
        }),
        service()
    ];
}
