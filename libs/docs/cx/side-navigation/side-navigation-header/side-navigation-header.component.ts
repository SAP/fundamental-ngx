import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-side-navigation-header',
    templateUrl: './side-navigation-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavigationHeaderComponent {}
