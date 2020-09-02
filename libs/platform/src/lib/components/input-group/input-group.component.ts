import {
    Component,
    Input,
    ChangeDetectionStrategy,
    ContentChildren,
    QueryList,
    ElementRef,
    ViewEncapsulation,
    ChangeDetectorRef,
    Renderer2,
    AfterViewInit,
    OnInit,
    AfterContentInit
} from '@angular/core';
import { startWith } from 'rxjs/operators';

import { BaseComponent } from '../base';
import { InputComponent } from '../form/input/input.component';
import { ContentDensity, Status } from '../form/form-control';

import { InputGroupConfig } from './input-group.config';
import { InputGroupAddonComponent } from './addon/addon.component';

const CSS_CLASS_NAME = {
    inputGroup: 'fdp-input-group',
    inputGroupInnerInput: 'fd-input-group__input'
} as const;

/**
 * Fundamental input group component
 *
 * ```html
 * <fdp-input-group>
 *   <fdp-input-group-addon>$</fdp-input-group-addon>
 *   <fdp-input type="number" name="price"></fdp-input>
 * </fdp-input-group>
 * ```
 *
 */
@Component({
    selector: 'fdp-input-group',
    templateUrl: './input-group.component.html',
    styleUrls: ['./input-group.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputGroupComponent extends BaseComponent implements OnInit, AfterContentInit, AfterViewInit {
    /**
     * content Density of element: 'cozy' | 'compact'
     */
    @Input()
    set contentDensity(contentDensity: ContentDensity) {
        this._contentDensity = contentDensity;

        this._setInputControlsOptions();
        this._setAddonControlsOptions();
    }
    get contentDensity(): ContentDensity {
        return this._contentDensity;
    }

    /**
     * control state: 'success' | 'error' | 'warning' | 'default' | 'information'
     */
    @Input()
    set state(state: Status) {
        this._controlStateClass = `is-${state}`;
    }

    /** @hidden */
    @ContentChildren(InputComponent)
    private _inputControls: QueryList<InputComponent>;

    /** @hidden */
    @ContentChildren(InputGroupAddonComponent)
    private _addonControls: QueryList<InputGroupAddonComponent>;

    /** @hidden */
    private _contentDensity: ContentDensity = this._inputGroupConfig.contentDensity;

    /** @hidden */
    _controlStateClass: string;

    /** @hidden */
    constructor(
        _cd: ChangeDetectorRef,
        private _renderer: Renderer2,
        protected _elementRef: ElementRef<HTMLElement>,
        protected _inputGroupConfig: InputGroupConfig
    ) {
        super(_cd);
    }

    /** @hidden */
    ngOnInit(): void {
        /**
         * Assign predefined className to host element
         * to make css selector stronger
         */
        this._renderer.addClass(this._elementRef.nativeElement, CSS_CLASS_NAME.inputGroup);
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._inputControls.changes
            .pipe(startWith(this._inputControls))
            .subscribe(() => this._setInputControlsOptions());

        this._addonControls.changes
            .pipe(startWith(this._addonControls))
            .subscribe(() => this._setAddonControlsOptions());
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._inputControls.changes.pipe(startWith(null)).subscribe(() => this._setInputClassName());
    }

    /** @hidden */
    private _setInputControlsOptions(inputControls = this._inputControls): void {
        if (!inputControls) {
            return;
        }

        inputControls.forEach((control) => {
            control.contentDensity = this._contentDensity;
            control.markForCheck();
        });
    }

    /** @hidden */
    private _setInputClassName(): void {
        const hostElement = this._elementRef.nativeElement;

        if (!hostElement) {
            return;
        }

        hostElement.querySelectorAll('fdp-input input').forEach((inputEl: HTMLElement) => {
            this._renderer.addClass(inputEl, CSS_CLASS_NAME.inputGroupInnerInput);
        });
    }

    /** @hidden */
    private _setAddonControlsOptions(addonControls = this._addonControls): void {
        if (!addonControls) {
            return;
        }

        addonControls.forEach((addon) => {
            addon.contentDensity = this._contentDensity;
        });
    }
}
