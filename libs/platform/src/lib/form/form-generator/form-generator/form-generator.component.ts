import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Input,
    isDevMode,
    OnChanges,
    OnDestroy,
    Output,
    QueryList,
    SimpleChanges,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { FormControlStatus, FormGroupDirective, NgForm } from '@angular/forms';
import { debounceTime, filter, startWith, switchMap, take, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import {
    ColumnLayout,
    FieldHintOptions,
    PlatformFormFieldControl,
    HintOptions,
    LabelLayout
} from '@fundamental-ngx/platform/shared';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FormGeneratorFieldComponent } from '../form-generator-field/form-generator-field.component';

import { FormGeneratorService } from '../form-generator.service';
import {
    BaseDynamicFormItemGuiOptions,
    DynamicFormItem,
    DynamicFormItemGuiOptions,
    DynamicFormItemValidationObject,
    DynamicFormValue
} from '../interfaces/dynamic-form-item';
import {
    DynamicFormControl,
    DynamicFormControlGroup,
    DynamicFormGroupControl,
    DynamicFormGroupControls
} from '../dynamic-form-control';
import { DynamicFormGroup } from '../interfaces/dynamic-form-group';
import {
    DefaultGapLayout,
    DefaultHorizontalFieldLayout,
    DefaultHorizontalLabelLayout,
    DefaultVerticalFieldLayout,
    DefaultVerticalLabelLayout
} from '../../form-group/constants';
import { FDP_FORM_GENERATOR_DEFAULT_HINT_OPTIONS } from '../form-generator.tokens';
import { defaultFormGeneratorHintOptions } from '../config/default-form-generator-hint-options';

let formUniqueId = 0;

export const FDP_FORM_IGNORED_STATUSES: FormControlStatus[] = ['INVALID', 'PENDING', 'DISABLED'];

export interface SubmitFormEventResult {
    /**
     * @description Indicator if validation has been passed.
     */
    success: boolean;
    /**
     * @description Formatted form value.
     */
    value: DynamicFormValue | null;
}

/**
 * @description Form Generator component represents a high-level component
 * which includes @see FormGroup inside.
 */
