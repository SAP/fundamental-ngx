import { ChangeDetectionStrategy, Component, ElementRef, inject, input, ViewEncapsulation } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';

export type FooterPosition = 'start' | 'end';

@Component({
    selector: 'fd-layout-panel-footer',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-layout-panel__footer',
        '[class.fd-layout-panel__footer--start]': 'position() === "start"',
        '[class.fd-layout-panel__footer--end]': 'position() === "end"'
    }
})
export class LayoutPanelFooterComponent implements HasElementRef {
    /**
     * Footer variations, can be start (left aligned), end (right aligned) or null for default.
     * The default value will render the content of the footer in the middle.
     */
    position = input<FooterPosition | null>(null);

    /** @hidden */
    readonly elementRef = inject(ElementRef);
}
