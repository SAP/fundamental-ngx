import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleChildService,
    ExampleFile,
    getExampleFile
} from '@fundamental-ngx/docs/shared';
import { AdvancedScrollingExampleComponent } from '../../examples/advanced-scrolling/advanced-scrolling-example.component';

@Component({
    selector: 'fdp-doc-advanced-examples-docs',
    templateUrl: './advanced-examples-docs.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        AdvancedScrollingExampleComponent,
        CodeExampleComponent,
        FdDatetimeModule
    ]
})
export class AdvancedExamplesDocsComponent {
    childService = inject(ExampleChildService);
    route = inject(ActivatedRoute);
    pageScrollingTableFiles: ExampleFile[] = [
        getExampleFile('advanced-scrolling/advanced-scrolling-example.component.html'),
        getExampleFile('advanced-scrolling/advanced-scrolling-example.component.ts', {
            selector: 'doc-advanced-scrolling-example',
            component: 'AdvancedScrollingExampleComponent'
        })
    ];
    constructor() {
        this.childService.setLink(this.route.snapshot.routeConfig?.path);
    }
}
