import { NgTemplateOutlet } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    forwardRef,
    Input,
    OnInit,
    QueryList,
    Renderer2,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CvaControl, CvaDirective, FD_FORM_FIELD_CONTROL } from '@fundamental-ngx/cdk/forms';
import { warnOnce } from '@fundamental-ngx/cdk/utils';
import { contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { FormControlComponent } from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { startWith } from 'rxjs/operators';
import { InputComponent } from '../input/input.component';
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
    hostDirectives: [
        {
            directive: CvaDirective,
            inputs: ['placeholder', 'disabled', 'readonly', 'state', 'name', 'stateMessage']
        }
    ],
    providers: [
        CvaControl,
        { provide: FD_FORM_FIELD_CONTROL, useExisting: forwardRef(() => InputGroupComponent), multi: true },
        contentDensityObserverProviders()
    ],
    imports: [NgTemplateOutlet, InputGroupModule, FormControlComponent, FormsModule]
})
export class InputGroupComponent implements OnInit, AfterContentInit {
    /** Input value */
    @Input()
    set value(value: any) {
        this._cvaControl.cvaDirective?.setValue(value);
    }
    get value(): any {
        return this._cvaControl.cvaDirective?.value;
    }

    /** @hidden */
    @ContentChildren(INPUT_GROUP_CHILD_TOKEN)
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
    constructor(
        readonly _cvaControl: CvaControl<string | number>,
        private _renderer: Renderer2,
        protected _hostElementRef: ElementRef<HTMLElement>,
        protected _inputGroupConfig: InputGroupConfig
    ) {
        warnOnce(
            `[Deprecated] Platform Input Group Component is deprecated and will be removed in the next major version.
             Please use Core implementation of Input Group Component instead.`
        );
    }

    /** @hidden */
    ngOnInit(): void {
        this._cvaControl.listenToChanges();
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
        this._cvaControl.cvaDirective?.setDisabledState(disabled);
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
            addon.disabled = this._cvaControl.cvaDirective?.disabled === true;
        });
    }

    /** @hidden */
    private _addClassNameToHostElement(className: string): void {
        this._renderer.addClass(this._hostElementRef.nativeElement, className);
    }
}
