import { Directive, ElementRef, Input, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[fdpMessagePopoverFormItem]'
})
export class MessagePopoverFormItemDirective {
    /** Form item name. */
    @Input('fdpMessagePopoverFormItem')
    label: string;

    /** @hidden */
    constructor(public elementRef: ElementRef, @Optional() public control: NgControl) {}
}
