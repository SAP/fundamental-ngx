import { Input, ChangeDetectorRef, Optional, Self, OnInit, OnChanges, DoCheck, AfterViewInit, OnDestroy } from '@angular/core';
import { InputSize, FormFieldControl, Status } from '@fundamental-ngx/platform';
import { ControlValueAccessor, FormControl, NgControl, NgForm } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';

let randomId = 0;

export abstract class BaseComponent {

    protected defaultId: string = `fdp-id-${randomId++}`;
    protected _value: any;

    @Input()
    id: string = this.defaultId;

    @Input()
    name: string;

    @Input()
    size: InputSize = 'cozy';

    /**
     * See @FormFieldControl
     */
    _status: Status;

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


    /**
     * need to make  these value accessor as abstract to be implemented by subclasses. Having them
     * in superclass have issue getting reference to them with Object.getOwnPropertyDescripton
     * which we need to programmatically wraps components set/get value
     *
     */
    abstract get value(): any;

    abstract set value(value: any);

}
