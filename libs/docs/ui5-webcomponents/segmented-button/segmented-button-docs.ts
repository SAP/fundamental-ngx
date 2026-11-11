import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { NotificationChannelsSample } from './examples/notification-channels-sample';
import { SegmentedButtonExample } from './examples/segmented-button-sample';

const basicSampleHtml = 'segmented-button-sample.html';
const basicSampleTs = 'segmented-button-sample.ts';
const notificationChannelsHtml = 'notification-channels-sample.html';
const notificationChannelsTs = 'notification-channels-sample.ts';

@Component({
    selector: 'ui5-segmented-button-docs',
    templateUrl: './segmented-button-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        SegmentedButtonExample,
        NotificationChannelsSample
    ]
})
export class SegmentedButtonDocs {
    private readonly exampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'segmented-button-example'
        },
        {
            language: 'typescript',
            component: 'SegmentedButtonExample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'segmented-button-example'
        }
    ]);

    readonly examples = computed(() => this.exampleFiles());

    readonly notificationChannelsExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(notificationChannelsHtml),
            originalFileName: 'notification-channels-example'
        },
        {
            language: 'typescript',
            component: 'NotificationChannelsSample',
            code: getAssetFromModuleAssets(notificationChannelsTs),
            originalFileName: 'notification-channels-example'
        }
    ];
}
