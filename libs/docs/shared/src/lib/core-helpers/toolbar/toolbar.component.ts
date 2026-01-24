import { HttpClient } from '@angular/common/http';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    inject,
    output,
    untracked,
    viewChild
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CompleteThemeDefinition, ThemingService } from '@fundamental-ngx/core/theming';

import '@sap-ui/common-css/dist/sap-colors.css';
import '@sap-ui/common-css/dist/sap-display.css';
import '@sap-ui/common-css/dist/sap-flex.css';
import '@sap-ui/common-css/dist/sap-margin.css';

import { NgTemplateOutlet } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    ContentDensityDirective,
    ContentDensityMode,
    GlobalContentDensityService
} from '@fundamental-ngx/core/content-density';
import { IconComponent } from '@fundamental-ngx/core/icon';
import {
    MenuAddonDirective,
    MenuComponent,
    MenuInteractiveComponent,
    MenuItemComponent,
    MenuKeyboardService,
    MenuTitleDirective,
    MenuTriggerDirective,
    SubmenuComponent
} from '@fundamental-ngx/core/menu';
import {
    ShellbarActionsComponent,
    ShellbarComponent,
    ShellbarLogoComponent,
    ShellbarSidenavDirective,
    ShellbarSizes
} from '@fundamental-ngx/core/shellbar';
import { FD_LANGUAGE, FdLanguage } from '@fundamental-ngx/i18n';
import { BehaviorSubject, filter, fromEvent } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';
import { DocsService } from '../../services/docs.service';
import { Translations } from '../../tokens/translations.token';

const urlContains = (themeName: string, search: string): boolean => themeName.toLowerCase().includes(search);

const isHcb = (themeName: string): boolean => urlContains(themeName, 'hcb');
const isHcw = (themeName: string): boolean => urlContains(themeName, 'hcw');
const isDark = (themeName: string): boolean => urlContains(themeName, 'dark');

type Version = {
    id: string;
    url: string;
};

@Component({
    selector: 'fd-docs-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.scss',
    providers: [MenuKeyboardService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ShellbarComponent,
        ButtonComponent,
        ShellbarSidenavDirective,
        ContentDensityDirective,
        ShellbarLogoComponent,
        RouterLink,
        ShellbarActionsComponent,
        MenuComponent,
        MenuItemComponent,
        MenuInteractiveComponent,
        MenuTitleDirective,
        MenuAddonDirective,
        MenuTriggerDirective,
        SubmenuComponent,
        NgTemplateOutlet,
        IconComponent
    ]
})
export class ToolbarDocsComponent {
    /** Event emitted when the menu button is clicked */
    readonly btnClicked = output<void>();

    /** Reference to the theme menu component */
    protected readonly themeMenu = viewChild<MenuComponent>('themeMenu');

    /** Reference to the i18n menu component */
    protected readonly i18nMenu = viewChild<MenuComponent>('i18nMenu');

    /** Content density mode enum for template usage */
    protected readonly ContentDensityMode = ContentDensityMode;

    /** Translations for i18n menu as signal */
    protected readonly translations = toSignal(inject(Translations), { initialValue: [] });

    /** Available themes from theming service */
    protected readonly themes: CompleteThemeDefinition[];

    /** Current version information */
    protected readonly version: Version;

    /** Available versions from GitHub - fetched lazily */
    protected readonly versions = toSignal(
        inject(HttpClient).get<Version[]>('https://raw.githubusercontent.com/SAP/fundamental-ngx/main/versions.json'),
        { initialValue: [] }
    );

    /** Combined versions list including current version */
    protected readonly allVersions = computed(() => {
        const fetched = this.versions();
        const current = this.version;
        if (fetched.find((v) => v.id === current.id)) {
            return fetched;
        }
        return [current, ...fetched];
    });

    /** Initial theme to apply */
    protected readonly initialTheme = 'sap_horizon';

    /** CSS URL for highlight.js theme - computed from current theme */
    protected readonly highlightJsThemeCss = computed<SafeResourceUrl | null>(() => {
        const theme = this._currentTheme();
        if (!theme?.id) {
            return null;
        }
        return this._getHighlightThemeCss(theme.id);
    });

    /** Current shellbar size - computed from window width */
    protected readonly size = computed<ShellbarSizes>(() => {
        // Track window resize events
        this._windowWidth();
        return window.innerWidth < 768 ? 's' : 'm';
    });

    private readonly _contentDensityService = inject(GlobalContentDensityService);
    private readonly _themingService = inject(ThemingService);
    private readonly _langSubject$ = inject<BehaviorSubject<FdLanguage>>(FD_LANGUAGE);
    private readonly _domSanitizer = inject(DomSanitizer);
    private readonly _docsService = inject(DocsService);

    /** Current theme as a signal from the theming service */
    private readonly _currentTheme = toSignal(this._themingService.currentTheme.pipe(filter((theme) => !!theme)));

    /** Window resize events as a signal for triggering size recalculation */
    private readonly _windowWidth = toSignal(fromEvent(window, 'resize').pipe(startWith(null), debounceTime(60)), {
        initialValue: null
    });

    /** Flag to ensure translation is only set once */
    private _translationInitialized = false;

    constructor() {
        // Initialize version from docs service (readonly after construction)
        this.version = {
            id: this._docsService.getVersion(),
            url: ''
        };

        // Initialize themes from theming service (readonly after construction)
        this.themes = this._themingService.getThemes();
        this._themingService.setTheme(this.initialTheme);

        // Set initial English translation once when translations are loaded
        effect(() => {
            const langs = this.translations();
            if (langs.length > 0 && !this._translationInitialized) {
                const english = langs.find((lang) => lang.name === 'English');
                if (english) {
                    // Use untracked to avoid creating dependency on _translationInitialized
                    untracked(() => {
                        this._translationInitialized = true;
                        this._langSubject$.next(english.value);
                    });
                }
            }
        });
    }

    protected selectVersion(version: Version): void {
        window.open(version.url, '_blank');
    }

    protected selectTheme(themeId: string): void {
        this._themingService.setTheme(themeId);
    }

    protected selectTranslation(translation: FdLanguage): void {
        this._langSubject$.next(translation);
        this.i18nMenu()?.close();
    }

    protected selectDensity(density: ContentDensityMode): void {
        this._contentDensityService.updateContentDensity(density);
    }

    private _getHighlightThemeCss(themeName: string): SafeResourceUrl {
        let theme = 'googlecode.css';
        if (isHcb(themeName)) {
            theme = 'a11y-dark.css';
        } else if (isHcw(themeName)) {
            theme = 'a11y-light.css';
        } else if (isDark(themeName)) {
            theme = 'tomorrow-night.css';
        }
        return this._domSanitizer.bypassSecurityTrustResourceUrl(`assets/highlight-js-styles/${theme}`);
    }
}
