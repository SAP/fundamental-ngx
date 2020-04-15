import { Component, Input, OnInit } from '@angular/core';
import { SelectComponent } from '../select.component';

@Component({
    selector: 'fd-select-mobile-option',
    templateUrl: './select-mobile-list.component.html'
})
export class SelectMobileListComponent implements OnInit {

    @Input()
    selectRef: SelectComponent;

    ngOnInit() {
        this._checkForDependencies();
    }

    private _checkForDependencies(): void {
        if (this.selectRef === undefined) {
            throw 'SelectMobileListComponent missing SelectComponent dependency.' +
            ' Use [selectRef] input to provide dependency';
        }
    }
}
