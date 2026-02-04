import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    ElementRef,
    HostAttributeToken,
    inject,
    input,
    output,
    Renderer2,
    signal,
    viewChild,
    ViewEncapsulation
} from '@angular/core';
import {
    ANY_LANGUAGE_LETTERS_REGEX,
    ColorAccent,
    getRandomColorAccent,
    Nullable,
    Size
} from '@fundamental-ngx/cdk/utils';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconComponent, IconFont } from '@fundamental-ngx/core/icon';
import { AvatarIconPipe } from './avatar-icon.pipe';
import { AvatarValueStates } from './avatar-value-states.type';
import { FD_AVATAR_COMPONENT } from './tokens';

let avatarUniqueId = 0;

const ALTER_ICON_OPTIONS = {
    CONTENT: 'content',
    ALT: 'alt',
    BACKUP: 'backup',
    DEFAULT_ICON: 'default-icon'
};

export type IndicationColor = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

@Component({
    selector: 'fd-avatar',
    templateUrl: './avatar.component.html',
    styleUrl: './avatar.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FD_AVATAR_COMPONENT,
            useExisting: AvatarComponent
        }
    ],
    host: {
        '[class]': 'cssClass()',
        '[attr.tabindex]': 'tabindex()',
        '[attr.id]': 'id()',
        '[attr.aria-label]': 'ariaLabel()',
        '[attr.aria-labelledby]': 'ariaLabelledby()',
        '[attr.alt]': 'ariaLabel()',
        '[attr.role]': 'role()',
        '(click)': 'onClick($event)',
        '(keydown.enter)': 'onClick($event)',
        '(keydown.space)': 'onClick($event)'
    },
    imports: [AvatarIconPipe, IconComponent]
})
export class AvatarComponent {
    /** Id of the Avatar. */
    readonly id = input('fd-avatar-' + ++avatarUniqueId);

    /** Aria-label for Avatar. */
    readonly ariaLabel = input<string | null | undefined>(null);

    /** Aria-Labelledby for element describing Avatar. */
    readonly ariaLabelledby = input<string | null | undefined>(null);

    /** Localized text for label */
    readonly label = input<string | null | undefined>(null);

    /** The size of the Avatar. Options include: *xs*, *s*, *m*, *l* and *xl*. */
    readonly size = input<Size>('l');

    /** Font family of the icon. */
    readonly font = input<IconFont>(FD_DEFAULT_ICON_FONT_FAMILY);

    /** The glyph name. */
    readonly glyph = input<string | null | undefined>(null);

    /** The glyph name for zoom icon. */
    readonly zoomGlyph = input<string | null | undefined>(null);

    /** Whether to apply a circle style to the Avatar. */
    readonly circle = input(false, { transform: booleanAttribute });

    /** Whether the Avatar should be interactive. */
    readonly interactive = input(false, { transform: booleanAttribute });

    /** Whether to apply a transparent style to the Avatar. */
    readonly transparent = input(false, { transform: booleanAttribute });

    /** Whether to apply background size contain style to the Avatar */
    readonly contain = input(false, { transform: booleanAttribute });

    /** Whether to apply a placeholder background style to the Avatar. */
    readonly placeholder = input(false, { transform: booleanAttribute });

    /** Whether to apply a tile background style to the Avatar. */
    readonly tile = input(false, { transform: booleanAttribute });

    /** Whether to apply a border to the Avatar. */
    readonly border = input(false, { transform: booleanAttribute });

    /** A number from 1 to 10 representing the background color of the Avatar.
     * This property will override the colorIndication property.
     */
    readonly colorAccent = input<ColorAccent | null | undefined>(null);

    /** A number from 1 to 10 representing the background color of the Avatar using the Indication Colors. */
    readonly colorIndication = input<IndicationColor | null | undefined>(null);

    /** Whether to apply random background color to the Avatar. */
    readonly random = input(false, { transform: booleanAttribute });

    /** Whether component should be focusable & clicable */
    readonly clickable = input(false, { transform: booleanAttribute });

    /** Value state of the Avatar. */
    readonly valueState = input<AvatarValueStates | null | undefined>(null);

    /** Background image resource: url or base64. */
    readonly image = input<string | null | undefined>(null);

