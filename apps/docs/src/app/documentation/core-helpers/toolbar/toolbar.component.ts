import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { CompleteThemeDefinition, ThemingService } from '@fundamental-ngx/core/theming';
import { environment } from '../../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { CURRENT_LIB, Libraries } from '../../utilities/libraries';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BehaviorSubject, filter, fromEvent, Subject } from 'rxjs';
import { debounceTime, startWith, takeUntil } from 'rxjs/operators';
import { MenuComponent, MenuKeyboardService } from '@fundamental-ngx/core/menu';
import { ContentDensity, ContentDensityService } from '@fundamental-ngx/core/utils';
import { ShellbarMenuItem, ShellbarSizes } from '@fundamental-ngx/core/shellbar';
import {
    FdLanguage,
    FD_LANGUAGE,
    FD_LANGUAGE_ALBANIAN,
    FD_LANGUAGE_BULGARIAN,
    FD_LANGUAGE_CHINESE,
    FD_LANGUAGE_CROATIAN,
    FD_LANGUAGE_CZECH,
    FD_LANGUAGE_ENGLISH,
    FD_LANGUAGE_FRENCH,
    FD_LANGUAGE_GEORGIAN,
    FD_LANGUAGE_GERMAN,
    FD_LANGUAGE_HEBREW,
    FD_LANGUAGE_HINDI,
    FD_LANGUAGE_ITALIAN,
    FD_LANGUAGE_POLISH,
    FD_LANGUAGE_PORTUGUESE,
    FD_LANGUAGE_ROMANIAN,
    FD_LANGUAGE_RUSSIAN,
    FD_LANGUAGE_SPANISH,
    FD_LANGUAGE_TURKISH,
    FD_LANGUAGE_UKRAINIAN
} from '@fundamental-ngx/i18n';

const urlContains = (themeName: string, search: string): boolean => themeName.toLowerCase().includes(search);

