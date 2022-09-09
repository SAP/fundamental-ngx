import { Component, Input } from '@angular/core';

@Component({
    selector: 'fd-header-tabs',
    templateUrl: './header-tabs.component.html',
    styleUrls: ['./header-tabs.component.scss']
})
export class HeaderTabsComponent {
    @Input() hasI18n = false;
}
