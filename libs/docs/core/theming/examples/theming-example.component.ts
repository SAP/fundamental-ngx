import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ThemingService } from '@fundamental-ngx/core/theming';

@Component({
    selector: 'fd-theming-example',
    templateUrl: './theming-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgFor, ButtonComponent]
})
export class ThemingExampleComponent {
    themes = this._themingService.getThemes();

    constructor(private _themingService: ThemingService) {}

    selectTheme(selectedTheme: string): void {
        this._themingService.setTheme(selectedTheme);
    }
}
