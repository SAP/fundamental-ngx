import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation,
    AfterViewInit
} from '@angular/core';

import { FdpSelectionChangeEvent } from '../commons/base-select';


// Increasing integer for generating unique ids for radio components.
let nextUniqueId = 0;

/**
 * Used to represent an option of the select component.
 */
@Component({
    selector: 'fdp-option',
    template: `<fd-option
    [id]= "id"
    [value]="value"
    [disabled]="disabled"
    ><ng-content></ng-content></fd-option>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionComponent {
    /** Option id attribute */
    @Input()
    id = `fdp-option-${nextUniqueId++}`;

    /** Value of the option. Similar to how a native select operates. */
    @Input()
    value: any;

    /** Whether to disable this option specifically. */
    @Input()
    disabled = false;

    /**
     * Emits event when option is selected or deselected.
     */
    @Output()
    readonly selectionUpdatedChange = new EventEmitter<FdpSelectionChangeEvent>();

    /** @hidden */
    constructor(private _changeDetectorRef: ChangeDetectorRef) { }

    /** Selects the option.
     * * @hidden
     */
    _selectionChanged(item: FdpSelectionChangeEvent): void {
            this._changeDetectorRef.markForCheck();
            this.selectionUpdatedChange.emit(item);
    }

    
}
