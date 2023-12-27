import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompleteThemeDefinition, ThemingService } from '@fundamental-ngx/core/theming';
import { CURRENT_LIB, Libraries } from '../../utilities';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContentDensityMode, GlobalContentDensityService } from '@fundamental-ngx/core/content-density';
import { MenuComponent, MenuKeyboardService } from '@fundamental-ngx/core/menu';
import { ShellbarMenuItem, ShellbarSizes } from '@fundamental-ngx/core/shellbar';
import {
    FD_LANGUAGE,
    FD_LANGUAGE_ALBANIAN,
    FD_LANGUAGE_ARABIC,
    FD_LANGUAGE_BULGARIAN,
    FD_LANGUAGE_CHINESE,
    FD_LANGUAGE_CHINESE_TRADITIONAL,
    FD_LANGUAGE_CROATIAN,
    FD_LANGUAGE_CZECH,
    FD_LANGUAGE_DANISH,
    FD_LANGUAGE_DUTCH,
    FD_LANGUAGE_ENGLISH,
    FD_LANGUAGE_FINNISH,
    FD_LANGUAGE_FRENCH,
    FD_LANGUAGE_GEORGIAN,
    FD_LANGUAGE_GERMAN,
    FD_LANGUAGE_GREEK,
    FD_LANGUAGE_HEBREW,
    FD_LANGUAGE_HINDI,
    FD_LANGUAGE_HUNGARIAN,
    FD_LANGUAGE_ITALIAN,
    FD_LANGUAGE_JAPANESE,
    FD_LANGUAGE_KAZAKH,
    FD_LANGUAGE_KOREAN,
    FD_LANGUAGE_MALAY,
    FD_LANGUAGE_NORWEGIAN,
    FD_LANGUAGE_POLISH,
    FD_LANGUAGE_PORTUGUESE,
    FD_LANGUAGE_ROMANIAN,
    FD_LANGUAGE_RUSSIAN,
    FD_LANGUAGE_SERBIAN,
    FD_LANGUAGE_SLOVAK,
    FD_LANGUAGE_SLOVENIAN,
    FD_LANGUAGE_SPANISH,
    FD_LANGUAGE_SWEDISH,
    FD_LANGUAGE_THAI,
    FD_LANGUAGE_TURKISH,
    FD_LANGUAGE_UKRAINIAN,
    FdLanguage
} from '@fundamental-ngx/i18n';
import { BehaviorSubject, Subject, filter, fromEvent } from 'rxjs';
import { debounceTime, startWith, takeUntil } from 'rxjs/operators';
import { DocsService } from '../../services/docs.service';

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
    styleUrls: ['./toolbar.component.scss'],
    providers: [MenuKeyboardService]
})
export class ToolbarDocsComponent implements OnInit, OnDestroy {
    @Output()
    btnClicked: EventEmitter<undefined> = new EventEmitter<undefined>();

    @ViewChild('themeMenu')
    themeMenu: MenuComponent;

    @ViewChild('i18nMenu')
    i18nMenu: MenuComponent;

    ContentDensityMode = ContentDensityMode;

    highlightJsThemeCss: SafeResourceUrl;

    library: Libraries;

    size: ShellbarSizes = 'm';

    themes: CompleteThemeDefinition[];

    version: Version;

    versions: Version[];

    initialTheme = 'sap_horizon';

    translations = [
        { name: 'Shqip', value: FD_LANGUAGE_ALBANIAN },
        { name: 'العربية', value: FD_LANGUAGE_ARABIC },
        { name: 'Български', value: FD_LANGUAGE_BULGARIAN },
        { name: '简体中文', value: FD_LANGUAGE_CHINESE },
        { name: '繁體中文', value: FD_LANGUAGE_CHINESE_TRADITIONAL },
        { name: 'Hrvatski', value: FD_LANGUAGE_CROATIAN },
        { name: 'Český', value: FD_LANGUAGE_CZECH },
        { name: 'Dansk', value: FD_LANGUAGE_DANISH },
        { name: 'Nederlands', value: FD_LANGUAGE_DUTCH },
        { name: 'English', value: FD_LANGUAGE_ENGLISH },
        { name: 'Suomi', value: FD_LANGUAGE_FINNISH },
        { name: 'Français', value: FD_LANGUAGE_FRENCH },
        { name: 'ქართული', value: FD_LANGUAGE_GEORGIAN },
        { name: 'Deutsch', value: FD_LANGUAGE_GERMAN },
        { name: 'Ελληνικά', value: FD_LANGUAGE_GREEK },
        { name: 'עִברִית', value: FD_LANGUAGE_HEBREW },
        { name: 'हिन्दी', value: FD_LANGUAGE_HINDI },
        { name: 'Magyar', value: FD_LANGUAGE_HUNGARIAN },
        { name: 'Italiano', value: FD_LANGUAGE_ITALIAN },
        { name: '日本語', value: FD_LANGUAGE_JAPANESE },
        { name: 'Қазақ тілі', value: FD_LANGUAGE_KAZAKH },
        { name: '한국인', value: FD_LANGUAGE_KOREAN },
        { name: 'Melayu', value: FD_LANGUAGE_MALAY },
        { name: 'Norsk', value: FD_LANGUAGE_NORWEGIAN },
        { name: 'Polski', value: FD_LANGUAGE_POLISH },
        { name: 'Português(Brazil)', value: FD_LANGUAGE_PORTUGUESE },
        { name: 'Română', value: FD_LANGUAGE_ROMANIAN },
        { name: 'Русский', value: FD_LANGUAGE_RUSSIAN },
        { name: 'Српски', value: FD_LANGUAGE_SERBIAN },
        { name: 'Slovenský', value: FD_LANGUAGE_SLOVAK },
        { name: 'Slovenščina', value: FD_LANGUAGE_SLOVENIAN },
        { name: 'Español', value: FD_LANGUAGE_SPANISH },
        { name: 'Svenska', value: FD_LANGUAGE_SWEDISH },
        { name: 'แบบไทย', value: FD_LANGUAGE_THAI },
        { name: 'Türkçe', value: FD_LANGUAGE_TURKISH },
        { name: 'Українська', value: FD_LANGUAGE_UKRAINIAN }
    ];

