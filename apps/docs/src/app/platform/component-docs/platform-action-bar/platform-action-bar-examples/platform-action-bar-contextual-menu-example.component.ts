import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-platform-action-bar-contextual-menu-example',
    templateUrl: './platform-action-bar-contextual-menu-example.component.html',
    styleUrls: ['./platform-action-bar-contextual-menu-example.component.scss']
})
export class PlatformActionbarWithContextualMenuExampleComponent implements OnInit {
    actionItems: any[];
    constructor() {}

    ngOnInit() {
        this.actionItems = [
            {
                label: 'Save',
                type: 'main',
                priority: 1,
                callback: () => {
                    alert('Save');
                }
            },
            {
                label: 'Cancel',
                type: 'primary',
                priority: 2,
                callback: () => {
                    alert('Cancel');
                }
            },
            {
                label: 'Delete',
                type: 'primary',
                priority: 3,
                callback: () => {
                    alert('Delete');
                }
            },
            {
                label: 'Send',
                type: 'main',
                priority: 4,
                callback: () => {
                    alert('Send');
                }
            },
            {
                label: 'Share',
                type: 'main',
                priority: 5,
                callback: () => {
                    alert('Send');
                }
            },
            {
                label: 'test',
                type: 'main',
                priority: 6,
                callback: () => {
                    alert('test');
                }
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
