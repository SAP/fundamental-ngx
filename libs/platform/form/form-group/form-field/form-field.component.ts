import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    DestroyRef,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    Provider,
    QueryList,
    Self,
    Signal,
    SimpleChanges,
    SkipSelf,
    TemplateRef,
    ViewChild,
    ViewChildren,
    booleanAttribute,
    forwardRef,
    inject
} from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { FD_FORM_FIELD, FormFieldControl, FormStates } from '@fundamental-ngx/cdk/forms';
import { uniqBy } from 'lodash-es';
import { BehaviorSubject, Observable, Subject, Subscription, combineLatest, filter, tap } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FormItemComponent, FormLabelComponent, FormMessageComponent } from '@fundamental-ngx/core/form';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { InlineHelpDirective } from '@fundamental-ngx/core/inline-help';
import { LinkComponent } from '@fundamental-ngx/core/link';
import {
    Column,
    ColumnLayout,
    FieldHintInput,
    FieldHintOptions,
    FormError,
    FormFieldErrorDirectiveContext,
    FormFieldGroup,
    FormGroupContainer,
    HintContent,
    PlatformFormField,
    PlatformFormFieldControl,
    RESPONSIVE_BREAKPOINTS_CONFIG,
    ResponsiveBreakPointConfig,
    ResponsiveBreakpointsService
} from '@fundamental-ngx/platform/shared';
import { getFormState } from '../../helpers';
import { InputMessageGroupWithTemplate } from '../../input-message-group-with-template/input-message-group-with-template.component';
import { defaultFormFieldHintOptions } from '../config/default-form-field-hint-options';
import { FORM_GROUP_CHILD_FIELD_TOKEN } from '../constants';
import {
    FDP_FORM_FIELD_HINT_LAYOUT_CONFIG,
    FDP_FORM_FIELD_HINT_OPTIONS_DEFAULT,
    HintLayoutConfig
} from '../fdp-form.tokens';
import { FormFieldErrorDirective } from '../form-field-error/form-field-error.directive';
import { FormFieldControlExtrasComponent } from '../form-field-extras/form-field-extras.component';
import { generateColumnClass, normalizeColumnLayout } from '../helpers';
import { FormFieldLayoutService } from '../services/form-field-layout.service';

let defaultId = 0;

const formFieldProvider: Provider = {
    provide: FD_FORM_FIELD,
    useExisting: forwardRef(() => FormFieldComponent)
};

const formGroupChildProvider: Provider = {
    provide: FORM_GROUP_CHILD_FIELD_TOKEN,
    useExisting: forwardRef(() => FormFieldComponent)
};

function columnTransformer(v: Column | `${Column}`): Column {
    return parseInt(v + '', 10) as Column;
}