    items: ShellbarMenuItem[] = [
        {
            name: 'Core Docs',
            callback: () => {
                this._routerService.navigate(['core/home']);
            }
        },
        {
            name: 'Platform Docs',
            callback: () => {
                this._routerService.navigate(['platform/home']);
            }
        },
        {
            name: 'CX',
            callback: () => {
                this._routerService.navigate(['cx/home']);
            }
        },
        {
            name: 'CDK',
            callback: () => {
                this._routerService.navigate(['cdk/home']);
            }
        }
    ];

    /** An RxJS Subject that will kill the data stream upon destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _routerService: Router,
        private _contentDensityService: GlobalContentDensityService,
        private _themingService: ThemingService,
        @Inject(CURRENT_LIB) private _currentLib: Libraries,
        @Inject(FD_LANGUAGE) private langSubject$: BehaviorSubject<FdLanguage>,
        private _route: ActivatedRoute,
        private _domSanitizer: DomSanitizer,
        private _docsService: DocsService,
        private _http: HttpClient
    ) {
        this.library = this._route.snapshot.data['library'] || 'core';

        this._themingService.currentTheme
            .pipe(
                takeUntil(this._onDestroy$),
                filter((theme) => !!theme)
            )
            .subscribe((theme) => {
                this.updateHighlightTheme(theme?.id as string);
            });
        this.version = {
            id: this._docsService.getPackageJson().version,
            url: ''
        };
    }

    ngOnInit(): void {
        this.themes = this._themingService.getThemes();
        this._themingService.setTheme(this.initialTheme);

        this._setVersions();

        fromEvent(window, 'resize')
            .pipe(startWith(1), debounceTime(60), takeUntil(this._onDestroy$))
            .subscribe(() => (this.size = this._getShellbarSize()));
    }

    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    updateHighlightTheme(themeName: string): void {
        let theme = 'googlecode.css';
        if (isHcb(themeName)) {
            theme = 'a11y-dark.css';
        } else if (isHcw(themeName)) {
            theme = 'a11y-light.css';
        } else if (isDark(themeName)) {
            theme = 'tomorrow-night.css';
        }
        this.highlightJsThemeCss = this.trustedResourceUrl(`assets/highlight-js-styles/${theme}`);
    }

    selectVersion(version: any): void {
        window.open(version.url, '_blank');
    }

    selectTheme(themeId: string): void {
        this._themingService.setTheme(themeId);
        this.updateHighlightTheme(themeId);
    }

    selectTranslation(translation: FdLanguage): void {
        this.langSubject$.next(translation);
        this.i18nMenu.close();
    }

    selectDensity(density: ContentDensityMode): void {
        this._contentDensityService.updateContentDensity(density);
    }

    private _setVersions(): void {
        this._http
            .get<Version[]>('https://raw.githubusercontent.com/SAP/fundamental-ngx/main/versions.json')
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((versions) => {
                this.versions = versions;

                if (this.versions.find((version) => version.id === this.version.id)) {
                    return;
                }

                this.versions.unshift(this.version);
            });
    }

    private trustedResourceUrl = (url: string): SafeResourceUrl =>
        this._domSanitizer.bypassSecurityTrustResourceUrl(url);

    private _getShellbarSize(): ShellbarSizes {
        const width = window.innerWidth;
        return width < 768 ? 's' : 'm';
    }
}
