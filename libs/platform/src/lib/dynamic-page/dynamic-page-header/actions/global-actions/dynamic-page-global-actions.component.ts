import { Component, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';

@Component({
    selector: 'fdp-dynamic-page-global-actions',
    template: '<ng-template #contentTemplateRef><ng-content></ng-content></ng-template>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DynamicPageGlobalActionsComponent {
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
