import {
    Attribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    Output,
    Renderer2,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {
    ANY_LANGUAGE_LETTERS_REGEX,
    ColorAccent,
    Size,
    applyCssClass,
    getRandomColorAccent,
    CssClassBuilder
} from '@fundamental-ngx/cdk/utils';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FD_AVATAR_COMPONENT } from './tokens';
import { NgIf } from '@angular/common';

let avatarUniqueId = 0;

const ALTER_ICON_OPTIONS = {
    CONTENT: 'content',
    ALT: 'alt',
    BACKUP: 'backup',
    DEFAULT_ICON: 'default-icon'
};

@Component({
    selector: 'fd-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FD_AVATAR_COMPONENT,
            useExisting: AvatarComponent
        }
    ],
    host: {
        '[attr.tabindex]': '_tabindex'
    },
    standalone: true,
    imports: [NgIf]
})
export class AvatarComponent implements OnChanges, OnInit, CssClassBuilder, OnChanges {
    /** User's custom classes */
    @Input()
    class: string;

    /** Id of the Avatar. */
    @Input()
    @HostBinding('attr.id')
    id = `fd-avatar-${avatarUniqueId++}`;

    /** Aria-label for Avatar. */
    @Input()
    @HostBinding('attr.aria-label')
    @HostBinding('attr.alt')
    ariaLabel: Nullable<string> = null;

    /** Aria-Labelledby for element describing Avatar. */
    @Input()
    @HostBinding('attr.aria-labelledby')
    ariaLabelledby: Nullable<string> = null;

    /** Localized text for label */
    @Input()
    set label(value: Nullable<string>) {
        this.ariaLabel = value || null;
        this.abbreviate = this._getAbbreviate(value);
    }

    /** The size of the Avatar. Options include: *xs*, *s*, *m*, *l* and *xl*. */
    @Input() size: Size = 'l';

    /** The glyph name. */
    @Input() glyph: Nullable<string> = null;

    /** The glyph name for zoom icon. */
    @Input() zoomGlyph: Nullable<string> = null;

    /** Whether to apply a circle style to the Avatar. */
    @Input() circle = false;

    /** Whether to apply a transparent style to the Avatar. */
    @Input() transparent = false;

    /** Whether to apply background size contain style to the Avatar */
    @Input() contain = false;

    /** Whether to apply a placeholder background style to the Avatar. */
    @Input() placeholder = false;

    /** Whether to apply a tile background style to the Avatar. */
    @Input() tile = false;

    /** Whether to apply a border to the Avatar. */
    @Input() border = false;

    /** A number from 1 to 10 representing the background color of the Avatar. */
    @Input() colorAccent: Nullable<ColorAccent> = null;

    /** Whether to apply random background color to the Avatar. */
    @Input() random = false;

    /** Whether component should be focusable & clicable */
    @Input() clickable = false;

    /** Background image resource: url or base64. */
    @Input()
    set image(value: Nullable<string>) {
        this._setImage(value);
    }
    get image(): Nullable<string> {
        return this._image;
    }

    /** Backup options to use when image hasn't been loaded successfully.
     * Options separated with "|" symbol.
     * Possible options: content, alt, backup, default-icon
     */
    @Input()
    set alterIcon(value: Nullable<string>) {
        this._alterIcon = value;
    }
    get alterIcon(): Nullable<string> {
        return this._alterIcon;
    }

    /** Backup image to load when image hasn't been loaded successfully.
     * Only applicable when using alterIcon input property.
     */
    @Input()
    set backupImage(value: Nullable<string>) {
        this._backupImage = value;
    }
    get backupImage(): Nullable<string> {
        return this._backupImage;
    }

    /** Event emitted when avatar clicked. Only fires if clickable input property set to true. */
    @Output() avatarClicked = new EventEmitter<Event>();

    /** Event emitted when zoom icon clicked. Only fires if zoomGlyph input property is set. */
    @Output() zoomGlyphClicked = new EventEmitter<void>();

    /**
     * @hidden
     */
    set bgImage(image: Nullable<string>) {
        this._bgImage = image;

        this._renderer.setStyle(this.elementRef.nativeElement, 'background-image', image);
    }

    get bgImage(): Nullable<string> {
        return this._bgImage;
    }

    /** @hidden */
    @HostBinding('attr.role')
    get role(): string {
        return this.zoomGlyph ? 'button' : 'img';
    }

    /** @hidden */
    @ViewChild('content')
    set content(value: ElementRef) {
        this._content = value;
    }

    /** @hidden */
    abbreviate: Nullable<string> = null;

    /** @hidden */
    private _image: Nullable<string> = null;

    /** @hidden */
    private _alterIcon: Nullable<string> = null;

    /** @hidden */
    private _content: Nullable<ElementRef> = null;

    /** @hidden */
    private _backupImage: Nullable<string> = null;

    /** @hidden */
    private _bgImage: Nullable<string> = null;

