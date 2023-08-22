import { Directive, ElementRef, Input, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MessagePopoverConfig } from '../default-config';

@Directive({
    selector: '[fdpMessagePopoverFormItem]',
    standalone: true
})
export class MessagePopoverFormItemDirective {
    /** Form item name. */
    @Input('fdpMessagePopoverFormItem')
    label: string;

    /** Error type definition. */
    @Input()
    errorTypes: MessagePopoverConfig['errors'];

    /** @hidden */
    constructor(public readonly elementRef: ElementRef, @Optional() public readonly control: NgControl) {}
}
