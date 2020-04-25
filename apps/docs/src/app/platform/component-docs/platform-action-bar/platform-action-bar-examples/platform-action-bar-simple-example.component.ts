import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-platform-action-bar-simple-example',
    templateUrl: './platform-action-bar-simple-example.component.html',
    styleUrls: ['./platform-action-bar-simple-example.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlatformActionbarExamplesComponent implements OnInit {
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

    onItemClick(item: any) {
        alert(item.label);
    }
}
