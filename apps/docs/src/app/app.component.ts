import { Component, OnInit } from '@angular/core';
import { ThemingService } from '@fundamental-ngx/core/theming';

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
    /** @hidden */
    constructor(private readonly _themingService: ThemingService) {}

    /** @hidden */
    ngOnInit(): void {
        this._themingService.init();
    }
}
