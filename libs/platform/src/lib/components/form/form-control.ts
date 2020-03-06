import { Observable } from 'rxjs';
import { NgControl } from '@angular/forms';

export abstract class FormFieldControl<T> {

    /**
     * Each input control has always a value. Need to make sure we keep a convention for
     * input fields
     */
    value: T | null;

    /**
     * Need to have a way to set placeholder to the input
     */
    placeholder: string;


    /**
     * Sets id from FF to Input
     */
    id: string;


    editable: boolean;

    /**
     *
     * Form Field listen for all the changes happening inside the input
     */
    readonly stateChanges: Observable<void>;


    /**
     *  Each input should inject its own ngControl and we should retrieve it
     */
    readonly ngControl: NgControl | null;

    /** Whether the control is disabled. */
    readonly disabled: boolean;

    /**
     * Keeps track if the form element is in focus
     */
    readonly focused: boolean;

    /** Whether the control is in an error state. */
    readonly inErrorState: boolean;

    abstract onContainerClick(event: MouseEvent): void;

}


