import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-toolbar-spacer'
})
export class ToolbarSpacerDirective {
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
