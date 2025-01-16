import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { CompleteThemeDefinition, THEMING_CONFIG_TOKEN, ThemingService } from '@fundamental-ngx/core/theming';

@Component({
    selector: 'fd-theming-url-example',
    templateUrl: './theming-url-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    // Added for example purposes only. For real usage please use ThemingService.withConfig()
    providers: [
        ThemingService,
        {
            provide: THEMING_CONFIG_TOKEN,
            useValue: { themeQueryParam: 'customQueryParam' }
        }
    ],
    imports: [ButtonComponent, FormLabelComponent, JsonPipe]
})
export class ThemingUrlExampleComponent {
    themes: CompleteThemeDefinition[];
    themeFromUrl: CompleteThemeDefinition | null;

    constructor(
        private _themingService: ThemingService,
        private _router: Router
    ) {
        this._themingService.init();
        this.themes = this._themingService.getThemes();

        this._themingService.currentTheme.subscribe((theme) => {
            this.themeFromUrl = theme;
        });
    }

    async changeQueryUrl(param: string): Promise<void> {
        await this._router.navigate([], { queryParams: { customQueryParam: param } });
    }
}
