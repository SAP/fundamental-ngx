import {
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input,
    HostBinding,
    ElementRef,
    ViewChild,
    ChangeDetectorRef,
    OnChanges
} from '@angular/core';
import { ANY_LANGUAGE_LETTERS_REGEX, applyCssClass, Size } from '@fundamental-ngx/core/utils';

export const AVATAR_COLORS = ['indigo', 'crimson', 'cyan', 'lime', 'pink', 'yellow', 'teal'] as const;

export type AvatarType = 'interactive' | 'circle' | 'thumbnail';
export type AvatarColor = typeof AVATAR_COLORS[number];

let avatarUniqueId = 0;

const ALTER_ICON_OPTIONS = {
    CONTENT: 'content',
    ALT: 'alt',
    BACKUP: 'backup',
    DEFAULT_ICON: 'default-icon'
};

@Component({
    selector: 'fn-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent implements OnInit, OnChanges {
    /** User's custom classes */
    @Input()
    class = '';

    /** Id of the Avatar. */
    @Input()
    @HostBinding('attr.id')
    id = `fn-avatar-${avatarUniqueId++}`;

    /** Aria-label for Avatar. */
    @Input()
    @HostBinding('attr.aria-label')
    ariaLabel: string;

    /** Aria-Labelledby for element describing Avatar. */
    @Input()
    @HostBinding('attr.aria-labelledby')
    ariaLabelledby: string;

    /** Localized text for label */
    @Input()
    set label(value: string) {
        this.ariaLabel = value;
        this._abbreviate = this._getAbbreviate(value);
    }

    /** The size of the Avatar. Options include: *xs*, *s*, *m*, *l* and *xl*. */
    @Input()
    size: Size = 'l';

    @Input()
    disabled = false;

    /** Whether to apply a circle style to the Avatar. */
    @Input()
    circle = false;

    /** Whether the Avatar component is interactive */
    @Input()
    interactive = false;

    /** The glyph name. */
    @Input()
    glyph: string | null;

    /** A number from 1 to 10 representing the background color of the Avatar. */
    @Input()
    color: AvatarColor = 'indigo';

    /** Background image resource: url or base64. */
    @Input()
    set image(value: string | null) {
        this._setImage(value);
    }
    get image(): string | null {
        return this._image;
    }

    @Input()
    set backupImage(value: string) {
        this._backupImage = value;
    }
    get backupImage(): string {
        return this._backupImage;
    }

    @Input()
    set alterIcon(value: string) {
        this._alterIcon = value;
    }
    get alterIcon(): string {
        return this._alterIcon;
    }

    /** @hidden */
    get bgImage(): string | null {
        return this._bgImage;
    }

    /** @hidden */
    @HostBinding('attr.role')
    get role(): string {
        return 'img';
    }

    @HostBinding('attr.tabindex')
    get tabindex(): number | null {
        return this.interactive && !this.disabled ? 0 : null;
    }

    /** @hidden */
    @ViewChild('content')
    set content(value: ElementRef) {
        this._content = value;
    }

    /** @hidden */
    _bgImage: string | null;

    /** @hidden */
    _abbreviate: string | null;

    /**
     * @hidden
     * Whether the Avatar component is a thumbnail
     */
    private _thumbnail = false;

    /** @hidden */
    private _image: string | null;

    /** @hidden */
    private _alterIcon: string;

    /** @hidden */
    private _content!: ElementRef;

    /** @hidden */
    private _backupImage: string;

    /** If a default placeholder should be displayed */
    get showDefault(): boolean {
        return !this._abbreviate && !this._image && !this.glyph;
    }

    /** @hidden */
    constructor(private _elementRef: ElementRef, private _cdr: ChangeDetectorRef) {}

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return [
            'fn-avatar',
            this.size ? `fn-avatar--${this.size}` : '',
            this.color ? `fn-avatar--${this.color}` : '',
            this._thumbnail ? 'fn-avatar--thumbnail' : '',
            this.interactive ? 'fn-avatar--interactive' : '',
            this.circle ? 'fn-avatar--circle' : '',
            this.class
        ];
    }

    /** @hidden */
    elementRef(): ElementRef {
        return this._elementRef;
    }

    /** @hidden Get an abbreviate from the label or return null if not fit requirements */
    private _getAbbreviate(label: string): string | null {
        if (!label || this._bgImage) {
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
    private _setImage(value: string | null): void {
        this._image = value;

        if (value) {
            this._verifyImageUrl(value, (): void => this._assignBgImage(value), this._onErrorCallback);
        } else {
            this._bgImage = null;
        }
    }

    /** @hidden */
    private _verifyImageUrl(srcValue: string, onLoadCallback: () => void, onErrorCallback: () => void): void {
        const img = new Image();
        img.onload = onLoadCallback.bind(this);
        img.onerror = onErrorCallback.bind(this);
        img.src = srcValue;
    }

    /** @hidden */
    private _assignBgImage(srcValue: string): void {
        this._bgImage = `url(${srcValue})`;
        this._thumbnail = true;
        this._cdr.detectChanges();
        this.buildComponentCssClass();
    }

    /** @hidden */
    private _onErrorCallback(): void {
        this._bgImage = null;
        if (!this._alterIcon) {
            this._showDefaultIcon();
        } else {
            const options = this._alterIcon.split('|');
            for (let i = 0; i < options.length; i++) {
                const option = options[i];

                if (option === ALTER_ICON_OPTIONS.CONTENT) {
                    const contentEl = this._content.nativeElement;
                    const contentValue = contentEl.innerText.trim()[0];
                    if (contentValue && contentValue !== '') {
                        this._abbreviate = this._getAbbreviate(contentEl.innerText.trim());
                        break;
                    }

                    continue;
                }

                if (option === ALTER_ICON_OPTIONS.ALT) {
                    const altValue = this.elementRef().nativeElement.getAttribute('alt');
                    if (altValue && altValue !== '') {
                        this._abbreviate = this._getAbbreviate(altValue.trim());
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
                                this._cdr.detectChanges();
                            },
                            () => {
                                this._showDefaultIcon();
                                this._cdr.detectChanges();
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

        this._cdr.detectChanges();
    }

    /** @hidden */
    private _showDefaultIcon(): void {
        this._abbreviate = null;
        this._image = null;
        this.glyph = null;
    }
}
