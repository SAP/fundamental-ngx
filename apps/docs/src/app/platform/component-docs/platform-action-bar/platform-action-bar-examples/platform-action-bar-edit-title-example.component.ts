import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-platform-action-bar-edit-title-example',
    templateUrl: './platform-action-bar-edit-title-example.component.html',
    styleUrls: ['./platform-action-bar-edit-title-example.component.scss']

})
export class PlatformActionbarEditTitleExampleComponent implements OnInit {
    actionItems: any[];
    constructor() {}

    ngOnInit() {
        this.actionItems = [
            {
                label: 'Rename',
                type: 'main',
                priority: 3,
                editTitle: true
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
