import { Component } from '@angular/core';
import { ThemesService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-theme-url-example',
    templateUrl: './theme-url-example.component.html'
})

export class ThemeUrlExampleComponent {

    constructor(themesService: ThemesService) {
        themesService.setThemeByRoute('customQueryParam')
   }
}
