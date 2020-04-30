import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { InlineHelpComponent } from '@fundamental-ngx/core';
import { FormFieldControl } from '../../form-control';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

export abstract class FormField {
    i18Strings: TemplateRef<any>;
    editable?: boolean;
    noLabelLayout?: boolean;
    labelLayout?: 'horizontal' | 'vertical';
    formControl?: FormControl;
}

export type FormZone = 'zTop' | 'zBottom' | 'zLeft' | 'zRight';
export type Column = 1 | 2 | 3 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * Form Field represent actual row and aggregates common behavior for the input field such as
 * error, label or hint.
 * Hint is also responsible for listening for FieldControl changes and trigger necessary
 * change detection
 *
 */
@Component({
    selector: 'fdp-form-field',
    templateUrl: 'form-field.component.html',
    styleUrls: ['./form-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent
    implements FormField, AfterContentInit, AfterContentChecked, AfterViewInit, OnDestroy, OnInit {
    @Input()
    label: string;

    @Input()
    id: string;

    @Input()
    zone: FormZone;

    @Input()
    hintPlacement: 'left' | 'right' = 'right';

    @Input()
    hint: string;

    @Input()
    labelLayout: 'horizontal' | 'vertical' = 'vertical';

    @Input()
    noLabelLayout: boolean = false;

    /**
     * By default form field does not render any content as it is wrapped inside ng-template and
     * controlled by parent. This is for cases where FormField is direct child of the form-group.
     *
     * In case we have more nested structure and Form-Field is wrapped with some other element
     * that controls the rendering we need to let go this rendering and render the content
     * directly
     */
    @Input()
    forceRender: boolean = false;

    @Input()
    validators: Array<ValidatorFn> = [Validators.nullValidator];

    @Input()
    rank: number;

    @Input()
    placeholder: string;

    @Input()
    fluid: boolean = false;
    /**
     * This is in most of the cases set from parent container (form-group)
     */
    @Input()
    i18Strings: TemplateRef<any>;

    /**
     * When used as standalone without form-group you can set FormGroup, otherwise it is set from
     * parent
     */
    @Input()
    get formGroup(): FormGroup {
        return this._formGroup;
    }

    set formGroup(value: FormGroup) {
        this._formGroup = value;
        this.initFormControl();
        this._cd.markForCheck();
    }

    @Input()
    get required(): boolean {
        return this._required;
    }

    set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
    }

    @Input()
    get editable(): boolean {
        return this._editable;
    }

    set editable(value: boolean) {
        const newVal = coerceBooleanProperty(value);
        if (this._editable !== newVal) {
            this._editable = value;
            this.updateControlProperties();
        }
    }

    /**
     * custom width in columns must be between 1 - 12
     */
    @Input()
    get columns(): Column {
        return this._columns;
    }

    set columns(value: Column) {
        this._columns = <Column>coerceNumberProperty(value);
    }

    @Output()
    onChange: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('renderer', { static: true })
    renderer: TemplateRef<any>;

    @ContentChild(InlineHelpComponent, { static: false })
    _hintChild: InlineHelpComponent;

    @ContentChild(FormFieldControl, { static: false })
    _control: FormFieldControl<any>;

    protected _columns: Column = 6;
    protected _editable: boolean = true;
    protected _formGroup: FormGroup;
    protected _required: boolean = false;

    formControl: FormControl;
    protected _destroyed = new Subject<void>();

    constructor(private _cd: ChangeDetectorRef) {
        this.formControl = new FormControl();
    }

    ngOnInit(): void {
        if (this.columns && (this.columns < 1 || this.columns > 12)) {
            throw new Error('[columns] accepts numbers between 1 - 12');
        }

        if (this.fluid) {
            this.columns = 12;
        }
    }

    ngAfterContentChecked(): void {
        // this.validateFieldControlComponent();
    }

    ngAfterContentInit(): void {
        // this.validateFieldControlComponent();

        if (this._control && this._control.stateChanges) {
            this._control.stateChanges.pipe(startWith(null)).subscribe((s) => {
                this.updateControlProperties();
                // need to call explicitly detectChanges() instead of markForCheck before the
                // modified validation state of the control passes over checked phase
                this.onChange.emit('stateChanges');
                this._cd.detectChanges();
            });
        }

        // Refresh UI when value changes
        if (this._control && this._control.ngControl && this._control.ngControl.valueChanges) {
            this._control.ngControl.valueChanges.pipe(takeUntil(this._destroyed)).subscribe((v) => {
                // this.onChange.emit('valueChangess');
                this._cd.markForCheck();
            });
        }

        if (this.required) {
            this.validators.push(Validators.required);
        }
        this._cd.markForCheck();
    }

    ngAfterViewInit(): void {
        this.validateErrorHandler();
        this.initFormControl();
        this.updateControlProperties();
        this._cd.detectChanges();
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    hasErrors(): boolean {
        return this._editable && this._control && this._control.status === 'error';
    }

    private validateFieldControlComponent() {
        if (!this._control) {
            throw new Error('fdp-form-field must contain component implemented FormFieldControl.');
        }

        if (this._control.ngControl && !this.id) {
            throw new Error('fdp-form-field must contain [id] binding.');
        }
    }

    private validateErrorHandler() {
        if (this._editable && this._control && this.hasValidators() && !this.i18Strings) {
            throw new Error('Validation strings are required for the any provided validations.');
        }
    }

    private hasValidators(): boolean {
        return this.validators && this.validators.length > 1;
    }

    private initFormControl() {
        if (this._control && this._control.ngControl && this._control.ngControl.control) {
            if (this.required) {
                this.validators.push(Validators.required);
            }

            this.formGroup.addControl(this.id, this._control.ngControl.control);
            this._control.ngControl.control.setValidators(Validators.compose(this.validators));
            this._control.ngControl.control.updateValueAndValidity();
        }
    }

    /**
     * Need to be able to set these properties on every level.
     *  - Global FormGroup Level as well each field
     *
     *  Todo: use more elegant way to set these properties.
     */
    private updateControlProperties() {
        if (this._control && this._editable) {
            this._control.id = this.id;
            this._control.placeholder = this.placeholder;
        }
    }
}
