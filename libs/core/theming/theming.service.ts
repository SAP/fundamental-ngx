import { DOCUMENT } from '@angular/common';
import {
    DestroyRef,
    inject,
    Inject,
    Injectable,
    isDevMode,
    Optional,
    Renderer2,
    RendererFactory2
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Nullable, THEME_SWITCHER_ROUTER_MISSING_ERROR } from '@fundamental-ngx/cdk/utils';
import { cloneDeep, merge } from 'lodash-es';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BaseThemingConfig } from './config';
import {
    CompleteThemeDefinition,
    CompleteThemingResource,
    ThemeDefinition,
    ThemeStyleLink
} from './interfaces/theme.interface';
import { ThemingConfig } from './interfaces/theming-config.interface';
import { STANDARD_THEMES } from './standard-themes';
import { THEMING_CONFIG_TOKEN } from './tokens';

@Injectable()
export class ThemingService {
    /**
     * Theming configuration.
     */
    readonly config = new BaseThemingConfig();

    /**
     * Observable of the current theme, applied to the application.
     */
    get currentTheme(): Observable<CompleteThemeDefinition | null> {
        return this._currentThemeSubject.asObservable();
    }

    /** @hidden */
    private readonly _renderer: Renderer2;

    /** @hidden */
    private readonly _availableThemes: Map<string, CompleteThemeDefinition>;

    /** @hidden */
    private readonly _standardThemes: ThemeDefinition[] = [];

    /** @hidden **/
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _currentThemeSubject: BehaviorSubject<CompleteThemeDefinition | null> =
        new BehaviorSubject<CompleteThemeDefinition | null>(null);

    /**
     * @hidden
     */
    constructor(
        private _rendererFactory: RendererFactory2,
        @Inject(DOCUMENT) private _document: Document,
        @Optional() private _activatedRoute: ActivatedRoute,
        @Optional()
        @Inject(THEMING_CONFIG_TOKEN)
        private readonly _providedConfig: Partial<ThemingConfig>
    ) {
        this.config = merge(cloneDeep(this.config), cloneDeep(this._providedConfig));

        this._renderer = this._rendererFactory.createRenderer(this._document, null);

        if (!this.config.excludeDefaultThemes) {
            this._standardThemes = STANDARD_THEMES;
        }

        const mergedThemes = this._formatProvidedThemes(this.config.customThemes);

        this._availableThemes = new Map<string, CompleteThemeDefinition>(
            mergedThemes.map((theme) => [theme.id, theme])
        );

        const defaultTheme = this._availableThemes.get(this.config.defaultTheme);

        if (!defaultTheme) {
            return;
        }

        this._currentThemeSubject.next(defaultTheme);
    }

    /**
     * Initiates theme change based on query parameter or provided default theme in config.
     */
    init(): void {
        if (this.config.changeThemeOnQueryParamChange) {
            this._setThemeByRoute();
        } else if (this._currentThemeSubject.value?.id) {
            this.setTheme(this._currentThemeSubject.value.id);
        }
    }

    /**
     * Sets defined theme.
     * @param themeId ID of theme that needs to be used by the application.
     */
    setTheme(themeId: string): boolean {
        const theme = this._availableThemes.get(themeId);

        if (!theme) {
            console.warn(
                `Theme with ID '${themeId}' is not found. Please check if ID is correct or provide custom theme for ThemingModule.`
            );
            return false;
        }

        this._setThemeResource('base-theme', theme.theming.themingBasePath);
        this._setThemeResource('custom-theme', theme.theming.themePath);

        this._currentThemeSubject.next(theme);

        return true;
    }

    /**
     * Returns array of available themes.
     */
    getThemes(): CompleteThemeDefinition[] {
        return [...this._availableThemes].map((entry) => entry[1]);
    }

    /**
     * Returns current theme definition.
     */
    getCurrentTheme(): Nullable<ThemeDefinition> {
        return this._currentThemeSubject.value;
    }

    /**
     * @hidden
     * @param type
     * @param resourceUrl
     * @private
     */
    private _setThemeResource(type: ThemeStyleLink, resourceUrl: string): void {
        const linkElm = this._getStyleLinkElement(type);

        if (linkElm.getAttribute('href') === resourceUrl) {
            return;
        }

        this._renderer.setAttribute(linkElm, 'href', resourceUrl);
    }

    /**
     * @hidden
     * @param type
     * @private
     */
    private _getStyleLinkElement(type: ThemeStyleLink): HTMLLinkElement {
        const existingLinkElement = this._document.getElementById(this.config.themeStyleLinkIdentifiers[type]);

        if (existingLinkElement) {
            return existingLinkElement as HTMLLinkElement;
        }

        const newLinkElement = this._renderer.createElement('link');
        this._renderer.setAttribute(newLinkElement, 'rel', 'stylesheet');
        this._renderer.setAttribute(newLinkElement, 'id', this.config.themeStyleLinkIdentifiers[type]);
        this._renderer.appendChild(this._document.head, newLinkElement);

        return newLinkElement;
    }

    /**
     * @hidden
     * @param themes
     * @private
     */
    private _formatProvidedThemes(themes?: ThemeDefinition[]): CompleteThemeDefinition[] {
        themes = themes || [];
        const mergedThemes = [...this._standardThemes, ...themes];

        if (mergedThemes.length === 0 && isDevMode()) {
            console.error('Error. No themes were provided. Please check your configuration.');
        }

        return mergedThemes.map((theme) => {
            theme.theming = this._getThemingResourceConfig(theme);
            return theme;
        }) as CompleteThemeDefinition[];
    }

    /** @hidden */
    private _getThemingResourceConfig(theme: ThemeDefinition): CompleteThemingResource {
        const existingConfig = theme.theming || {};
        const defaultConfig: CompleteThemingResource = {
            themingBasePath: `assets/theming-base/${theme.id}/css_variables.css`,
            themePath: `assets/fundamental-styles-theming/${theme.id}.css`
        };

        return Object.assign(defaultConfig, existingConfig);
    }

    /** @hidden */
    private _getNativeParameterByName(paramName: string): string {
        paramName = paramName.replace(/[[\\\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + paramName + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(window.location.href);
        if (!results || !results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    /**
     * @hidden
     * Set theme according to additional URL parameter.
     * This parameter can be changed in function argument.
     **/
    private _setThemeByRoute(): void {
        const paramName = this.config.themeQueryParam;

        if (!this._activatedRoute) {
            throw new Error(THEME_SWITCHER_ROUTER_MISSING_ERROR);
        }

        this._activatedRoute.queryParams
            .pipe(
                takeUntilDestroyed(this._destroyRef),
                filter((param) => param && param[paramName])
            )
            .subscribe((param) => this.setTheme(param[paramName]));

        const nativeTheme = this._getNativeParameterByName(paramName) || this.config.defaultTheme;
        this.setTheme(nativeTheme);
    }
}
