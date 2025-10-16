import {
    Attribute,
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    computed,
    DestroyRef,
    effect,
    ElementRef,
    HostListener,
    inject,
    input,
    OnChanges,
    OnInit,
    output,
    Renderer2,
    signal,
    viewChild,
    ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    ANY_LANGUAGE_LETTERS_REGEX,
    applyCssClass,
    ColorAccent,
    CssClassBuilder,
    getRandomColorAccent,
    Nullable,
    Size
} from '@fundamental-ngx/cdk/utils';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconComponent } from '@fundamental-ngx/core/icon';
import { FD_LANGUAGE, FdLanguage, TranslationResolver } from '@fundamental-ngx/i18n';
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
        '[attr.id]': 'id()',
        '[attr.alt]': 'alt()',
        '[attr.tabindex]': 'tabindex()',
        '[attr.role]': 'zoomGlyph() ? "button" : "img"',
        '[attr.aria-label]': 'computedAriaLabel()',
        '[attr.aria-labelledby]': 'ariaLabelledby()'
    },
    imports: [AvatarIconPipe, IconComponent]
})
export class AvatarComponent implements OnChanges, OnInit, CssClassBuilder, OnChanges {
    /** User's custom classes */
    readonly class = input<string>();

    /** Id of the Avatar. */
    readonly id = input(`fd-avatar-${++avatarUniqueId}`);

    /** Alt attr for Avatar. */
    readonly alt = input<Nullable<string>>(null);

    /** Aria-label for Avatar. */
    readonly ariaLabel = input<Nullable<string>>(null);

    /** Aria-Labelledby for element describing Avatar. */
    readonly ariaLabelledby = input<Nullable<string>>(null);

    /** Localized text for label */
    readonly label = input<Nullable<string>>(null);

    /** The size of the Avatar. Options include: *xs*, *s*, *m*, *l* and *xl*. */
    readonly size = input<Size>('l');

    /** Font family of the icon. */
    readonly font = input<IconComponent['font']>(FD_DEFAULT_ICON_FONT_FAMILY);

    /** The glyph name. */
    readonly glyph = input<Nullable<string>>(null);

    /** The glyph name for zoom icon. */
    readonly zoomGlyph = input<Nullable<string>>(null);

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
    readonly colorAccent = input<Nullable<ColorAccent>>(null);

    /** A number from 1 to 10 representing the background color of the Avatar using the Indication Colors. */
    readonly colorIndication = input<Nullable<IndicationColor>>(null);

    /** Whether to apply random background color to the Avatar. */
    readonly random = input(false, { transform: booleanAttribute });

    /** Whether component should be focusable & clicable */
    readonly clickable = input(false, { transform: booleanAttribute });

    /** Value state of the Avatar. */
    readonly valueState = input<Nullable<AvatarValueStates>>(null);

    /** Background image resource: url or base64. */
    readonly image = input<Nullable<string>>(null);

    /** Backup options to use when image hasn't been loaded successfully.
     * Options separated with "|" symbol.
     * Possible options: content, alt, backup, default-icon
     */
    readonly alterIcon = input<Nullable<string>>(null);

    /** Backup image to load when image hasn't been loaded successfully.
     * Only applicable when using alterIcon input property.
     */
    readonly backupImage = input<Nullable<string>>(null);

    /** Event emitted when avatar clicked. Only fires if clickable input property set to true. */
    readonly avatarClicked = output<Event>();

    /** Event emitted when zoom icon clicked. Only fires if zoomGlyph input property is set. */
    readonly zoomGlyphClicked = output<void>();

    /** @hidden */
    readonly abbreviate = signal<string | null>(null);

    /** If a default placeholder should be displayed */
    protected showDefault = computed(() => !this.abbreviate() && !this._image() && !this.glyph());

    /** @hidden */
    protected computedAriaLabel = computed(() => {
        const ariaLabel = this.ariaLabel(); // user defined aria-label
        const label = this.label(); // user defined label
        const alt = this.alt(); // user defined alt attr
        const defaultLabel = this._defaultAriaLabel(); // default label

        if (ariaLabel) {
            // If user explicitly sets ariaLabel, use it as-is
            return ariaLabel;
        }

        if (label) {
            // If user provides label, prepend the default aria-label ('Avatar')
            return `${defaultLabel ?? ''} ${label}`.trim();
        }

        if (alt) {
            // If user provides alt, prepend the default aria-label ('Avatar')
            return `${defaultLabel ?? ''} ${alt}`.trim();
        }

        // Otherwise fallback to default label only
        return defaultLabel;
    });

    /** @hidden */
    protected tabindex = computed((): number | null => {
        if (this.hostTabindex != null) {
            return this.hostTabindex;
        }
        return this._clickable() ? 0 : null;
    });

    /** @hidden */
    private _contentRef = viewChild<ElementRef>('content');

    /** @hidden */
    private _glyph = signal<Nullable<string>>(null);

    /** @hidden */
    private _clickable = signal<Nullable<boolean>>(null);

    /** @hidden */
    private _image = signal<Nullable<string>>(null);

    /** @hidden */
    private _alterIcon = signal<Nullable<string>>(null);

