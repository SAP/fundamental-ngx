import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'fdp-platform-action-bar-with-back-button-example',
    templateUrl: './platform-action-bar-with-back-button-example.component.html'

})
export class PlatformActionbarWithBackButtonExampleComponent implements OnInit {
    actionItems: any[];
    constructor() {}

    ngOnInit() {
        this.actionItems = [
            {
                label: 'Save',
                type: 'main',
                priority: 1
            },
            {
                label: 'Cancel',
                type: 'negative',
                priority: 2,
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
