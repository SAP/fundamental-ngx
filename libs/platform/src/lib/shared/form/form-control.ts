import { ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FormFieldControl } from '@fundamental-ngx/cdk/forms';
import { Observable } from 'rxjs';
import { PlatformFormField } from './form-field';

export type FdpFormFieldControl<T = any> = FormFieldControl<T>;

export abstract class PlatformFormFieldControl<T = any> implements FormFieldControl<T> {
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
     * Need to have a way to set Mandatory to the input field
     */
    required: boolean;

    /**
     * Sets id from FF to Input
     */
    id: string;

    /**
     * This should be coming from Parent.
     */
    editable: boolean;

    /**
     * The height of the extra content at the bottom of the form control,
     * which should not affect the alignment of form control and it's label
     */
    extraContentHeightPx?: number;

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

    /** Whether control has errors */
    readonly controlInvalid: boolean;

    /** Corresponding element reference. */
    readonly elementRef: ElementRef;

    /** Form field instance. */
    formField: Nullable<PlatformFormField>;

    /** Method for focusing on the element */
    abstract focus(event?: MouseEvent): void;

    /**
     * Handles even when we click on parent container which is the FormField Wrapping this
     * control
     */
    abstract onContainerClick(event: MouseEvent): void;
}
