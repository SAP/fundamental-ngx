import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-platform-action-bar-positive-and-negative-action-example',
    templateUrl: './platform-action-bar-positive-and-negative-action-example.component.html',
    styleUrls: ['./platform-action-bar-positive-and-negative-action-example.component.scss']
})
export class PlatformActionbarWithPositiveNegativeActionsExampleComponent implements OnInit {
    actionItems: any[];
    constructor() {}

    ngOnInit() {
        this.actionItems = [
            {
                label: 'Approve',
                type: 'positive',
                priority: 1,
                options: 'emphasized'
            },
            {
                label: 'Reject',
                type: 'negative',
                priority: 2,
                options: 'emphasized'
            },
            {
                label: 'Delegate',
                type: 'primary',
                priority: 3,
                options: 'emphasized'
            }
        ];
    }

    onBackBuutonClick() {
        alert('Back button clicked');
    }

    onItemClick(item: any) {
        alert(item.label);
    }
}
