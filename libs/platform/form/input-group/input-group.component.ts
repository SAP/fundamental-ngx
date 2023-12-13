import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    forwardRef,
    Host,
    Inject,
    Input,
    OnInit,
    Optional,
    QueryList,
    Renderer2,
    Self,
    SkipSelf,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlContainer, NgControl, NgForm } from '@angular/forms';
import { FD_FORM_FIELD, FD_FORM_FIELD_CONTROL } from '@fundamental-ngx/cdk/forms';
import { contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { BaseInput, PlatformFormField, PlatformFormFieldControl } from '@fundamental-ngx/platform/shared';
import { startWith } from 'rxjs/operators';
import { InputComponent } from '../input/input.component';

import { NgTemplateOutlet } from '@angular/common';
import { InputGroupAddonBodyComponent } from './addon-body.component';
import { InputGroupAddonComponent } from './addon.component';
import { CSS_CLASS_NAME, INPUT_GROUP_CHILD_TOKEN } from './constants';
import { InputGroupConfig } from './input-group.config';
import { InputGroupInputComponent } from './input.component';

/**
 * Fundamental input group component
 *
 * ```html
 * <fdp-input-group>
 *   <fdp-input-group-addon>$</fdp-input-group-addon>
 *   <fdp-input-group-input type="number"></fdp-input-group-input>
 *   <fdp-input-group-addon>0.00</fdp-input-group-addon>
 * </fdp-input-group>
 * ```
 *
 */
@Component({
    selector: 'fdp-input-group',
    templateUrl: './input-group.component.html',
    styleUrl: './input-group.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: FD_FORM_FIELD_CONTROL, useExisting: forwardRef(() => InputGroupComponent), multi: true },
        contentDensityObserverProviders()
    ],
    standalone: true,
    imports: [InputGroupAddonBodyComponent, NgTemplateOutlet, InputComponent]
})
export class InputGroupComponent extends BaseInput implements OnInit, AfterContentInit, AfterViewInit {
    /** Input value */
    @Input()
    set value(value: any) {
        super.setValue(value);
    }
    get value(): any {
        return super.getValue();
    }

    /** @ignore */
    @ContentChildren(INPUT_GROUP_CHILD_TOKEN)
    _children: QueryList<InputGroupInputComponent | InputGroupAddonComponent>;

    /** @ignore */
    @ContentChild(InputGroupInputComponent)
    _input: InputGroupInputComponent;

    /** @ignore */
    @ViewChild(InputComponent, { read: ElementRef })
    set _inputComponentElement(inputComponentElementRef: ElementRef<HTMLElement>) {
        this._setInputElementClass(inputComponentElementRef?.nativeElement);
    }

    /** @ignore */
    _beforeInputAddons: InputGroupAddonComponent[] = [];

    /** @ignore */
    _afterInputAddons: InputGroupAddonComponent[] = [];

    /** @ignore */
    get _controlStateClass(): string | null {
        const state = this.state;
        return state ? `is-${state}` : null;
    }

    /** @ignore */
    constructor(
        cd: ChangeDetectorRef,
        elementRef: ElementRef,
        @Optional() @Self() ngControl: NgControl,
        @Optional() @SkipSelf() controlContainer: ControlContainer,
        @Optional() @SkipSelf() ngForm: NgForm,
        @Optional() @SkipSelf() @Host() @Inject(FD_FORM_FIELD) formField: PlatformFormField,
        @Optional() @SkipSelf() @Host() @Inject(FD_FORM_FIELD_CONTROL) formControl: PlatformFormFieldControl,
        private _renderer: Renderer2,
        protected _hostElementRef: ElementRef<HTMLElement>,
        protected _inputGroupConfig: InputGroupConfig
    ) {
        super(cd, elementRef, ngControl, controlContainer, ngForm, formField, formControl);
    }

    /** @ignore */
    ngOnInit(): void {
        super.ngOnInit();
        /**
         * Assign predefined className to host element
         * to make css selector stronger
         */
        this._addClassNameToHostElement(CSS_CLASS_NAME.host);
    }

    /** @ignore */
    ngAfterContentInit(): void {
        this._listenToChildrenQueryListChanges();
    }

    /**
     * @ignore
     * override base functionality to catch new disabled state
     */
    setDisabledState(disabled: boolean): void {
        super.setDisabledState(disabled);
        this._setAddonsOptions();
    }

    /** @ignore */
    _onChangeInputValue(value: string): void {
        this.value = value;
    }

    /** @ignore */
    _onKeyPress(event: KeyboardEvent): void {
        // prevent typing non-digit chars
        if (this._input.type === 'number') {
            if (!event.key.match(/([0-9]|[-]|[,]|[.])/)) {
                event.preventDefault();
            }
        }
    }

    /** @ignore */
    private _listenToChildrenQueryListChanges(): void {
        this._children.changes.pipe(startWith(this._children)).subscribe(() => {
            this._createAddonsGroups();
            this._setAddonsOptions();
        });
    }

    /** @ignore */
    private _setInputElementClass(inputComponentElement: HTMLElement): void {
        if (!inputComponentElement) {
            return;
        }

        const inputElement = inputComponentElement.querySelector('input');
        this._renderer.addClass(inputElement, CSS_CLASS_NAME.input);
    }

    /** @ignore */
    private _createAddonsGroups(): void {
        const childrenList = this._children.toArray();
        const inputChildIndex = childrenList.findIndex((child) => this._isInputChild(child));

        // reset group's containers
        this._beforeInputAddons = [];
        this._afterInputAddons = [];

        childrenList.forEach((child, index) => {
            if (!this._isAddonChild(child)) {
                return;
            }
            if (index < inputChildIndex) {
                this._beforeInputAddons.push(child);
            }
            if (index > inputChildIndex) {
                this._afterInputAddons.push(child);
            }
        });
    }

    /** @ignore */
    private _isInputChild(child: unknown): child is InputGroupInputComponent {
        return child instanceof InputGroupInputComponent;
    }

    /** @ignore */
    private _isAddonChild(child: unknown): child is InputGroupAddonComponent {
        return child instanceof InputGroupAddonComponent;
    }

    /** @ignore */
    private _setAddonsOptions(): void {
        const before = this._beforeInputAddons || [];
        const after = this._afterInputAddons || [];
        [...before, ...after].forEach((addon) => {
            addon.disabled = this.disabled;
        });
    }

    /** @ignore */
    private _addClassNameToHostElement(className: string): void {
        this._renderer.addClass(this._hostElementRef.nativeElement, className);
    }
}
