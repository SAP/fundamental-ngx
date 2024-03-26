import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconComponent, IconFont } from '@fundamental-ngx/core/icon';

export type MessagePageType = '' | 'filter' | 'search' | 'no-items' | 'error';

@Component({
    selector: 'fd-message-page',
    templateUrl: './message-page.component.html',
    styleUrl: './message-page.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [IconComponent]
})
export class MessagePageComponent implements OnChanges, OnInit, CssClassBuilder {
    /** User's custom class */
    @Input()
    class: string;

    /**
     * The type of the Message Page.
     * Options include: filter, search, no-items, error and default.
     * Leave empty for default.
     */
    @Input()
    type: MessagePageType;

    /**
     * Whether the Message Page has an icon.
     * Set to true by default.
     * It's recommended to always show an icon with the Message Page.
     */
    @Input()
    hasIcon = true;

    /** Glyph font family */
    @Input()
    glyphFont: IconFont = FD_DEFAULT_ICON_FONT_FAMILY;

    /**
     * The icon of the Message Page.
     * The default icon is .sap-icon--documents.
     */
    @Input()
    set glyph(messagePageGlyph: string) {
        if (messagePageGlyph) {
            this._glyph = messagePageGlyph;
            this._getMessagePageIcon();
        }
    }

    /**
     * Getter method for the glyph property
     */
    get glyph(): string {
        return this._glyph;
    }

    /**
     * @hidden
     * The icon of the Message Page.
     */
    private _glyph = 'documents';

    /** @hidden */
    constructor(public readonly elementRef: ElementRef) {}

    /** @hidden
     * CssClassBuilder interface implementation
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return ['fd-message-page', this.class];
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
        this._getMessagePageIcon();
    }

    /**
     * @hidden
     * Determine the icon based on the Message Page type
     * If no type is specified, the default icon is 'documents'
     */
    private _getMessagePageIcon(): void {
        if (this.type) {
            switch (this.type) {
                case 'filter':
                    this._glyph = 'filter';
                    break;
                case 'search':
                    this._glyph = 'search';
                    break;
                case 'no-items':
                    this._glyph = 'product';
                    break;
                case 'error':
                    this._glyph = 'document';
                    break;
                default:
                    this._glyph = 'documents';
            }
        }
    }
}
