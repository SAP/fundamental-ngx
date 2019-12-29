import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { CssStyleBuilder, IHash, applyCssClass, CssClassBuilder, applyCssStyle } from '../utils/public_api';

export type ButtonType = 'standard' | 'positive' | 'medium' | 'negative' | 'half';
export type ButtonOptions = 'light' | 'emphasized' | 'menu';

/**
 * Button directive, used to enhance standard HTML buttons.
 *
 * ```html
 * <button fd-button>Button Text</button>
 * ```
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: `button[fd-button], a[fd-button]`,
    exportAs: 'fd-button',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./button.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit, CssClassBuilder, CssStyleBuilder {
    private _class: string = '';
    @Input() set class(userClass: string) {
        this._class = userClass;
        this.buildComponentCssClass();
    } // user's custom classes

    /** The icon to include in the button. See the icon page for the list of icons. */
    private _glyph: string
    @Input() set glyph(icon: string) {
        this._glyph = icon;
        this.buildComponentCssClass()
    };

    /** Defines if there will be added fd-button class. Enabled by default. */
    @Input() fdButtonClass: boolean = true;

    /** Whether to apply compact mode to the button. */
    @Input() compact: boolean;

    /** The type of the button. Types include 'standard', 'positive', 'medium', 'negative', 'half'.
     * Leave empty for default (Action button).'*/
    @Input() fdType: ButtonType;

    /** @hidden */
    @Input() semantic: string; // TODO: deprecated, leaving for backwards compatibility

    /** Button options.  Options include 'emphasized' and 'light'. Leave empty for default.' */
    @Input() options: ButtonOptions | ButtonOptions[];

    /** @hidden */
    @Input() size: string; // TODO: deprecated, leaving for backwards compatibility

    /** @hidden */
    _setProperties() {

    }

    /** @hidden */
    constructor(private _elementRef: ElementRef) {
    }

    ngOnInit() {
        this.buildComponentCssClass();
        this.buildComponentCssStyle();
    }

    @applyCssClass
    buildComponentCssClass(): string {
        return [
            this.fdButtonClass && 'fd-button',
            this.compact && 'fd-button--compact',
            this._glyph && `sap-icon--${this._glyph}`,
            this.fdType && `fd-button--${this.fdType}`,
            this.options && this.getOptionCssClass(this.options),
            this._class
        ].join(' ');
    }

    @applyCssStyle
    buildComponentCssStyle(): IHash {
        return {
        }
    }

    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    private getOptionCssClass(options: string | ButtonOptions[]): string {
        if (Array.isArray(this.options)) {
            return this.options.reduce((_class, option) => _class += ` fd-button--${option}`, ' ')
        }
        return `fd-button--${options}`
    }
}


