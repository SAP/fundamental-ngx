import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderTabsComponent } from '../../../shared/src/lib/core-helpers/header-tabs/header-tabs.component';
import { ImportComponent } from '../../../shared/src/lib/core-helpers/import/import.component';
import { DescriptionComponent } from '../../../shared/src/lib/core-helpers/description/description';
import { HeaderComponent } from '../../../shared/src/lib/core-helpers/header/header.component';

@Component({
    templateUrl: './breakpoint-header.component.html',
    standalone: true,
    imports: [HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent, RouterOutlet]
})
export class BreakpointHeaderComponent {
    constructor() {}
}
