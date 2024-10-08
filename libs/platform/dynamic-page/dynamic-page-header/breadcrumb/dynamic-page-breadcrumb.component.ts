import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-dynamic-page-breadcrumb',
    template: `
        <ng-template #contentTemplateRef>
            <ng-content></ng-content>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true
})
export class DynamicPageBreadcrumbComponent {
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
