import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'fd-panel-filters',
    templateUrl: './panel-filters.component.html',
    styles: [':host {display: block}']
})
export class PanelFiltersComponent {
    @HostBinding('class.fd-panel__filters') true;
}
