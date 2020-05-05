import { ContentChild, Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { CheckboxComponent } from '../checkbox/checkbox/checkbox.component';

/**
 * The component that represents a list item.
 * The list item can contain plain text, links or actions.
 *
 * ```html
 * <ul fd-list>
 *    <li fd-list-item>
 *        List item 1
 *    </li>
 * </ul>
 * ```
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-list-item]',
    host: {
        class: 'fd-list__item'
    }
})
export class ListItemDirective {
    /** Whether tab is selected */
    @Input()
    @HostBinding('class.is-selected')
    selected: boolean = false;

    /** @hidden */
    @ContentChild(CheckboxComponent)
    checkboxComponent: CheckboxComponent;

    /** @hidden */
    constructor(public itemEl: ElementRef) {}

    /** @hidden */
    public focus(): void {
        if (this.checkboxComponent) {
            // if there is a checkbox in this list item, we want to focus its input label
            this.checkboxComponent.inputLabel.nativeElement.focus();
        } else {
            this.itemEl.nativeElement.focus();
        }
    }

    /** @hidden */
    public click(): void {
        if (this.checkboxComponent) {
            // if there is a checkbox in this list item, we want to click its input label
            this.checkboxComponent.inputLabel.nativeElement.click();
        } else {
            this.itemEl.nativeElement.click();
        }
    }
}