@Component({
    selector: 'fdp-form-generator',
    templateUrl: './form-generator.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormGeneratorComponent implements OnDestroy, OnChanges {
    /** @description Unique form name */
    @Input()
    formName = `fdp-form-generator-${formUniqueId++}`;

    /**
     * @description List of @see DynamicFormItem representing the list of items
     * to be rendered in the form.
     */
    @Input()
    set formItems(formItems: DynamicFormItem[]) {
        if (!formItems) {
            return;
        }

        this._formItems = formItems.map((item, index) => ({ ...item, rank: item.rank || index }));
        this._generateForm();
    }
    get formItems(): DynamicFormItem[] {
        return this._formItems;
    }

    /**
     * @description Form main title.
     */
    @Input()
    mainTitle: Nullable<string>;

    /**
     * Whether to hide main title. Default is false.
     */
    @Input()
    hideMainTItle = false;

    /**
     * @description
     * Hint for the main title
     */
    @Input()
    hint: string | HintOptions;

    /**
     * @description Specify the column layout in the format `XLn-Ln-Mn-Sn`
     * where n is the number of columns and can be different for each size.
     * eg: XL2-L2-M2-S1 would create 2-column layouts for XL, L,
     * and M sizes and single-column layout for S size.
     */
    @Input()
    columnLayout: Nullable<string>;

    /**
     * @deprecated
     * Use labelColumnLayout, fieldColumnLayout and gapColumnLayout properties.
     *
     * Defines form field label placement.
     */
    @Input()
    set labelLayout(value: LabelLayout) {
        if (isDevMode()) {
            console.warn(
                'LabelLayout input property is deprecated. Please use labelColumnLayout, fieldColumnLayout and gapColumnLayout properties instead'
            );
        }
        this._labelLayout = value;

        this.labelColumnLayout =
            this._labelLayout === 'horizontal' ? DefaultHorizontalLabelLayout : DefaultVerticalLabelLayout;
        this.fieldColumnLayout =
            this._labelLayout === 'horizontal' ? DefaultHorizontalFieldLayout : DefaultVerticalFieldLayout;
    }
    get labelLayout(): LabelLayout {
        return this._labelLayout;
    }

    /**
     * Defines label's column layout.
     */
    @Input()
    labelColumnLayout: ColumnLayout = DefaultVerticalLabelLayout;

    /**
     * Defines field's column layout.
     */
    @Input()
    fieldColumnLayout: ColumnLayout = DefaultVerticalFieldLayout;

    /**
     * Defines gap column layout.
     */
    @Input()
    gapColumnLayout: ColumnLayout = DefaultGapLayout;

    /** Whether all form items should have identical layout provided for form group. */
    @Input()
    unifiedLayout = true;

    /** Inline column layout */
    @Input()
    inlineColumnLayout: ColumnLayout = DefaultVerticalFieldLayout;

    /**
     * @hidden
     * Removes extra empty row.
     * TODO: remove after #7533 has been fixed.
     */
    @Input()
    noAdditionalContent = false;

    /**
     * @description Event which notifies parent component that the form has been successfully created
     * and all controls are in place.
     */
    @Output()
    formCreated = new EventEmitter<DynamicFormGroup>();

    /**
     * @description Event which notifies parent component that the form has been successfully validated
     * and submitted. Contains form
     */
    @Output()
    formSubmitted = new EventEmitter<DynamicFormValue>();

    /**
     * @description Event which notifies parent component that the form was submitted.
     */
    @Output()
    formSubmittedStatus = new EventEmitter<SubmitFormEventResult>();

    /**
     * @description Represents the form instance. @see NgForm
     */
    @ViewChild(NgForm)
    ngForm: NgForm;

    /** Inner form group directive. */
    @ViewChild(FormGroupDirective)
    formGroup: FormGroupDirective;

    /** Inner form fields */
    @ViewChildren(FormGeneratorFieldComponent)
    fields: QueryList<FormGeneratorFieldComponent>;

    /** Array of form field controls. */
    get formFields(): PlatformFormFieldControl[] {
        return this.fields
            ?.toArray()
            .filter((field) => !!field.fieldRenderer?.control)
            .map((field) => field.fieldRenderer.control!);
    }

    /**
     * @description Dynamically generated form. @see FormGeneratorService
     */
    form: DynamicFormGroup;
    /**
     * @description List of the form controls.
     */
    formControlItems: DynamicFormGroupControl[];

    /**
     * Set of flags representing if particular form item should be visible to the user.
     */
    shouldShowFields: { [key: string]: boolean } = {};

    /**
     * Flag representing that form is loading
     */
    formLoading = true;

    /**
     * Stream of form loading state.
     */
    loading$ = new BehaviorSubject<boolean>(this.formLoading);

    /**
     * Stream of last form submission status.
     */
    formSubmittedStatus$ = new Subject<SubmitFormEventResult>();

    /**
     * Stream of last form submission value.
     */
    formValue$ = new BehaviorSubject<DynamicFormValue>({});

    /** @hidden
     * To differentiate between first loading when skeletons be shown and subsequent loadings when busy indicator be shown
     */
    _firstLoadingDone = false;

    /**
     * @hidden
     */
    hintOptions: HintOptions;

    /** @hidden */
    _errorModels: { type: string; value: any }[] = [];

    /**
     * @hidden
     */
    private _formItems: DynamicFormItem[];

    /**
     * @hidden
     */
    private _formValueSubscription: Subscription;

    /**
     * @hidden
     * An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)
     */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    private _labelLayout: LabelLayout;

    /** @hidden */
    private readonly _defaultHintOptions: FieldHintOptions;

    /** @hidden */
    private _ngSubmitSubscription: Subscription | undefined;

    /** @hidden */
    constructor(
        private _fgService: FormGeneratorService,
        private _cd: ChangeDetectorRef,
        @Inject(FDP_FORM_GENERATOR_DEFAULT_HINT_OPTIONS) _providedHintOptions: FieldHintOptions
    ) {
        this._defaultHintOptions = {
            ...defaultFormGeneratorHintOptions,
            ..._providedHintOptions
        };

        this._errorModels = this._getErrors();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hint) {
            if (typeof this.hint === 'string') {
                this.hintOptions = {
                    ...this._defaultHintOptions,
                    text: this.hint
                };
            } else {
                this.hintOptions = {
                    ...this._defaultHintOptions,
                    ...this.hint
                };
            }
        }
    }

    /**
     * @hidden
     */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
        this._ngSubmitSubscription?.unsubscribe();
    }

    /**
     * Refreshes form items visibility with 'when' condition.
     */
    async refreshStepsVisibility(): Promise<void> {
        this.shouldShowFields = await this._fgService.checkVisibleFormItems(this.form);
        this._cd.markForCheck();
    }

    /**
     * @hidden
     */
    async _onSubmit(): Promise<void> {
        this.form.markAllAsTouched();
        this._cd.detectChanges();

        const formValue = await this._fgService.getFormValue(this.form);

        this.formSubmittedStatus.emit({ success: !this.form.invalid, value: formValue });
        this.formSubmittedStatus$.next({ success: !this.form.invalid, value: formValue });

        if (this.form.invalid) {
            return;
        }
        this.formSubmitted.emit(formValue);
        this.formValue$.next(formValue);

        this.form.markAsPristine();
    }

    /**
     * @hidden
     */
    private async _generateForm(): Promise<void> {
        this.formLoading = true;
        this.loading$.next(this.formLoading);

        const form = await this._fgService.generateForm(this.formName, this.formItems);

        this._formValueSubscription?.unsubscribe();

        this.form = form;

        this.formControlItems = this._getOrderedControls(form.controls);

        this.shouldShowFields = await this._fgService.checkVisibleFormItems(this.form);

        this._formValueSubscription = this.form.valueChanges
            .pipe(debounceTime(50), takeUntil(this._onDestroy$))
            .subscribe(async () => {
                this.shouldShowFields = await this._fgService.checkVisibleFormItems(this.form);
                this._cd.markForCheck();
            });

        this.formLoading = false;
        this._firstLoadingDone = true;

        this._cd.detectChanges();

        this.formCreated.emit(this.form);
        this.loading$.next(this.formLoading);

        if (!this.formGroup) {
            return;
        }

        this._listenToSubmit();
    }

    /**
     *
     * @hidden
     */
    _trackFn(index: number, value: DynamicFormGroupControl): string {
        return `${index}_${value.formItem.name}`;
    }

    /**
     *
     * @description Programmatically submit form.
     * This method also calls validation for the form items.
     */
    submit(): void {
        this.formGroup.onSubmit(new Event('submit'));
    }

    /** @hidden */
    private _getOrderedControls(controls: DynamicFormGroupControls): (DynamicFormControl | DynamicFormControlGroup)[] {
        return Object.values(controls).sort(
            (a, b) => (a.formItem?.rank ?? -Infinity) - (b.formItem?.rank ?? -Infinity)
        );
    }

    /**
     * @description
     * Used for extracting hintOptions from GuiOptions. This will coerce string | HintOptions to FieldHintOptions,
     * will combine default value of hints for form generator with provided options.
     * @param guiOptions
     */
    getHintOptions(
        guiOptions?: BaseDynamicFormItemGuiOptions | DynamicFormItemGuiOptions
    ): FieldHintOptions | undefined {
        if (!guiOptions?.hint) {
            return;
        }
        const formItemHintOptions: string | HintOptions | FieldHintOptions = guiOptions.hint;
        const placement = guiOptions.hintPlacement || this._defaultHintOptions.placement;
        if (typeof formItemHintOptions === 'string') {
            return {
                ...this._defaultHintOptions,
                placement,
                text: formItemHintOptions
            };
        }
        return {
            ...this._defaultHintOptions,
            placement,
            ...formItemHintOptions
        };
    }

    /** @hidden */
    _isAdvancedError(error: any): error is DynamicFormItemValidationObject {
        return error.heading && error.description && error.type;
    }

    /** @hidden */
    private _getErrors(): { type: string; value: any }[] {
        const returnErrors: { type: string; value: any }[] = [];
        const registeredErrors = this._fgService.validationErrorHints;
        Object.entries(registeredErrors).forEach((type) => {
            const [errorType, errorValue] = type;

            returnErrors.push({
                type: errorType,
                value: errorValue
            });
        });

        return returnErrors;
    }

    /** @hidden */
    private _listenToSubmit(): void {
        this._ngSubmitSubscription?.unsubscribe();
        this._ngSubmitSubscription = this.formGroup.ngSubmit
            .pipe(
                switchMap(() =>
                    this.formGroup.statusChanges!.pipe(
                        startWith(this.formGroup.status),
                        filter((status: FormControlStatus) => status !== 'PENDING'),
                        take(1),
                        // filter((status) => status !== 'INVALID'),
                        takeUntil(this._onDestroy$)
                    )
                )
            )
            .subscribe(async () => {
                await this._onSubmit();
                this._listenToSubmit();
            });
    }
}
