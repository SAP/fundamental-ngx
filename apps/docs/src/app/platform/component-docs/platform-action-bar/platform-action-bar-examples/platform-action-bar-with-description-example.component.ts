import { Component, OnInit, ViewEncapsulation} from '@angular/core';
@Component({
    selector: 'fdp-platform-action-bar-with-description-example',
    templateUrl: './platform-action-bar-with-description-example.component.html',
    styleUrls: ['./platform-action-bar-with-description-example.component.scss']

})
export class PlatformActionbarWithDescriptionExampleComponent implements OnInit {
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
