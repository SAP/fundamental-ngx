/**
 * @license
 * F. Kolar
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 */
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
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    Provider,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    booleanAttribute,
    forwardRef,
    inject
} from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { KeyValuePipe, NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormField } from '@fundamental-ngx/cdk/forms';
import { Nullable, resizeObservable } from '@fundamental-ngx/cdk/utils';
import {
    ContentDensityModule,
    ContentDensityObserver,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { InlineHelpDirective } from '@fundamental-ngx/core/inline-help';
import { LinkComponent } from '@fundamental-ngx/core/link';
import {
    ColumnLayout,
    FieldHintOptions,
    FormFieldGroup,
    FormGroupContainer,
    HintInput,
    HintOptions,
    PlatformFormField
} from '@fundamental-ngx/platform/shared';
import { getField, getFormField, isFieldChild, isFieldGroupChild, isFieldGroupWrapperChild } from '../form-helpers';
import { Field, FieldColumn, FieldGroup } from '../models/field.model';
import {
    DefaultGapLayout,
    DefaultHorizontalFieldLayout,
    DefaultHorizontalLabelLayout,
    DefaultVerticalFieldLayout,
    FORM_GROUP_CHILD_FIELD_TOKEN
} from './constants';
import { FDP_FORM_FIELD_HINT_OPTIONS_DEFAULT } from './fdp-form.tokens';
import { FormFieldErrorDirective } from './form-field-error/form-field-error.directive';
import { FormFieldComponent } from './form-field/form-field.component';
import { FormGroupHeaderComponent } from './form-group-header/form-group-header.component';
import { generateColumnClass, normalizeColumnLayout } from './helpers';
import { FieldGroupRowValuePipe } from './pipes/field-group-row-value.pipe';
import { FormFieldLayoutService } from './services/form-field-layout.service';

export const formGroupProvider: Provider = {
    provide: FormGroupContainer,
    useExisting: forwardRef(() => FormGroupComponent)
};

type FormGroupField = (FormField | FormFieldGroup) & { hintOptions?: HintOptions };

let formGroupUniqueId = 0;

/**
 *
 * FormGroup represent high order container aggregating FormFields and ability to distribute these
 * fields into columns. It mainly hides implementation details that we need to deal with every
 * time we are building a form. We have input fields , error managements, different states,
 * hints and many more.
 *
 * Well behaved form that has information side by side in multiple
 * columns needs to also know how to merge properly.
 *
 * Just to get the idea about the structure without actual input components inside
 *
 * ```html
 * <fdp-form-group [hintPlacement]="'inline'" columnLayout="XL2-L2-M1-S1">
 *    <fdp-form-field [id]="'Field A'" [rank]="10" column="1">
 *    </fdp-form-field>
 *
 *    <fdp-form-field [id]="'Field B'" [rank]="30" column="1">
 *    </fdp-form-field>
 *
 *    <fdp-form-field [id]="'Field C'"  [rank]="20" column="1">
 *    </fdp-form-field>
 *
 *    <fdp-form-field [id]="Field D"  [rank]="20" column="2">
 *    </fdp-form-field>
 *
 *
 *    <fdp-form-field [id]="'Field E'" [rank]="30" column="2">
 *    </fdp-form-field>
 * </fdp-form-group>

 *
 * ````
 *
 *
 * Which can be translated like this
 * [Field A] - First column, rank 10
 * [Field B] - First column, rank 30
 * [Field C] - First column, rank 20
 * [Field D] - Second column, rank 20
 * [Field E] - Second column, rank 30
 *
 * What we expect that it creates following form with two column layout:
 * [Field A]      [Field D]
 * [Field C]      [Field E]
 * [Field B]
 *
 * You can see all is sorted accordingly by rank (C goes before B).
 *
 * When you move into smaller device and all is merged into one columns the naive solution would be:
 *
 * [Field A]
 * [Field C]
 * [Field B]
 * [Field D]
 * [Field E]
 *
 * The fields needs to restructure according to their original positioning. When Field D was on the
 * top why we should move it to the bottom? The more correct solution should be following.
 *
 * [Field A]
 * [Field D]
 * [Field C]
 * [Field E]
 * [Field B]
 *
 * Fields nicely merge together. they don't wrap.
 *
 *
 * Besides this layout support it also wraps form functionality and it can work with FormGroup.
 * You can also decide if you want your form with <form> element or without it.
 *
 *
 */
@Component({
    selector: 'fdp-form-group',
    templateUrl: 'form-group.component.html',
    styleUrl: './form-group.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [formGroupProvider, FormFieldLayoutService, contentDensityObserverProviders()],
    imports: [
        FormsModule,
        NgTemplateOutlet,
        FormGroupHeaderComponent,
        LinkComponent,
        IconComponent,
        InlineHelpDirective,
        KeyValuePipe,
        FieldGroupRowValuePipe,
        ContentDensityModule
    ]
})
export class FormGroupComponent
    implements FormGroupContainer, OnInit, AfterContentInit, AfterViewInit, OnDestroy, OnChanges
{
    /** Id for the form group element */
    @Input()
    id = `fdp-form-group-${formGroupUniqueId++}`;

    /** Name property to be set on a form. Will be used if `useForm` is set to true */
    @Input()
    name: string;

    /** Indicates if group is editable */
    @Input()
    editable = true;

    /** Indicates when labels should not be displayed */
    @Input()
    noLabelLayout = false;

    /** User's custom classes */
    @Input()
    class: string;

    /**
     * Form group hint options
     */
    @Input()
    hint: HintInput;

    /**
     * Defines column layout for inline items.
     */
    @Input()
    set inlineColumnLayout(value: ColumnLayout) {
        this._inlineColumnLayout = normalizeColumnLayout(value);
        this._updateInlineColumnLayout();
    }

    get inlineColumnLayout(): ColumnLayout {
        return this._inlineColumnLayout;
    }

    /**
     * Defines label's column layout.
     */
    @Input()
    labelColumnLayout: ColumnLayout = DefaultHorizontalLabelLayout;

    /**
     * Defines field's column layout.
     */
    @Input()
    fieldColumnLayout: ColumnLayout = DefaultHorizontalFieldLayout;

    /**
     * Defines gap column layout.
     */
    @Input()
    gapColumnLayout: ColumnLayout = DefaultGapLayout;

    /** Angular FormGroup where all underlying controls will be attached to. */
    @Input()
    formGroup: FormGroup;

    /** This is rather simple for now just to have some Section Title if needed */
    @Input()
    topTitle: string;

    /** Form's main title. */
    @Input()
    mainTitle: Nullable<string>;

    /** Whether to hide form's main title. Default is false. */
    @Input()
    hideMainTItle = false;

    /**
     * Convenient way to initialize internal FormControls from object
     */
    @Input()
    object: any;

    /**
     * Translations template reference.
     *
     * This is just here to support several ways to pass translation.
     *
     * One way is to provide ng-template #i18n inside the form-group tag and the other one
     * some global one as binding
     */
    @Input()
    i18Strings: TemplateRef<any>;

    /** Whether to wrap all the provided content in a `<form>` */
    @Input({ transform: booleanAttribute })
    useForm = false;

    /**
     * Specify the column layout in the format `XLn-Ln-Mn-Sn` where n is the number of columns and can be different for each size.
     * eg: XL2-L2-M2-S1 would create 2-column layouts for XL, L, and M sizes and single-column layout for S size.
     */
    @Input()
    columnLayout: Nullable<string>;

    /** Whether all form items should have identical layout provided for form group */
    @Input()
    unifiedLayout = true;

    /**
     * onSubmit event
     */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    onSubmit: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Native form element. Available with `[useForm]="true"` input property.
     */
    @ViewChild('nativeForm', { read: NgForm })
    nativeForm: NgForm;

    /** @hidden */
    @ContentChild('i18n', { static: true })
    i18Template: TemplateRef<any>;

    /**
     * @hidden
     *
     * Keep track of added form fields children in correct order.
     *
     * Since "descendants: true" includes fields of nested form group as well.
     *
     * We are forced to use "ContentChildren" so FormField children can be used
     * with optional rendering (ngIf) safely.
     *
     * Form fields within the formGroup is driven by multi-zone layout support. We need to be
     * able to add number of FormFields, and based on given configuration (zone, rank) render them
     * under correct zone  (top, bottom, left, right).
     *
     * We want to make sure that we don't include content and then try to somehow position it as it
     * would lead to the UI where user can see elementing moving as you try to position it.
     *
     */
    @ContentChildren(FORM_GROUP_CHILD_FIELD_TOKEN as any, { descendants: true })
    protected formGroupChildren: QueryList<FormGroupField>;

    /** @hidden */
    @ContentChildren(FormFieldErrorDirective)
    private _errorDirectives: QueryList<FormFieldErrorDirective>;

    /** @hidden */
    xlColumnsNumber: number;
    /** @hidden */
    lgColumnsNumber: number;
    /** @hidden */
    mdColumnsNumber: number;

    /**
     * @hidden
     * User responsive layout
     */
    xlCol: string;

    /**
     * @hidden
     * Packed fields which should be rendered
     */
    formRows: { [key: number]: FieldColumn | FieldGroup } = {};

    /** @hidden */
    _hintOptions: Nullable<HintOptions>;

    /** @hidden */
    readonly contentDensityObserver = inject(ContentDensityObserver);

    /** @hidden */
    _inlineColumnLayoutClass: string;

    /** @hidden */
    protected _destroyRef = inject(DestroyRef);

    /** @hidden */
    private _inlineColumnLayout = DefaultVerticalFieldLayout;

    /**
     * @hidden
     *
     * List of direct FdpFormGroup's children.
     *
     * Since "formGroupChildren" uses "{ descendants: true }" option that means
     * "formGroupChildren" will keep track of nested FdpFormGroup fields as well.
     * This list relies on the injection mechanism so nested FdpFormGroup's fields/fieldGroups
     * will be omitted
     */
    private _formGroupDirectChildren: Array<FormGroupField> = [];

    /** @hidden */
    private readonly _subscriptions = new Subscription();

    /** @hidden */
    private readonly _cd = inject(ChangeDetectorRef);
    /** @hidden */
    private readonly _elementRef = inject(ElementRef);
    /** @hidden */
    private readonly _formContainer = inject(ControlContainer, { optional: true });
    /** @hidden */
    private readonly _defaultHintOptions = inject<FieldHintOptions>(FDP_FORM_FIELD_HINT_OPTIONS_DEFAULT);

    /** @hidden */
    constructor() {
        this.formGroup = <FormGroup>(this._formContainer ? this._formContainer.control : new FormGroup({}));
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        this.buildComponentCssClass();
        if (changes.hint) {
            if (typeof this.hint === 'string' || this.hint instanceof TemplateRef) {
                this._hintOptions = {
                    ...this._defaultHintOptions,
                    content: this.hint
                };
            } else {
                this._hintOptions = {
                    ...this._defaultHintOptions,
                    ...this.hint
                };
            }
        }
    }

    /** @hidden */
    ngOnInit(): void {
        if (!this.formGroup) {
            this.formGroup = new FormGroup({});
        }
        this.buildComponentCssClass();
        this._updateInlineColumnLayout();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this.i18Strings = this.i18Strings ? this.i18Strings : this.i18Template;

        this._setUserLayout();
        this._updateFieldByColumn();
        this._updateFormFieldsProperties();
        this._listenToFormGroupChildren();
        this._listenFormFieldColumnChange();
        this._cd.markForCheck();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this.i18Strings = this.i18Strings ? this.i18Strings : this.i18Template;

        this._setUserLayout();
        this._updateFieldByColumn();
        this._updateFormFieldsProperties();
        this._listenToFormGroupChildren();
        this._listenFormFieldColumnChange();
        this._trackFormGroupResize();
        this._cd.markForCheck();

        this._cd.detectChanges();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    addFormField(formField: PlatformFormField): void {
        // It's needed to set default FormField properties
        // on early stage otherwise validation errors
        // will be thrown on FormField level (e.g. i18string are not defined)
        this._updateFormFieldProperties(formField);
        // keep track of directly registered children
        this._addDirectFormGroupChild(formField);
    }

    /** @hidden */
    removeFormField(formField: PlatformFormField): void {
        this._removeDirectFormGroupChild(formField);
    }

    /** @hidden */
    addFormFieldGroup(formFieldGroup: FormFieldGroup): void {
        this._addDirectFormGroupChild(formFieldGroup);
    }

    /** @hidden */
    removeFormFieldGroup(formFieldGroup: FormFieldGroup): void {
        this._removeDirectFormGroupChild(formFieldGroup);
    }

    /** @hidden */
    addFormControl(name: string, control: AbstractControl): void {
        this.formGroup.setControl(name, control);
        // letting control to set value. when provided value is 'false'.
        if (this.object) {
            control.patchValue(this.object[name]);
        }
    }

    /** @hidden */
    removeFormControl(name: string): void {
        this.formGroup.removeControl(name);
    }

    /** @hidden */
    trackByFn(index: number): number {
        return index;
    }

    /** @hidden */
    trackByFieldName(index: number, field: Field): string | undefined {
        return field ? field.name : undefined;
    }

    /** @hidden */
    buildComponentCssClass(): string[] {
        return ['fd-container', this.class];
    }

    /** @hidden used for template side Type correction */
    $fieldGroup = (f: any): FieldGroup => f;

    /** @hidden */
    private _listenToFormGroupChildren(): void {
        this.formGroupChildren.changes.subscribe(() => {
            this._updateFieldByColumn();
            this._cd.markForCheck();
        });
    }

    /** @hidden */
    private _listenFormFieldColumnChange(): void {
        this.formGroupChildren.forEach((field: FormGroupField) =>
            (<FormFieldComponent>field).onColumnChange?.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
                this._updateFieldByColumn();
                this._cd.markForCheck();
            })
        );
    }

    /**
     * @hidden
     * Assign a fields or field group to specified columns with rank.
     * if `columnLayoutType` is given a fields without column property will set on last column.
     * Otherwise the fields set 1 column.
     */
    private _updateFieldByColumn(): void {
        const formChildren = this._getFormGroupChildren();
        const rows: { [key: number]: FieldColumn | FieldGroup } = {};
        let rowNumber = 0;
        let columns: FieldColumn = {};

        for (const child of formChildren) {
            if (isFieldChild(child)) {
                const field = getField(child);
                const columnNumber = this._validateFieldColumn(child.column);

                if (!columns[columnNumber]) {
                    columns[columnNumber] = [];
                }
                columns[columnNumber].push(field);
            }

            if (isFieldGroupChild(child)) {
                const fieldGroupColumns: FieldColumn = {};
                if (Object.keys(columns).length) {
                    rows[rowNumber] = columns;
                    columns = {};
                    rowNumber++;
                }

                const groupFields = child.fields.map((field) => getField(field));
                groupFields.forEach((groupField) => {
                    const columnNumber = this._validateFieldColumn(groupField.column);

                    if (!fieldGroupColumns[columnNumber]) {
                        fieldGroupColumns[columnNumber] = [];
                    }
                    fieldGroupColumns[columnNumber].push(groupField);
                });

                rows[rowNumber] = new FieldGroup(child.label, fieldGroupColumns, child.hintOptions);
                rowNumber++;
            }
        }
        rows[rowNumber] = columns;
        this.formRows = rows;
    }

    /** @hidden Validate column number */
    private _validateFieldColumn(columnNumber: number | undefined): number {
        if (this.columnLayout && columnNumber) {
            if (isNaN(columnNumber)) {
                throw new Error('Input a valid column number');
            }

            if (columnNumber > this.xlColumnsNumber) {
                throw new Error(`Columns cannot be more than ${this.xlColumnsNumber}`);
            }

            return columnNumber;
        }

        return this.xlColumnsNumber;
    }

    /** @hidden */
    private _updateFormFieldsProperties(): void {
        this._getFormGroupChildren().forEach((formField: FormGroupField) => {
            if (isFieldChild(formField)) {
                this._updateFormFieldProperties(formField);
            }

            if (isFieldGroupChild(formField)) {
                formField.fields.forEach((field) => this._updateFormFieldProperties(getFormField(field)));
            }
        });
    }

    /**
     * @hidden
     * Pass some global properties to each field. Even formGroup cna be inject directly inside form
     * field we are using here a setter method to initialize the
     *
     */
    private _updateFormFieldProperties(formField: PlatformFormField): void {
        if (this.unifiedLayout) {
            formField.editable = this.editable;
            formField.noLabelLayout = this.noLabelLayout;
        }
        formField.setDefaultColumnLayout();
        formField.i18Strings = formField.i18Strings ? formField.i18Strings : this.i18Strings;
        formField.setErrorDirectives(this._errorDirectives);
    }

    /**
     * @hidden
     * if `columnLayoutType` is given, set those column layouts appropriately. Otherwise, a layout will set on 1 column
     */
    private _setUserLayout(): void {
        if (this.columnLayout) {
            this._getColumnNumbers(this.columnLayout);
            if (isNaN(this.xlColumnsNumber) || isNaN(this.lgColumnsNumber) || isNaN(this.mdColumnsNumber)) {
                throw new Error('Input a valid number for columns');
            }
            if (this.xlColumnsNumber > 12 || this.lgColumnsNumber > 12 || this.mdColumnsNumber > 12) {
                throw new Error('Columns cannot be more than 12');
            }
            const lgColumns = 12 / this.lgColumnsNumber;
            const mdColumns = 12 / this.mdColumnsNumber;
            const xlColumns = 12 / this.xlColumnsNumber;

            // for `lg` single-column layout, Styles does not use any class, and providing `fd-col-lg--12` has unintended side-effects
            // therefore, we remove the lg class for single-column layout
            if (lgColumns === 12) {
                this.xlCol = `fd-col-xl--${xlColumns} fd-col-md--${mdColumns}`;
            } else {
                this.xlCol = `fd-col-xl--${xlColumns} fd-col-md--${mdColumns} fd-col-lg--${lgColumns}`;
            }
        } else {
            this.xlCol = `fd-col-xl--12 fd-col-md--12 fd-col-lg--12`;
        }
    }

    /** @hidden */
    private _getColumnNumbers(layout: string): void {
        const [xl, lg, md] = layout.split('-');
        this.xlColumnsNumber = parseInt(xl.slice(2, xl.length), 10);
        this.lgColumnsNumber = parseInt(lg.slice(1, lg.length), 10);
        this.mdColumnsNumber = parseInt(md.slice(1, md.length), 10);
    }

    /** @hidden */
    private _addDirectFormGroupChild(child: FormGroupField): void {
        if (this._formGroupDirectChildren.indexOf(child) > -1) {
            return;
        }
        this._formGroupDirectChildren.push(child);
    }

    /** @hidden */
    private _removeDirectFormGroupChild(child: PlatformFormField | FormFieldGroup): void {
        this._formGroupDirectChildren = this._formGroupDirectChildren.filter((_child) => _child !== child);
    }

    /**
     * @hidden
     * Get direct form group children in the original order
     */
    private _getFormGroupChildren(): FormGroupField[] {
        if (!this.formGroupChildren) {
            return [];
        }
        const children = this.formGroupChildren
            .toArray()
            .map((child) => (isFieldGroupWrapperChild(child) ? child.fieldRenderer : child));

        return children.filter((child) => this._formGroupDirectChildren.includes(child));
    }

    /** @hidden */
    private _updateInlineColumnLayout(): void {
        this._inlineColumnLayoutClass = generateColumnClass(this.inlineColumnLayout);
    }

    /**
     * @hidden
     * have to trigger change detection here in order to re-check contents
     * inside "FormField.renderer" template every time component's dimensions changed
     */
    private _trackFormGroupResize(): void {
        this._subscriptions.add(
            resizeObservable(this._elementRef.nativeElement)
                .pipe(debounceTime(20))
                .subscribe(() => this._cd.markForCheck())
        );
    }
}
