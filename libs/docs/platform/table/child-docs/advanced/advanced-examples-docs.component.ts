import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExampleChildService, ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
const platformTablePageScrollingSrc = 'advanced-scrolling/advanced-scrolling-example.component.html';
const platformTablePageScrollingTsSrc = 'advanced-scrolling/advanced-scrolling-example.component.ts';

@Component({
    selector: 'fdp-doc-advanced-examples-docs',
    templateUrl: './advanced-examples-docs.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvancedExamplesDocsComponent {
    childService = inject(ExampleChildService);
    route = inject(ActivatedRoute);
    pageScrollingTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTablePageScrollingSrc),
            fileName: 'advanced-scrolling-example',
            name: 'advanced-scrolling-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTablePageScrollingTsSrc),
            fileName: 'advanced-scrolling-example',
            component: 'AdvancedScrollingExampleComponent',
            name: 'advanced-scrolling-example.component.ts'
        }
    ];
    constructor() {
        this.childService.setLink(this.route.snapshot.routeConfig?.path);
    }
}