    /** Backup options to use when image hasn't been loaded successfully.
     * Options separated with "|" symbol.
     * Possible options: content, alt, backup, default-icon
     */
    readonly alterIcon = input<string | null | undefined>(null);

    /** Backup image to load when image hasn't been loaded successfully.
     * Only applicable when using alterIcon input property.
     */
    readonly backupImage = input<string | null | undefined>(null);

    /** Event emitted when avatar clicked. Only fires if clickable input property set to true. */
    readonly avatarClicked = output<Event>();

    /** Event emitted when zoom icon clicked. Only fires if zoomGlyph input property is set. */
    readonly zoomGlyphClicked = output<void>();

    /** @hidden */
    protected readonly content = viewChild<ElementRef>('content');

    /** @hidden Internal state for background image */
    protected readonly bgImage = signal<string | null | undefined>(null);

    /** @hidden Internal state for computed abbreviation */
    protected readonly abbreviate = signal<string | null | undefined>(null);

    /** @hidden Computed tabindex based on clickable state */
    protected readonly tabindex = computed(() => {
        if (this._hostTabindex != null) {
            return this._hostTabindex;
        }
        return this.clickable() ? 0 : null;
    });

    /** @hidden Computed role attribute */
    protected readonly role = computed(() => (this.zoomGlyph() || this.clickable() ? 'button' : 'img'));

    /** @hidden If a default placeholder should be displayed */
    protected readonly showDefault = computed(
        () =>
            // Show default if explicitly requested OR if no content is available
            this._shouldShowDefaultIcon() ||
            (!this.abbreviate() && !this._imageLoaded() && !this.glyph() && !this.image())
    );

    /** @hidden Computed CSS classes */
    protected readonly cssClass = computed(() => {
        const colorAccentValue = this.colorAccent();
        const randomValue = this.random();
        const colorIndicationValue = this.colorIndication();

        return [
            'fd-avatar',
            this.size() ? `fd-avatar--${this.size()}` : '',
            colorAccentValue && !randomValue ? `fd-avatar--accent-color-${colorAccentValue}` : '',
            randomValue ? `fd-avatar--accent-color-${this._randomColorAccent()}` : '',
            colorIndicationValue && colorAccentValue === null && !randomValue
                ? `fd-avatar--indication-color-${colorIndicationValue}`
                : '',
            this.circle() ? 'fd-avatar--circle' : '',
            this.border() ? 'fd-avatar--border' : '',
            this.interactive() ? 'fd-avatar--interactive' : '',
            this.transparent() ? 'fd-avatar--transparent' : '',
            this.contain() ? 'fd-avatar--background-contain' : '',
            this.placeholder() ? 'fd-avatar--placeholder' : '',
            this.tile() ? 'fd-avatar--tile' : ''
        ]
            .filter(Boolean)
            .join(' ');
    });

    /** @hidden Internal state tracking if image loaded successfully */
    private readonly _imageLoaded = signal(false);

    /** @hidden Explicitly track when to show default icon (for failed images with no fallback) */
    private readonly _shouldShowDefaultIcon = signal(false);

    /** @hidden Stored random color accent to prevent regeneration */
    private readonly _randomColorAccent = signal<ColorAccent>(getRandomColorAccent());

    /** @hidden */
    private readonly _elementRef = inject(ElementRef);

    /** @hidden */
    private readonly _renderer = inject(Renderer2);

    /** @hidden */
    private readonly _hostTabindex = inject(new HostAttributeToken('tabindex'), { optional: true });

    /** @hidden */
    constructor() {
        // Effect to handle image changes
        effect(() => {
            const imageValue = this.image();
            if (imageValue) {
                this._imageLoaded.set(false);
                this._shouldShowDefaultIcon.set(false); // Reset default icon flag
                this._verifyImageUrl(imageValue, this._onErrorCallback.bind(this));
            } else {
                this._imageLoaded.set(false);
                this._shouldShowDefaultIcon.set(false);
                this._setBgImage(null);
            }
        });

        // Effect to handle label changes and compute abbreviation
        effect(() => {
            const labelValue = this.label();
            // Only generate abbreviation from label if there's no successful image
            if (labelValue && !this._imageLoaded()) {
                const abbreviation = this._generateAbbreviation(labelValue);
                this.abbreviate.set(abbreviation);
            } else if (!labelValue && !this._imageLoaded()) {
                // Clear abbreviation when label is removed (if no image)
                this.abbreviate.set(null);
            }
        });

        // Effect to regenerate random color when random property changes
        effect(() => {
            if (this.random()) {
                this._randomColorAccent.set(getRandomColorAccent());
            }
        });

        // Effect to apply background image to DOM
        effect(() => {
            const bgImage = this.bgImage();
            this._renderer.setStyle(this._elementRef.nativeElement, 'background-image', bgImage);
        });
    }

