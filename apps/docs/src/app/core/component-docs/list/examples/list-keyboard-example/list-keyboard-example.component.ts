import { Component, ElementRef, ViewChild } from '@angular/core';
import { ButtonComponent, ListComponent } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-list-keyboard-example',
    templateUrl: './list-keyboard-example.component.html'
})
export class ListKeyboardExampleComponent {

    @ViewChild(ButtonComponent, { read: ElementRef })
    button: ElementRef

    @ViewChild(ListComponent)
    list: ListComponent

    approachEndCallback = () => {
        alert('End of list approached');
    }

    approachBeginCallback = () => {
        this.button.nativeElement.focus();
    }

    focusFirst(): void {
        this.list.setItemActive(0);
    }
}
