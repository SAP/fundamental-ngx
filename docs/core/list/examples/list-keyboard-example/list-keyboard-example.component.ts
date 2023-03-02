import { Component, ElementRef, ViewChild } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ListComponent } from '@fundamental-ngx/core/list';
import { FocusEscapeDirection } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fd-list-keyboard-example',
    templateUrl: './list-keyboard-example.component.html'
})
export class ListKeyboardExampleComponent {
    @ViewChild(ButtonComponent, { read: ElementRef })
    button: ElementRef;

    @ViewChild(ListComponent)
    list: ListComponent;

    handleFocusEscape(direction: FocusEscapeDirection): void {
        if (direction === 'up') {
            this.button.nativeElement.focus();
        } else {
            alert('End of list approached');
        }
    }

    focusFirst(): void {
        this.list.setItemActive(0);
    }
}
