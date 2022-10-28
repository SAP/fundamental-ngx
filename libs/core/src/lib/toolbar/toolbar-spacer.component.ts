import { Component, ViewEncapsulation, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'fd-toolbar-spacer',
    template: ``,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarSpacerComponent {
    /** Determines the width of spacer when fixed property is set to true
     * Allowed values: absolute and relative metrics
     * Default value: 0px
     */
    @HostBinding('style.width')
    @Input()
    width = '0px';

    /** Property allows user to pass additional class
     */
    @Input()
    class = '';

    /** Determines if spacer should take only size taken from width property
     * Default value: false
     * Default behaviour: spacer takes remaining space automatically
     */
    @Input()
    fixed = false;

    /** @hidden */
    @HostBinding('attr.class')
    get css(): string {
        return `fd-toolbar__spacer ${this.fixed ? 'fd-toolbar__spacer--fixed' : ''} ${this.class}`;
    }
}
