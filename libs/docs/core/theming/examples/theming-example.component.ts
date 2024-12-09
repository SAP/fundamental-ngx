import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CompleteThemeDefinition, ThemingService } from '@fundamental-ngx/core/theming';

@Component({
    selector: 'fd-theming-example',
    templateUrl: './theming-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent]
})
export class ThemingExampleComponent {
    themes: CompleteThemeDefinition[];

    constructor(private _themingService: ThemingService) {
        this.themes = this._themingService.getThemes();
    }

    selectTheme(selectedTheme: string): void {
        this._themingService.setTheme(selectedTheme);
    }
}