    /** @hidden */
    protected onClick(event: Event): void {
        if (!this.clickable()) {
            return;
        }

        event.preventDefault();

        this.avatarClicked.emit(event);

        if (this.zoomGlyph()) {
            this.zoomGlyphClicked.emit();
        }
    }

    /** @hidden */
    protected zoomClicked(event: Event): void {
        event.preventDefault();
        this._elementRef.nativeElement.focus();
        this.zoomGlyphClicked.emit();
    }

    /** @hidden Get the abbreviation string */
    private _generateAbbreviation(label: Nullable<string>): string | null {
        if (!label) {
            return null;
        }

        const maxLettersCount = 3;
        const words = label.split(' ').filter((word) => word.length > 0);

        if (words.length === 0 || words.length > maxLettersCount) {
            return null;
        }

        const abbreviate = words.map((word) => word[0]).join('');

        return abbreviate.match(ANY_LANGUAGE_LETTERS_REGEX) ? abbreviate : null;
    }

    /** @hidden */
    private _setBgImage(srcValue: Nullable<string>): void {
        this.bgImage.set(srcValue ? `url(${srcValue})` : null);
    }

    /** @hidden */
    private _verifyImageUrl(srcValue: string, onErrorCallback: () => void): void {
        const newBgImage = `url(${srcValue})`;

        // Don't load the same image if it's already loaded successfully
        if (this.bgImage() === newBgImage && this._imageLoaded()) {
            return;
        }

        const img = new Image();
        img.onload = () => {
            // Only set background if image loads successfully
            this._setBgImage(srcValue);
            this._imageLoaded.set(true);
        };
        img.onerror = onErrorCallback;
        img.src = srcValue;
    }

    /** @hidden */
    private _onErrorCallback(): void {
        const alterIconValue = this.alterIcon();
        if (!alterIconValue) {
            this._showDefaultIcon();
            return;
        }

        const options = alterIconValue.split('|');
        for (const option of options) {
            if (option === ALTER_ICON_OPTIONS.CONTENT) {
                const contentValue = this.content()?.nativeElement.textContent;
                if (this._trySetAbbreviation(contentValue)) {
                    return;
                }
            } else if (option === ALTER_ICON_OPTIONS.ALT) {
                const altValue = this._elementRef.nativeElement.getAttribute('alt');
                if (this._trySetAbbreviation(altValue)) {
                    return;
                }
            } else if (option === ALTER_ICON_OPTIONS.BACKUP) {
                const backupImageValue = this.backupImage();
                if (backupImageValue) {
                    this._verifyImageUrl(backupImageValue, () => this._showDefaultIcon());
                    return;
                }
            } else if (option === ALTER_ICON_OPTIONS.DEFAULT_ICON) {
                this._showDefaultIcon();
                return;
            }
        }

        // Fallback if no valid option matched
        this._showDefaultIcon();
    }

    /** @hidden Helper to try setting abbreviation from text */
    private _trySetAbbreviation(text: string | null | undefined): boolean {
        if (!text) {
            return false;
        }
        const trimmedText = text.trim();
        if (!trimmedText) {
            return false;
        }
        const abbreviation = this._generateAbbreviation(trimmedText);
        if (abbreviation) {
            this.abbreviate.set(abbreviation);
            this._setBgImage(null); // Clear background image when using abbreviation
            return true;
        }
        return false;
    }

    /** @hidden */
    private _showDefaultIcon(): void {
        this.abbreviate.set(null);
        this._setBgImage(null);
        this._imageLoaded.set(false);
        this._shouldShowDefaultIcon.set(true);
    }
}
