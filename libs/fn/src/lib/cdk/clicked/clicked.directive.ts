import { Directive, Output } from '@angular/core';
import { FnClickedProvider } from './fn-clicked.provider';
import { Observable } from 'rxjs';

@Directive({
    selector: '[fnClicked]',
    providers: [FnClickedProvider]
})
export class ClickedDirective {
    @Output() fnClicked: Observable<MouseEvent | KeyboardEvent>;

    constructor(_clicked: FnClickedProvider) {
        this.fnClicked = _clicked.asObservable();
    }
}
