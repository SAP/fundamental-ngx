import { Component, ElementRef, ViewChild } from '@angular/core';
import { ButtonComponent, MenuKeyboardService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-list-keyboard-example',
    templateUrl: './list-keyboard-example.component.html',
    providers: [
        MenuKeyboardService
    ]
})
export class ListKeyboardExampleComponent {

    @ViewChild(ButtonComponent, { read: ElementRef })
    button: ElementRef

    constructor(
        private _menuKeyboardService: MenuKeyboardService
    ) {
        this._menuKeyboardService.focusEscapeAfterList = this.approachEndCallback;
        this._menuKeyboardService.focusEscapeBeforeList = this.approachBeginCallback;
    }

    approachEndCallback = () => {
        alert('End of list approached');
    }

    approachBeginCallback = () => {
        this.button.nativeElement.focus();
    }
}