    /** @hidden */
    private _content = signal<Nullable<ElementRef>>(null);

    /** @hidden */
    private _backupImage = signal<Nullable<string>>(null);

    /** @hidden */
    private _bgImage = signal<Nullable<string>>(null);

    /** @hidden */
    private _defaultAriaLabel = signal<Nullable<string>>(null);

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _lang$ = inject(FD_LANGUAGE);

    /** @hidden */
    private _translationResolver = new TranslationResolver();

    /** @hidden */
    constructor(
        public readonly elementRef: ElementRef,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _renderer: Renderer2,
        @Attribute('tabindex') private hostTabindex: number | null
    ) {
        effect(() => {
            this._glyph.set(this.glyph());
            this._clickable.set(this.clickable());
            this._alterIcon.set(this.alterIcon());
            this._backupImage.set(this.backupImage());
            this._content.set(this._contentRef());
            this._setImage(this.image());
            this._renderer.setStyle(this.elementRef.nativeElement, 'background-image', this._bgImage());
            this.abbreviate.set(this._getAbbreviate(this.label()));
        });
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
            this.size() ? `fd-avatar--${this.size()}` : '',
            this.colorAccent() && !this.random() ? `fd-avatar--accent-color-${this.colorAccent()}` : '',
            this.random() ? `fd-avatar--accent-color-${getRandomColorAccent()}` : '',
            this.colorIndication() && this.colorAccent() === null && !this.random()
                ? `fd-avatar--indication-color-${this.colorIndication()}`
                : '',
            this.circle() ? 'fd-avatar--circle' : '',
            this.border() ? 'fd-avatar--border' : '',
            this.interactive() ? 'fd-avatar--interactive' : '',
            this.transparent() ? 'fd-avatar--transparent' : '',
            this.contain() ? 'fd-avatar--background-contain' : '',
            this.placeholder() ? 'fd-avatar--placeholder' : '',
            this.tile() ? 'fd-avatar--tile' : '',
            this.class()
        ].filter(Boolean) as string[];
    }

    /** @hidden */
    @HostListener('click', ['$event'])
    @HostListener('keydown.enter', ['$event'])
    @HostListener('keydown.space', ['$event'])
    _onClick(event: Event): void {
        if (!this._clickable()) {
            return;
        }
        event.preventDefault();
        this.avatarClicked.emit(event);
        if (this.zoomGlyph()) {
            this.zoomGlyphClicked.emit();
        }
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
        this._lang$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((lang: FdLanguage) => {
            this._defaultAriaLabel.set(this._translationResolver.resolve(lang, 'coreAvatar.defaultLabel'));
        });
    }

    /** @hidden */
    ngOnChanges(): void {
        if (this.zoomGlyph()) {
            this._clickable.set(true);
        }
        this.buildComponentCssClass();
    }

    /** @hidden */
    protected zoomClicked(event: Event): void {
        event.preventDefault();
        this.elementRef.nativeElement.focus();
        this.zoomGlyphClicked.emit();
    }

    /** @hidden Get an abbreviate from the label or return null if not fit requirements */
    private _getAbbreviate(label: Nullable<string>): string | null {
        if (!label || this._image()) {
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
        this._image.set(value);

        if (value) {
            this._verifyImageUrl(value, (): void => {}, this._onErrorCallback);
        } else {
            this._bgImage.set(null);
        }
    }

    /** @hidden */
    private _verifyImageUrl(srcValue: string, onLoadCallback: () => void, onErrorCallback: () => void): void {
        if (srcValue === this._bgImage()) {
            return;
        }
        const img = new Image();
        img.onload = () => {
            this._assignBgImage(srcValue);
            onLoadCallback.call(this);
        };
        img.onerror = onErrorCallback.bind(this);
        img.src = srcValue;
    }

    /** @hidden */
    private _assignBgImage(srcValue: Nullable<string>): void {
        this._bgImage.set(srcValue ? `url(${srcValue})` : null);
    }

    /** @hidden */
    private _onErrorCallback(): void {
        if (!this._alterIcon()) {
            this._showDefaultIcon();
            return;
        }

        const options = this._alterIcon()?.split('|');

        if (options) {
            for (let i = 0; i < options.length; i++) {
                const option = options[i];

                if (option === ALTER_ICON_OPTIONS.CONTENT) {
                    const contentValue = this._content()?.nativeElement.textContent;
                    if (contentValue) {
                        this.abbreviate.set(this._generateAbbreviation(contentValue));
                        break;
                    }

                    continue;
                }

                if (option === ALTER_ICON_OPTIONS.ALT) {
                    if (this.alt()) {
                        this.abbreviate.set(this._generateAbbreviation(this.alt()));
                        break;
                    }

                    continue;
                }

                if (option === ALTER_ICON_OPTIONS.BACKUP) {
                    const backup = this._backupImage();
                    if (backup && backup !== '') {
                        this._verifyImageUrl(
                            backup,
                            () => this._assignBgImage(backup),
                            () => this._showDefaultIcon()
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
    }

    /** @hidden */
    private _showDefaultIcon(): void {
        this.abbreviate.set(null);
        this._image.set(null);
        this._glyph.set(null);
        this._cdr.markForCheck();
    }
}
