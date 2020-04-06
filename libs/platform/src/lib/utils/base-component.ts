import { Input, ChangeDetectorRef, Optional, Self, OnInit, OnChanges, DoCheck, AfterViewInit, OnDestroy } from '@angular/core';
import { InputSize, FormFieldControl, Status } from '@fundamental-ngx/platform';
import { ControlValueAccessor, FormControl, NgControl, NgForm } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';

let randomId = 0;

export abstract class BaseComponent {

    protected defaultId: string = `fdp-id-${randomId++}`;
    protected _value: any;
    protected _editable: boolean = true;
    /**
     * See @FormFieldControl
     */
    readonly stateChanges: Subject<any> = new Subject<any>();

    @Input()
    id: string = this.defaultId;

    @Input()
    name: string;

    @Input()
    placeholder: string;

    @Input()
    size: InputSize = 'cozy';

    /**
     * See @FormFieldControl
     */
    _status: Status;

    /**
     * Tell  the component if we are in editing mode.
     *
     */
    @Input()
    get editable(): boolean {
        return this._editable;
    }

    /**
     * Firing CD, as we can keep switching between editable and non-editable mode
     *
     */
    set editable(value: boolean) {
        const newVal = coerceBooleanProperty(value);
        if (this._editable !== newVal) {
            this._editable = newVal;
            this._cd.markForCheck();
            this.stateChanges.next('editable');
        }
    }

    get status(): Status {
        return this._status;
    }

    constructor(protected _cd: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        if (!this.id || !this.name) {
            throw new Error('form input must have [id] and [name] attribute.');
        }
    }

}
