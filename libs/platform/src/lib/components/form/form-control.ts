import { Observable } from 'rxjs';
import { NgControl } from '@angular/forms';

export type ContentDensity = 'compact' | 'cozy';
export type Status = 'success' | 'error' | 'warning' | 'default' | 'information';

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

    /**
     * This should be coming from Parent.
     */
    editable: boolean;

    /**
     *  Components works in two sizes compact or cozy
     */
    contentDensity: ContentDensity;
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

    /**
     * Currently used only to identify if we are in error status
     */
    readonly status: Status;

    abstract focus(event?: MouseEvent): void;

    /**
     * Handles even when we click on parent container which is the FormField Wrapping this
     * control
     */
    abstract onContainerClick(event: MouseEvent): void;
}
