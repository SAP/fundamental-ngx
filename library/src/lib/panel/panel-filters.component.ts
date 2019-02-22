import { Component } from '@angular/core';

@Component({
    selector: 'fd-panel-filters',
    templateUrl: './panel-filters.component.html',
    host: {
        class: 'fd-panel__filters'
    },
    styles: [':host {display: block}']
})
export class PanelFiltersComponent {}
