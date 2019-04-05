import { Component } from '@angular/core';

@Component({
    selector: 'fd-alert-header',
    templateUrl: './alert-header.component.html',
    styles: [`
        .fd-tabs {
            margin-bottom: 0;
            margin-top: 24px;
        }
        
        .fd-tabs__item {
            padding: 0;
            margin-right: 24px;
        }
        
        .fd-tabs__link {
            min-width: 60px;
            padding-right: 12px;
            padding-left: 12px;
            text-align: center;
        }
    `]
})
export class AlertHeaderComponent {

}