function rankTransformer(v: string | number): number {
    return parseInt(v + '', 10);
}

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
    styleUrl: './form-field.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [formFieldProvider, formGroupChildProvider, FormFieldLayoutService],
    imports: [
        CommonModule,
        FormItemComponent,
        NgTemplateOutlet,
        InputMessageGroupWithTemplate,
        FormMessageComponent,
        FormLabelComponent,
        LinkComponent,
        IconComponent,
        InlineHelpDirective
    ]
})
export class FormFieldComponent
    implements PlatformFormField, AfterContentInit, AfterViewInit, OnDestroy, OnInit, OnChanges
{
    /** Form field label */
    @Input()
    label: string;

    /**
     * Suffix for ids of control elements inside this form field
     */
    @Input()
    id: string = (++defaultId).toString();

    /** Hint to be placed next to label */
    @Input()
    hint: Nullable<FieldHintInput>;

    /**
     * Indicates when form field label should not be displayed
     */
    @Input()
    noLabelLayout = false;

    /**
     * The list of validators applied to the form field.
     */
    @Input()
    validators: Array<ValidatorFn> = [Validators.nullValidator];

    /**
     * Rank is used for ordering.
     * First lower number, then - higher
     */
    @Input({ transform: rankTransformer })
    rank: number;

    /**
     * Placeholder for the field
     */
    @Input()
    placeholder: string;

    /** Form Container column it belongs to */
    @Input()
    column: number;

    /** object for placing field in column in each screen layout */
    @Input()
    set columnLayout(layout: ColumnLayout | undefined) {
        if (!layout) {
            return;
        }
        this._columnLayout = layout;
        this._isColumnLayoutEnabled = true;
        this._setLayout();
    }

    get columnLayout(): ColumnLayout {
        return this._columnLayout;
    }

    /**
     * Defines label's column layout.
     */
    @Input()
    set labelColumnLayout(value: ColumnLayout | undefined) {
        if (!value) {
            return;
        }
        this._labelColumnLayout = normalizeColumnLayout(value);
        this._labelColumnLayoutClass = generateColumnClass(this._labelColumnLayout);
        this._labelColumnLayout$.next(this._labelColumnLayout);
    }

    get labelColumnLayout(): ColumnLayout {
        return this._labelColumnLayout;
    }

    /**
     * Defines field's column layout.
     */
    @Input()
    set fieldColumnLayout(value: ColumnLayout | undefined) {
        if (!value) {
            return;
        }

        this._fieldColumnLayout = normalizeColumnLayout(value);
        this._fieldColumnLayoutClass = generateColumnClass(this._fieldColumnLayout);
        this._fieldColumnLayout$.next(this._fieldColumnLayout);
    }

    get fieldColumnLayout(): ColumnLayout {
        return this._fieldColumnLayout;
    }

    /**
     * Defines gap column layout.
     */
    @Input()
    set gapColumnLayout(value: ColumnLayout | undefined) {
        if (!value) {
            return;
        }

        this._gapColumnLayout = normalizeColumnLayout(value);
        this._gapColumnLayoutClass = generateColumnClass(this._gapColumnLayout);
        this._gapColumnLayout$.next(this._gapColumnLayout);
    }

    get gapColumnLayout(): ColumnLayout {
        return this._gapColumnLayout;
    }

    /**
     * Translations template reference.
     * This is in most of the cases set from parent container (form-group)
     */
    @Input()
    i18Strings: TemplateRef<any>;

    /** Set when form field is a mandatory one. */
    @Input({ transform: booleanAttribute })
    required = false;

    /**
     * Indicates if field is editable
     */
    @Input({ transform: booleanAttribute })
    set editable(value: boolean) {
        if (this._editable === value) {
            return;
        }
        this._editable = value;
        this._updateControlProperties();
    }

    get editable(): boolean {
        return this._editable;
    }

    /**
     * Form field custom width in columns must be between 1 - 12
     */
    @Input({ transform: columnTransformer })
    columns: Column = 6;

    /**
     * marks field as disabled. used in reactive form approach.
     */
    @Input()
    disabled = false;

    /** Whether label text should be appended with colon. */
    @Input()
    colon = false;

    /**
     * Form Group Container to bind the Form-Field to.
     * This will override default value injected by constructor
     */
    @Input()
    formGroupContainer: FormGroupContainer;

    /** Emits whenever formFieldControl's state changes */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    onChange: EventEmitter<string> = new EventEmitter<string>();

    /** Emits whenever column layout is changed */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    onColumnChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * @hidden
     * Form field template reference
     */
    @ViewChild('renderer', { static: true })
    renderer: TemplateRef<any>;

    /** @hidden */
    @ContentChild(FormFieldControlExtrasComponent, { read: ElementRef })
    formFieldExtras?: ElementRef<HTMLElement>;

    /** @hidden */
    @ViewChild('labelCol') labelCol?: ElementRef<HTMLDivElement>;

    /** @hidden */
    @ViewChild(InputMessageGroupWithTemplate, { read: ElementRef })
    inputMessageGroup: ElementRef<HTMLElement>;

    /** @hidden */
    @ViewChild('innerErrorRenderers')
    innerErrorRenderers: TemplateRef<any>;

    /** @hidden */
    @ContentChildren(FormFieldErrorDirective)
    private _errorDirectiveQuery: QueryList<FormError>;

    /** @hidden */
    @ViewChildren(InputMessageGroupWithTemplate)
    private readonly _inputMessageGroupCmp: QueryList<InputMessageGroupWithTemplate>;

    /** Combined Error directives from field itself and parent form container. */
    get errorDirectives(): FormError[] {
        return uniqBy([...this._errorDirectives, ...this._formGroupErrorDirectives], 'error');
    }

    /** @hidden */
    isHorizontal$: Signal<boolean | undefined>;

    /**
     * Child FormFieldControl
     */
    control: PlatformFormFieldControl | null;

    /** @hidden */
    _labelColumnLayoutClass: string;

    /** @hidden */
    _fieldColumnLayoutClass: string;

    /** @hidden */
    _gapColumnLayoutClass: string;

    /**
     * hint and hint placement coerced to the FieldHintOptions
     */
    hintOptions: FieldHintOptions = defaultFormFieldHintOptions as unknown as FieldHintOptions;

    /** @hidden */
    _errorDirectives: FormError[] = [];

    /** Grouped errors. */
    groupedErrors: FormFieldErrorDirectiveContext[] = [];

    /** Event emited when errors object being changed. */
    errorsChange$ = new Subject<void>();

    /**
     * @hidden
     * Optional FormControl
     */
    formControl: FormControl;

    /** @hidden */
    get _groupHost(): FormGroupContainer | FormFieldGroup {
        return this.formFieldGroup ? this.formFieldGroup : this.formGroupContainer;
    }

    /**
     * Will be updated during onChanges and resize, resulting correct placement of the
     * hint respecting passed configs and given breakpoint of screen.
     */
    hintTarget?: string;

    /** @hidden */
    protected _editable = true;

    /** @hidden */
    private _isColumnLayoutEnabled = false;

    /** @hidden column number for different screen sizes */
    private _xlColumnNumber: number;

    /** @hidden */
    private _lgColumnNumber: number;

    /** @hidden */
    private _mdColumnNumber: number;

    /** @hidden */
    private _sColumnNumber = 1;

    /** @hidden */
    private _columnLayout: ColumnLayout;

    /** @hidden */
    private readonly _responsiveBreakPointConfig: ResponsiveBreakPointConfig;

    /** @hidden */
    private _labelColumnLayout: ColumnLayout;

    /** @hidden */
    private _fieldColumnLayout: ColumnLayout;
    /** @hidden */
    private _gapColumnLayout: ColumnLayout;

    /** @hidden */
    private _formGroupErrorDirectives: FormError[] = [];

    /** @hidden */
    private _formGroupErrorDirectivesSubscription: Subscription;

    /** @hidden */
    private _errorDirectivesCdr: Subscription;

    /** @hidden whether label and control are vertically aligned */
    private get _isHorizontalAlignment(): boolean {
        if (!this.inputMessageGroup || !this.labelCol) {
            return false;
        }
        const inputMessageGroupY = this.inputMessageGroup.nativeElement.getBoundingClientRect().y;
        const labelColRect = this.labelCol.nativeElement.getBoundingClientRect();
        const labelColBottomY = labelColRect.y + labelColRect.height;
        return labelColBottomY > inputMessageGroupY;
    }

    /**
     * @hidden
     * Sum of extra heights inside form control and formFieldExtras.
     * Label will be shifted by this number in order to be properly aligned with the control
     */
    get _controlExtrasHeightPx(): number | null {
        if (this.noLabelLayout || !this._isHorizontalAlignment) {
            // proceed only if 1. there's a label; 2. control has vertical alignment
            return null;
        }
        return (
            (this.formFieldExtras?.nativeElement.offsetHeight ?? 0) + (this.control?.extraContentHeightPx ?? 0) || null
        );
    }

    /** @hidden */
    private _labelColumnLayout$: BehaviorSubject<ColumnLayout>;
    /** @hidden */
    private _fieldColumnLayout$: BehaviorSubject<ColumnLayout>;
    /** @hidden */
    private _gapColumnLayout$: BehaviorSubject<ColumnLayout>;
    /** @hidden */
    private _needsInlineHelpPlaceSubscription?: Subscription;

    /** @hidden */
    private _breakPointObserver: Observable<any>;

    /** @hidden */
    private _formFieldLayoutService: FormFieldLayoutService;
    /** @hidden */
    private readonly _defaultHintOptions: FieldHintOptions;

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    constructor(
        private _cd: ChangeDetectorRef,
        @Optional() formGroupContainer: FormGroupContainer,
        @Optional() readonly formFieldGroup: FormFieldGroup,
        @Optional()
        @Inject(RESPONSIVE_BREAKPOINTS_CONFIG)
        readonly _defaultResponsiveBreakPointConfig: ResponsiveBreakPointConfig,
        readonly _responsiveBreakpointsService: ResponsiveBreakpointsService,
        @Inject(FDP_FORM_FIELD_HINT_OPTIONS_DEFAULT) _providedHintOptions: FieldHintOptions,
        @Inject(FDP_FORM_FIELD_HINT_LAYOUT_CONFIG) private _hintLayoutConfig: HintLayoutConfig,
        @Self() _selfFormFieldLayoutService: FormFieldLayoutService,
        @Optional() @SkipSelf() _parentFormFieldLayoutService: FormFieldLayoutService
    ) {
        this._defaultHintOptions = {
            ...defaultFormFieldHintOptions,
            ..._providedHintOptions
        };
        this._formFieldLayoutService = _parentFormFieldLayoutService || _selfFormFieldLayoutService;
        this._labelColumnLayout$ = new BehaviorSubject(this._labelColumnLayout);
        this._fieldColumnLayout$ = new BehaviorSubject(this._fieldColumnLayout);
        this._gapColumnLayout$ = new BehaviorSubject(this._gapColumnLayout);
        // formGroupContainer can be injected only if current form-field is located
        // insight formGroupContainer content.
        // If this is not the case the formGroupContainer
        // will be undefined (known angular issue),
        // in such case formGroupContainer can be pointed explicitly using
        // component input annotation
        this.formGroupContainer = formGroupContainer;
        this._responsiveBreakPointConfig = _defaultResponsiveBreakPointConfig || new ResponsiveBreakPointConfig();
        this._breakPointObserver = this._responsiveBreakpointsService.observeBreakpointByConfig(
            this._responsiveBreakPointConfig
        );

        this.isHorizontal$ = toSignal(
            combineLatest([
                this._labelColumnLayout$.pipe(filter(Boolean), map(normalizeColumnLayout)),
                this._fieldColumnLayout$.pipe(filter(Boolean), map(normalizeColumnLayout)),
                this._gapColumnLayout$.pipe(map((g) => normalizeColumnLayout(g || { S: 0 })))
            ]).pipe(
                switchMap(([label, field, gap]) =>
                    this._breakPointObserver.pipe(
                        map(
                            (breakpointName) =>
                                label[breakpointName] + field[breakpointName] + gap[breakpointName] <= 12
                        )
                    )
                )
            )
        );
    }

    /**
     * Sets initial values for label, field and gap columns
     */
    setDefaultColumnLayout(): void {
        // If layout already defined, no need to set default one.
        if (this.labelColumnLayout) {
            return;
        }
        this.listenToInlineHelpPlaceRequirementChanges(() => (this.labelColumnLayout ? this : this._groupHost));
    }

    /** @hidden */
    listenToInlineHelpPlaceRequirementChanges(getSource: () => any): void {
        if (this._needsInlineHelpPlaceSubscription) {
            this._needsInlineHelpPlaceSubscription.unsubscribe();
            this._needsInlineHelpPlaceSubscription = void 0;
        }
        const setLayouts = (source: any): void => {
            this.labelColumnLayout = source.labelColumnLayout;
            this.fieldColumnLayout = source.fieldColumnLayout;
            this.gapColumnLayout = source.gapColumnLayout;
        };
        this._needsInlineHelpPlaceSubscription = this._formFieldLayoutService.needsInlineHelpPlace
            .pipe(
                map(() => this._formFieldLayoutService.getFixedLayouts(getSource())),
                tap(setLayouts),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe();
    }

    /** @hidden */
    ngOnInit(): void {
        // provides capability to make a field disabled. useful in reactive form approach.
        this.formControl =
            (this.formGroupContainer?.formGroup?.get(this.id) as FormControl) ??
            new FormControl({ value: null, disabled: this.disabled });

        if (this.columns && (this.columns < 1 || this.columns > 12)) {
            throw new Error('[columns] accepts numbers between 1 - 12');
        }

        if (this._isColumnLayoutEnabled) {
            this._breakPointObserver
                .pipe(takeUntilDestroyed(this._destroyRef))
                .subscribe((breakPointName) => this._updateLayout(breakPointName));
        }

        this._addToFormGroup();

        this.listenToInlineHelpPlaceRequirementChanges(() => this);
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hint) {
            this._updateHintOptions();
            this._formFieldLayoutService.setNeedsInlineHelp(
                this,
                (this.hintOptions.target === 'input' || this.hintOptions.target === 'auto') && !!this.hint
            );
        }
        if (changes.hint && changes.hint.firstChange) {
            this._breakPointObserver
                .pipe(
                    tap((sizeName) => {
                        if (this.hintOptions.target === 'auto') {
                            this.hintTarget = this._hintLayoutConfig.hintOnInputBreakpoints.includes(sizeName)
                                ? 'input'
                                : 'label';
                        } else {
                            this.hintTarget = this.hintOptions.target;
                        }
                    }),
                    takeUntilDestroyed(this._destroyRef)
                )
                .subscribe();
        }
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._cd.markForCheck();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._assignErrorDirectives();

        this._errorDirectiveQuery.changes.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._assignErrorDirectives();
        });
        this._updateControlProperties();
        this._validateErrorHandler();
        this._listenToFormMessage();
        this._cd.detectChanges();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._formFieldLayoutService.removeEntry(this);
        this._removeFromFormGroup();
        this._errorDirectivesCdr?.unsubscribe();
        this._formGroupErrorDirectivesSubscription?.unsubscribe();
    }

    /** @hidden */
    hasErrors(): boolean {
        return this._editable && !!this.control?.controlInvalid;
    }

    /**
     * Register underlying form control
     * @param formFieldControl
     */
    registerFormFieldControl(formFieldControl: FormFieldControl): void {
        if (this.control) {
            throw Error('Form field can contain only one FormFieldControl');
        }

        this.control = formFieldControl as PlatformFormFieldControl;

        formFieldControl.stateChanges.pipe(startWith(null), takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._updateControlProperties();
            // need to call explicitly detectChanges() instead of markForCheck before the
            // modified validation state of the control passes over checked phase
            this.onChange.emit('stateChanges');
            this.groupErrors();
            this._cd.detectChanges();
        });

        // Refresh UI when value changes
        if (formFieldControl?.ngControl?.valueChanges) {
            formFieldControl.ngControl.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
                this.onChange.emit('valueChanges');
                this.groupErrors();
                this._cd.markForCheck();
            });
        }

        if (formFieldControl?.ngControl?.control) {
            const control = formFieldControl.ngControl.control;

            const hasRequiredValidator =
                this.validators.includes(Validators.required) || this.validators.includes(Validators.requiredTrue);

            if (this.required && !hasRequiredValidator) {
                this.validators.push(Validators.required);
            }

            if (hasRequiredValidator) {
                this.required = true;
            }

            // if form control is disabled, in reactive form approach
            if (this.disabled) {
                control.disable();
            }

            /**
             * There is a case when a "form-group" initial state is VALID,
             * and on the next loop a child form-filed extends it and make
             * the form-group INVALID.
             * In such case we get the error
             * "ExpressionChangedAfterItHasBeenCheckedError. Previous value is ng-valid, current value is ng-invalid".
             * To fix it we have to postpone adding form-field validators
             *
             */
            Promise.resolve().then(() => {
                control.setValidators(Validators.compose(this.validators));
                control.updateValueAndValidity({ emitEvent: false });
            });

            this._addControlToFormGroup(formFieldControl?.ngControl?.control);
        }

        this._cd.markForCheck();
    }

    /**
     * Unregister underlying form control
     * @param formFieldControl
     */
    unregisterFormFieldControl(formFieldControl: FormFieldControl): void {
        if (formFieldControl !== this.control) {
            return;
        }

        this.control = null;

        this._removeControlFromFormGroup();
    }

    /**
     * Groups
     */
    groupErrors(): void {
        // Queue task because firing it right away may cause error with showing empty message.
        setTimeout(() => {
            this.groupedErrors = [];
            const errors = this.control?.ngControl?.errors;
            if (!errors) {
                return [];
            }

            this.errorDirectives.forEach((directive) => {
                if (!errors[directive.error]) {
                    return;
                }

                this.groupedErrors.push({
                    directive,
                    error: errors[directive.error]
                });
            });
            this.errorsChange$.next();
            this._cd.markForCheck();
        });
    }

    /**
     * Gets prioritized control state based on the error types it has.
     */
    getPriorityState(): FormStates {
        if (this.groupedErrors.length === 0) {
            return this.hasErrors() ? 'error' : 'default';
        }

        return getFormState(this.groupedErrors.map((error) => error.directive.type));
    }

    /**
     * Sets error directives.
     */
    setErrorDirectives(directives: QueryList<FormError>): void {
        this._formGroupErrorDirectivesSubscription?.unsubscribe();

        if (!directives) {
            return;
        }

        this._formGroupErrorDirectives = directives.toArray();

        this._formGroupErrorDirectivesSubscription = directives.changes
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => {
                this._formGroupErrorDirectives = directives.toArray();
            });
    }

    /**
     * Returns whether content of the provided hint is a string.
     * @hidden
     */
    isStringHint(hintOptions: HintContent): hintOptions is string {
        return typeof hintOptions === 'string';
    }

    /** @hidden */
    _getLabelledBy(): string {
        let retVal = 'fdp-form-label-' + this.id;
        if (this.hasErrors() && this.groupedErrors.length > 0) {
            retVal = retVal + ' fdp-form-message-grouped-errors-' + this.id;
        }
        if (this.groupedErrors.length === 0 && this.hasErrors() && this.i18Strings) {
            retVal = retVal + ' fdp-form-message-error-' + this.id;
        }

        return retVal;
    }

    /**
     * @hidden
     * Listens to form message component changes and passes its instance to the form control component.
     */
    private _listenToFormMessage(): void {
        this._inputMessageGroupCmp.changes
            .pipe(
                startWith(null),
                map(() => this._inputMessageGroupCmp.first),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe((component) => {
                if (!this.control) {
                    return;
                }
                this.control!.formMessage = component;
            });
    }

    /** @hidden */
    private _validateErrorHandler(): void {
        if (
            this._editable &&
            this.control &&
            this._hasValidators() &&
            !this.i18Strings &&
            this.errorDirectives.length === 0
        ) {
            throw new Error('Validation strings are required for the any provided validations.');
        }
    }

    /** @hidden */
    private _hasValidators(): boolean {
        return this.validators && this.validators.length > 1;
    }

    /**
     * @hidden
     * Add FormField to FormGroup
     */
    private _addToFormGroup(): void {
        if (!this.formGroupContainer || this.formFieldGroup) {
            return;
        }

        this.formGroupContainer.addFormField(this);
    }

    /**
     * @hidden
     * Remove FormField from FormGroup
     */
    private _removeFromFormGroup(): void {
        if (!this.formGroupContainer) {
            return;
        }
        this.formGroupContainer.removeFormField(this);
    }

    /**
     * @hidden
     * Add FormControl from FormGroup
     */
    private _addControlToFormGroup(control: AbstractControl): void {
        if (!this.formGroupContainer || !!this.formFieldGroup?.formName) {
            return;
        }
        this.formGroupContainer.addFormControl(this.id, control);
    }

    /**
     * @hidden
     * Remove FormControl from FormGroup
     */
    private _removeControlFromFormGroup(): void {
        if (!this.formGroupContainer) {
            return;
        }
        this.formGroupContainer.removeFormControl(this.id);
    }

    /**
     * @hidden
     * Need to be able to set these properties on every level.
     *  - Global FormGroup Level as well each field
     *
     *  Todo: use more elegant way to set these properties.
     */
    private _updateControlProperties(): void {
        if (this.control && this._editable) {
            this.control.id = this.id;
            this.control.required = this.required;

            if (this.placeholder) {
                this.control.placeholder = this.placeholder;
            }
        }
    }

    /** @hidden */
    private _setLayout(): void {
        try {
            const normalized = normalizeColumnLayout(this.columnLayout, 1);
            this.columnLayout = normalized;
            this._sColumnNumber = normalized['S'];
            this._mdColumnNumber = normalized['M'];
            this._lgColumnNumber = normalized['L'];
            this._xlColumnNumber = normalized['XL'];
        } catch {
            this._isColumnLayoutEnabled = false;
        }
    }

    /** @hidden */
    private _updateLayout(currentBreakingPointName: string): void {
        if (this._isColumnLayoutEnabled) {
            switch (currentBreakingPointName) {
                case 'S':
                    this.column = this._sColumnNumber;
                    break;
                case 'M':
                    this.column = this._mdColumnNumber;
                    break;
                case 'L':
                    this.column = this._lgColumnNumber;
                    break;
                case 'XL':
                    this.column = this._xlColumnNumber;
                    break;
                default:
                    this.column = this._xlColumnNumber;
            }
        }

        // emit column change, so form-group knows it and re-arranges the fields
        this.onColumnChange.emit(true);
    }

    /** @hidden */
    private _updateHintOptions(): void {
        // placement is here set up because hintPlacement is deprecated
        if (typeof this.hint === 'string' || this.hint instanceof TemplateRef) {
            this.hintOptions = {
                ...this._defaultHintOptions,
                content: this.hint
            };
        } else if (typeof this.hint === 'object') {
            this.hintOptions = {
                ...this._defaultHintOptions,
                ...this.hint
            };
        }
    }

    /** @hidden */
    private _assignErrorDirectives(): void {
        this._errorDirectivesCdr?.unsubscribe();
        this._errorDirectives = this._errorDirectiveQuery.toArray();
        this._errorDirectivesCdr = new Subscription();

        this._errorDirectives.forEach((directive) => {
            this._errorDirectivesCdr.add(
                directive.detectChanges$.subscribe(() => {
                    this.groupErrors();
                    this._cd.detectChanges();
                })
            );
        });
    }
}
