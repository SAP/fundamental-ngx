import { Injectable } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

import { OptionComponent } from './option/option.component';

@Injectable()
export class SelectSelectionModelService {
    _selectionModel: SelectionModel<OptionComponent>;

    /**
     * Returns true if select has any value selected
     */
    get empty(): boolean {
        return !this._selectionModel || this._selectionModel.isEmpty();
    }

    /**
    * Returns true if select has any value selected
    */
    clear(): void {
        this._selectionModel.clear();
    }

}
