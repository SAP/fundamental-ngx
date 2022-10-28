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
import { NgControl, NgForm } from '@angular/forms';
import { startWith } from 'rxjs/operators';
import { BaseInput, FormField, FormFieldControl } from '@fundamental-ngx/platform/shared';
import { InputComponent } from '../input/input.component';

import { CSS_CLASS_NAME, INPUT_GROUP_CHILD_TOKEN } from './constants';
import { InputGroupConfig } from './input-group.config';
import { InputGroupAddonComponent } from './addon.component';
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
    styleUrls: ['./input-group.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: FormFieldControl, useExisting: forwardRef(() => InputGroupComponent), multi: true }]
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

    /** @hidden */
    @ContentChildren(INPUT_GROUP_CHILD_TOKEN as any)
    _children: QueryList<InputGroupInputComponent | InputGroupAddonComponent>;

    /** @hidden */
    @ContentChild(InputGroupInputComponent)
    _input: InputGroupInputComponent;

    /** @hidden */
    @ViewChild(InputComponent, { read: ElementRef })
    set _inputComponentElement(inputComponentElementRef: ElementRef<HTMLElement>) {
        this._setInputElementClass(inputComponentElementRef?.nativeElement);
    }

    /** @hidden */
    _beforeInputAddons: InputGroupAddonComponent[] = [];

    /** @hidden */
    _afterInputAddons: InputGroupAddonComponent[] = [];

    /** @hidden */
    get _controlStateClass(): string | null {
        const state = this.state;
        return state ? `is-${state}` : null;
    }

    /** @hidden */
    constructor(
        cd: ChangeDetectorRef,
        @Optional() @Self() ngControl: NgControl,
        @Optional() @SkipSelf() ngForm: NgForm,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>,
        private _renderer: Renderer2,
        protected _hostElementRef: ElementRef<HTMLElement>,
        protected _inputGroupConfig: InputGroupConfig
    ) {
        super(cd, ngControl, ngForm, formField, formControl);
    }

    /** @hidden */
    ngOnInit(): void {
        super.ngOnInit();
        /**
         * Assign predefined className to host element
         * to make css selector stronger
         */
        this._addClassNameToHostElement(CSS_CLASS_NAME.host);
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._listenToChildrenQueryListChanges();
    }

    /**
     * @hidden
     * override base functionality to catch new disabled state
     */
    setDisabledState(disabled: boolean): void {
        super.setDisabledState(disabled);
        this._setAddonsOptions();
    }

    /** @hidden */
    _onChangeInputValue(value: string): void {
        this.value = value;
    }

    /** @hidden */
    _onKeyPress(event: KeyboardEvent): void {
        // prevent typing non-digit chars
        if (this._input.type === 'number') {
            if (!event.key.match(/([0-9]|[-]|[,]|[.])/)) {
                event.preventDefault();
            }
        }
    }

    /** @hidden */
    private _listenToChildrenQueryListChanges(): void {
        this._children.changes.pipe(startWith(this._children)).subscribe(() => {
            this._createAddonsGroups();
            this._setAddonsOptions();
        });
    }

    /** @hidden */
    private _setInputElementClass(inputComponentElement: HTMLElement): void {
        if (!inputComponentElement) {
            return;
        }

        const inputElement = inputComponentElement.querySelector('input');
        this._renderer.addClass(inputElement, CSS_CLASS_NAME.input);
    }

    /** @hidden */
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

    /** @hidden */
    private _isInputChild(child: unknown): child is InputGroupInputComponent {
        return child instanceof InputGroupInputComponent;
    }

    /** @hidden */
    private _isAddonChild(child: unknown): child is InputGroupAddonComponent {
        return child instanceof InputGroupAddonComponent;
    }

    /** @hidden */
    private _setAddonsOptions(): void {
        const before = this._beforeInputAddons || [];
        const after = this._afterInputAddons || [];
        [...before, ...after].forEach((addon) => {
            addon.disabled = this.disabled;
        });
    }

    /** @hidden */
    private _addClassNameToHostElement(className: string): void {
        this._renderer.addClass(this._hostElementRef.nativeElement, className);
    }
}
