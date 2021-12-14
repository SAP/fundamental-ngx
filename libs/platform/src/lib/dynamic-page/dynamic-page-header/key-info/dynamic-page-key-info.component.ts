import { Component, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';

import { CLASS_NAME } from '../../constants';

@Component({
    selector: 'fdp-dynamic-page-key-info',
    template: `
        <ng-template #contentTemplateRef>
            <div [class]="CLASS_NAME.dynamicPageKeyInfo">
                <ng-content></ng-content>
            </div>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DynamicPageKeyInfoComponent {
    readonly CLASS_NAME = CLASS_NAME;

    /**
     * @hidden
     * The component view is wrapped in ng-template so
     * component's consumer have to use this templateRef to render it
     * in its view.
     *
     * The template reference to the component view.
     */
    @ViewChild('contentTemplateRef')
    contentTemplateRef: TemplateRef<any>;
}
