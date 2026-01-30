import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'fd-layout-panel-body',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-layout-panel__body fd-has-display-block',
        '[class.fd-layout-panel__body--bleed]': 'bleed()'
    }
})
export class LayoutPanelBodyComponent {
    /**
     * Whether the edges of the panel should have bleeding padding.
     * @default false
     */
    readonly bleed = input(false, { transform: booleanAttribute });
}