const isHcb = (themeName: string): boolean => urlContains(themeName, 'hcb');
const isHcw = (themeName: string): boolean => urlContains(themeName, 'hcw');
const isDark = (themeName: string): boolean => urlContains(themeName, 'dark');

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

    highlightJsThemeCss: SafeResourceUrl;

    library: Libraries;

    size: ShellbarSizes = 'm';

    themes: CompleteThemeDefinition[];

    version = {
        id: environment.version,
        url: ''
    };

    versions: any[];

    translations = [
        { name: 'Albanian', value: FD_LANGUAGE_ALBANIAN },
        { name: 'Български', value: FD_LANGUAGE_BULGARIAN },
        { name: '中国人', value: FD_LANGUAGE_CHINESE },
        { name: 'Hrvatski', value: FD_LANGUAGE_CROATIAN },
        { name: 'Český', value: FD_LANGUAGE_CZECH },
        { name: 'English', value: FD_LANGUAGE_ENGLISH },
        { name: 'Français', value: FD_LANGUAGE_FRENCH },
        { name: 'ქართული', value: FD_LANGUAGE_GEORGIAN },
        { name: 'Deutsch', value: FD_LANGUAGE_GERMAN },
        { name: 'עִברִית', value: FD_LANGUAGE_HEBREW },
        { name: 'Hindi', value: FD_LANGUAGE_HINDI },
        { name: 'Italiana', value: FD_LANGUAGE_ITALIAN },
        { name: 'Polski', value: FD_LANGUAGE_POLISH },
        { name: 'Português', value: FD_LANGUAGE_PORTUGUESE },
        { name: 'Română', value: FD_LANGUAGE_ROMANIAN },
        { name: 'Русский', value: FD_LANGUAGE_RUSSIAN },
        { name: 'Española', value: FD_LANGUAGE_SPANISH },
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
            name: 'Fiori Next Docs',
            callback: () => {
                this._routerService.navigate(['fn/home']);
            }
        }
    ];

    /** An RxJS Subject that will kill the data stream upon destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _routerService: Router,
        private _contentDensityService: ContentDensityService,
        private _themingService: ThemingService,
        @Inject(CURRENT_LIB) private _currentLib: Libraries,
        @Inject(FD_LANGUAGE) private langSubject$: BehaviorSubject<FdLanguage>,
        private _route: ActivatedRoute,
        private _domSanitizer: DomSanitizer
    ) {
        this._themingService.init();
        this.library = this._route.snapshot.data.library || 'core';

        this._themingService.currentTheme
            .pipe(
                takeUntil(this._onDestroy$),
                filter((theme) => !!theme)
            )
            .subscribe((theme) => {
                this.updateHighlightTheme(theme?.id as string);
            });
    }

    ngOnInit(): void {
        this.themes = this._themingService.getThemes();

        this.versions = [
            { id: '0.34.2', url: 'https://624793d2f1d02d000925c339--fundamental-ngx.netlify.app/' },
            { id: '0.33.2', url: 'https://620423a8f2458b000724fd5f--fundamental-ngx.netlify.app/' },
            { id: '0.32.0', url: 'https://6130e294b2dc5c00086828de--fundamental-ngx.netlify.app/' },
            { id: '0.31.0', url: 'https://6116c4d420b1d40007ce5fd9--fundamental-ngx.netlify.app/' },
            { id: '0.30.0', url: 'https://6099b79d6eba2400084bb441--fundamental-ngx.netlify.app/' },
            { id: '0.29.0', url: 'https://6040dbed0b78130008f102b5--fundamental-ngx.netlify.app/' },
            { id: '0.28.0', url: 'https://60386a93e4a7010007247f23--fundamental-ngx.netlify.app/' },
            { id: '0.27.0', url: 'https://602a61e08b3cf200074fa0b5--fundamental-ngx.netlify.app/' },
            { id: '0.26.0', url: 'https://600860290fee570007d7f660--fundamental-ngx.netlify.app/' },
            { id: '0.25.1', url: 'https://5fdb2c4892110a00080b0895--fundamental-ngx.netlify.app/' },
            { id: '0.24.1', url: 'https://5fbd1c1239f44a000736c439--fundamental-ngx.netlify.app/' },
            { id: '0.23.0', url: 'https://5f96ff4047c5f300070eb8a1--fundamental-ngx.netlify.app/' },
            { id: '0.22.0', url: 'https://5f776fb812cfa300086de86a--fundamental-ngx.netlify.app/' },
            { id: '0.21.0', url: 'https://5f355f63718e9200075585e1--fundamental-ngx.netlify.app/' },
            { id: '0.20.0', url: 'https://5f0630964a7a370007f93dc4--fundamental-ngx.netlify.app/' },
            { id: '0.19.0', url: 'https://5ef288ca158ebd0008946f4d--fundamental-ngx.netlify.app/' },
            { id: '0.18.0', url: 'https://5ec04b7f46b9bd000648f8ec--fundamental-ngx.netlify.app/' },
            { id: '0.17.0', url: 'https://5e9a135cc7c8e90006047bdf--fundamental-ngx.netlify.app/' },
            { id: '0.16.0', url: 'https://5e97032838070600063141e4--fundamental-ngx.netlify.app/' },
            { id: '0.15.0', url: 'https://5e5fe7518009de0008f41fff--fundamental-ngx.netlify.app/' },
            { id: '0.14.0', url: 'https://5e4f1d0714bc4c000ae3282d--fundamental-ngx.netlify.app/' },
            { id: '0.13.0', url: 'https://5e25d4d1837fae0009b5c4fa--fundamental-ngx.netlify.app/' },
            { id: '0.12.0', url: 'https://5db1dc978d2a340009a82d64--fundamental-ngx.netlify.app/' },
            { id: '0.11.0', url: 'https://5d8a3409acaf8d00070ccd64--fundamental-ngx.netlify.app/' }
        ];

        this.versions.unshift(this.version);

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
    }

    selectDensity(density: ContentDensity): void {
        this._contentDensityService.contentDensity.next(density);
    }

    private trustedResourceUrl = (url: string): SafeResourceUrl =>
        this._domSanitizer.bypassSecurityTrustResourceUrl(url);

    private _getShellbarSize(): ShellbarSizes {
        const width = window.innerWidth;
        return width < 768 ? 's' : 'm';
    }
}
