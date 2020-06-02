import { ContentChild, Component, ElementRef, HostBinding, Input } from '@angular/core';
import { CheckboxComponent } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {

    /** Whether tab is selected */
    @Input()
    @HostBinding('class.is-selected')
    selected: boolean = false;

    /** @hidden */
    @ContentChild(CheckboxComponent, { static: false })
    checkboxComponent: CheckboxComponent;

    /** @hidden */
    constructor(public itemEl: ElementRef) { }

    /** @hidden */
    public focus(): void {
        if (this.checkboxComponent) { // if there is a checkbox in this list item, we want to focus its input label
            this.checkboxComponent.inputLabel.nativeElement.focus();
        } else {
            this.itemEl.nativeElement.focus();
        }
    }

    /** @hidden */
    public click(): void {
        if (this.checkboxComponent) { // if there is a checkbox in this list item, we want to click its input label
            this.checkboxComponent.inputLabel.nativeElement.click();
        } else {
            this.itemEl.nativeElement.click();
        }
    }

}
