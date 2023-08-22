import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemingService } from '@fundamental-ngx/core/theming';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { NgFor } from '@angular/common';

@Component({
    selector: 'fd-theming-example',
    templateUrl: './theming-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgFor, ButtonModule]
})
export class ThemingExampleComponent {
    themes = this._themingService.getThemes();

    constructor(private _themingService: ThemingService) {}

    selectTheme(selectedTheme: string): void {
        this._themingService.setTheme(selectedTheme);
    }
}
