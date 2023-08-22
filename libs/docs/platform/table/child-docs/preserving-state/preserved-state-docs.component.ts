import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExampleChildService, ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { PlatformTablePreservedStateExampleComponent } from '../../examples/preserved-state/platform-table-preserved-state-example.component';
import { SeparatorComponent } from '../../../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../../../shared/src/lib/core-helpers/code-example/code-example.component';
import { ComponentExampleComponent } from '../../../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const platformTableActivableRowSrc = 'preserved-state/platform-table-preserved-state-example.component.html';
const platformTableActivableRowTsSrc = 'preserved-state/platform-table-preserved-state-example.component.ts';

@Component({
    selector: 'fdp-doc-preserved-state-docs',
    templateUrl: './preserved-state-docs.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformTablePreservedStateExampleComponent,
        CodeExampleComponent,
        SeparatorComponent
    ]
})
export class PreservedStateDocsComponent {
    childService = inject(ExampleChildService);
    route = inject(ActivatedRoute);

    preservedStateFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableActivableRowSrc),
            fileName: 'platform-table-preserved-state-example.component',
            name: 'platform-table-preserved-state-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableActivableRowTsSrc),
            fileName: 'platform-table-preserved-state-example',
            component: 'PlatformTablePreservedStateExampleComponent',
            name: 'platform-table-preserved-state-example.component.ts'
        }
    ];

    constructor() {
        this.childService.setLink(this.route.snapshot.routeConfig?.path);
    }
}
