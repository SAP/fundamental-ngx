import {
    Component,
    ChangeDetectionStrategy,
    OnInit,
    ElementRef,
    AfterContentInit,
    ContentChildren,
    QueryList,
    Renderer2
} from '@angular/core';
import { startWith } from 'rxjs/operators';

import { ContentDensity } from '../../form/form-control';
import { ButtonComponent } from '../../button/button.component';

const CSS_CLASS_NAME = {
    addon: 'fd-input-group__addon',
    addonButton: 'fd-input-group__addon--button',
    addonCompact: 'fd-input-group__addon--compact',
    innerButton: 'fd-input-group__button'
} as const;

/**
 * Fundamental input group addon component
 *
 * This component is created to be used inside `<fdp-input-group>`
 *
 *
 * Input group addon can contain a plain text:
 * ```
 * <fdp-input-group-addon>$</fdp-input-group-addon>
 * ```
 * Icon:
 * ```
 * <fdp-input-group-addon><i class="sap-icon--employee"></i></fdp-input-group-addon>
 * ```
 * Button component:
 * ```
 * <fdp-input-group-addon><fdp-button>Action</fdp-button></fdp-input-group-addon>
 * ```
 *
 */
@Component({
    selector: 'fdp-input-group-addon',
    templateUrl: './addon.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputGroupAddonComponent implements OnInit, AfterContentInit {
    /**
     * content Density of element: 'cozy' | 'compact'
     */
    set contentDensity(contentDensity: ContentDensity) {
        if (contentDensity === this._contentDensity) {
            return;
        }

        this._contentDensity = contentDensity;

        if (contentDensity === 'compact') {
            this._addClassNameToHostElement(CSS_CLASS_NAME.addonCompact);
        } else {
            this._removeClassNameFromHostElement(CSS_CLASS_NAME.addonCompact);
        }

        this._setFdpButtonsOptions();
    }

    /**@hidden */
    @ContentChildren(ButtonComponent)
    private _fdpButtons: QueryList<ButtonComponent>;

    /** @hidden */
    private _contentDensity: ContentDensity;

    /**@hidden */
    constructor(private _elementRef: ElementRef<HTMLElement>, private _renderer: Renderer2) {}

    /**@hidden */
    ngOnInit(): void {
        this._addClassNameToHostElement(CSS_CLASS_NAME.addon);
    }

    /**@hidden */
    ngAfterContentInit(): void {
        this._fdpButtons.changes
            .pipe(startWith(this._fdpButtons))
            .subscribe((fdpButtons: QueryList<ButtonComponent>) => {
                if (fdpButtons.length) {
                    this._addClassNameToHostElement(CSS_CLASS_NAME.addonButton);
                } else {
                    this._removeClassNameFromHostElement(CSS_CLASS_NAME.addonButton);
                }

                this._setFdpButtonsOptions();
                this._setButtonsClassName();
            });
    }

    /**@hidden */
    private _addClassNameToHostElement(className: string): void {
        this._renderer.addClass(this._elementRef.nativeElement, className);
    }

    /**@hidden */
    private _removeClassNameFromHostElement(className: string): void {
        this._renderer.removeClass(this._elementRef.nativeElement, className);
    }

    /**@hidden */
    private _setButtonsClassName(): void {
        const element = this._elementRef.nativeElement;

        if (!element) {
            return;
        }

        element.querySelectorAll('button').forEach((button) => {
            this._renderer.addClass(button, CSS_CLASS_NAME.innerButton);
        });
    }

    /**@hidden */
    private _setFdpButtonsOptions(): void {
        if (!this._fdpButtons) {
            return;
        }

        this._fdpButtons.forEach((fdbButton) => {
            fdbButton.contentDensity = this._contentDensity;
            fdbButton.markForCheck();
        });
    }
}
