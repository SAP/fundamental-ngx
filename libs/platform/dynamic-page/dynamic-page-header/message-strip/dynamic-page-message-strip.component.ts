import { ChangeDetectionStrategy, Component, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-dynamic-page-message-strip',
    template: `
        <ng-template #contentTemplateRef>
            <ng-content></ng-content>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DynamicPageMessageStripComponent {
    /**
     * @hidden
     * The component view is wrapped in ng-template so
     * component's consumer have to use this templateRef to render it
     * in its view.
     *
     * The template reference to the component view.
     */
    readonly contentTemplateRef = viewChild.required<TemplateRef<any>>('contentTemplateRef');
}
