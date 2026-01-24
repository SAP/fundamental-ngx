import { HttpClient } from '@angular/common/http';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    inject,
    Inject,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CompleteThemeDefinition, ThemingService } from '@fundamental-ngx/core/theming';

import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    ContentDensityDirective,
    ContentDensityMode,
    GlobalContentDensityService
} from '@fundamental-ngx/core/content-density';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { MenuComponent, MenuKeyboardService, MenuModule } from '@fundamental-ngx/core/menu';
import {
    ShellbarActionsComponent,
    ShellbarComponent,
    ShellbarLogoComponent,
    ShellbarSidenavDirective,
    ShellbarSizes
} from '@fundamental-ngx/core/shellbar';
import { FD_LANGUAGE, FdLanguage } from '@fundamental-ngx/i18n';
import { BehaviorSubject, filter, first, fromEvent, Subject, tap } from 'rxjs';
import { debounceTime, startWith, takeUntil } from 'rxjs/operators';
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
    styleUrls: ['./toolbar.component.scss'],
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
        MenuModule,
        NgTemplateOutlet,
        IconComponent,
        AsyncPipe
    ]
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

    size: ShellbarSizes = 'm';

    themes: CompleteThemeDefinition[];

    version: Version;

    versions: Version[];

    initialTheme = 'sap_horizon';

    translations$ = inject(Translations);

    /** An RxJS Subject that will kill the data stream upon destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _routerService: Router,
        private _contentDensityService: GlobalContentDensityService,
        private _themingService: ThemingService,
        @Inject(FD_LANGUAGE) private langSubject$: BehaviorSubject<FdLanguage>,
        private _route: ActivatedRoute,
        private _domSanitizer: DomSanitizer,
        private _docsService: DocsService,
        private _http: HttpClient
    ) {
        this.translations$
            .pipe(
                first(),
                tap((langs) => {
                    const english = langs.find((lang) => lang.name === 'English');
                    if (english) {
                        this.langSubject$.next(english.value);
                    }
                })
            )
            .subscribe();
        this.version = {
            id: this._docsService.getVersion(),
            url: ''
        };

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