    /** @hidden */
    get _tabindex(): number | null {
        if (this.hostTabindex != null) {
            return this.hostTabindex;
        }
        return this.clickable ? 0 : null;
    }

    /** If a default placeholder should be displayed */
    get showDefault(): boolean {
        return !this.abbreviate && !this._image && !this.glyph;
    }

    /** @hidden */
    constructor(
        public readonly elementRef: ElementRef,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _renderer: Renderer2,
        @Attribute('tabindex') private hostTabindex: number | null
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        if (this.zoomGlyph) {
            this.clickable = true;
        }
        this.buildComponentCssClass();
    }

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            'fd-avatar',
            this.size ? `fd-avatar--${this.size}` : '',
            this.colorAccent && !this.random ? `fd-avatar--accent-color-${this.colorAccent}` : '',
            this.random ? `fd-avatar--accent-color-${getRandomColorAccent()}` : '',
            this.circle ? 'fd-avatar--circle' : '',
            this.border ? 'fd-avatar--border' : '',
            this.transparent ? 'fd-avatar--transparent' : '',
            this.contain ? 'fd-avatar--background-contain' : '',
            this.placeholder ? 'fd-avatar--placeholder' : '',
            this.tile ? 'fd-avatar--tile' : '',
            this.class
        ];
    }

    /** @hidden */
    @HostListener('click', ['$event'])
    @HostListener('keydown.enter', ['$event'])
    @HostListener('keydown.space', ['$event'])
    _onClick(event: Event): void {
        if (this.clickable) {
            event.preventDefault();
            this.avatarClicked.emit(event);
            if (this.zoomGlyph) {
                this.zoomGlyphClicked.next();
            }
        }
    }

    /** @hidden */
    zoomClicked(event: Event): void {
        event.preventDefault();
        this.elementRef.nativeElement.focus();
        this.zoomGlyphClicked.next();
    }

    /** @hidden Get an abbreviate from the label or return null if not fit requirements */
    private _getAbbreviate(label: Nullable<string>): string | null {
        if (!label || this._image) {
            return null;
        }

        return this._generateAbbreviation(label);
    }

    /** @hidden Get the abbreviation string */
    private _generateAbbreviation(label: Nullable<string>): string | null {
        if (!label) {
            return null;
        }
        const maxLettersCount = 3;
        const firstLetters = label.split(' ').map((word) => word.charAt(0));
        const abbreviate = firstLetters.join('');

        if (firstLetters.length > maxLettersCount || !abbreviate.match(ANY_LANGUAGE_LETTERS_REGEX)) {
            return null;
        }

        return abbreviate;
    }

    /** @hidden */
    private _setImage(value: Nullable<string>): void {
        this._image = value;

        if (value) {
            this._verifyImageUrl(value, (): void => {}, this._onErrorCallback);
        } else {
            this.bgImage = null;
        }
    }

    /** @hidden */
    private _verifyImageUrl(srcValue: string, onLoadCallback: () => void, onErrorCallback: () => void): void {
        // Don't load the same image all the time check happens
        if (srcValue === this.bgImage) {
            return;
        }
        const img = new Image();
        img.onload = onLoadCallback.bind(this);
        img.onerror = onErrorCallback.bind(this);
        img.src = srcValue;
        this._assignBgImage(srcValue);
    }

    /** @hidden */
    private _assignBgImage(srcValue: Nullable<string>): void {
        this.bgImage = srcValue ? `url(${srcValue})` : null;
    }

    /** @hidden */
    private _onErrorCallback(): void {
        if (!this._alterIcon) {
            this._showDefaultIcon();
            return;
        }

        const options = this._alterIcon.split('|');
        for (let i = 0; i < options.length; i++) {
            const option = options[i];

            if (option === ALTER_ICON_OPTIONS.CONTENT) {
                const contentValue = this._content?.nativeElement.textContent;
                if (contentValue) {
                    this.abbreviate = this._generateAbbreviation(contentValue);
                    break;
                }

                continue;
            }

            if (option === ALTER_ICON_OPTIONS.ALT) {
                const altValue = this.elementRef.nativeElement.getAttribute('alt');
                if (altValue) {
                    this.abbreviate = this._generateAbbreviation(altValue);
                    break;
                }

                continue;
            }

            if (option === ALTER_ICON_OPTIONS.BACKUP) {
                if (this._backupImage && this._backupImage !== '') {
                    // Check if backupImage can be loaded successfully
                    // If not, set default user icon
                    this._verifyImageUrl(
                        this._backupImage,
                        () => {
                            this._assignBgImage(this._backupImage);
                        },
                        () => {
                            this._showDefaultIcon();
                        }
                    );
                    break;
                }

                continue;
            }

            if (option === ALTER_ICON_OPTIONS.DEFAULT_ICON) {
                this._showDefaultIcon();
                break;
            }

            this._showDefaultIcon();
        }
    }

    /** @hidden */
    private _showDefaultIcon(): void {
        this.abbreviate = null;
        this._image = null;
        this.glyph = null;
        this._cdr.markForCheck();
    }
}
