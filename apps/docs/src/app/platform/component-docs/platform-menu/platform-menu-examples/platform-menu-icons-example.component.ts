import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FdpItem } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-platform-menu-icons-example',
    templateUrl: './platform-menu-icons-example.component.html',
    styleUrls: ['./platform-menu-icons-example.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlatformMenuIconsExampleComponent implements OnInit {
    iconMenuData: FdpItem[] = [];

    ngOnInit() {
        this.iconMenuData = [
            {
                label: 'First Item with add-on. Click on item to switch state.',
                command: () => {
                    alert('First');
                },
                selectable: true,
                selected: true
            },
            {
                label: 'Second Item with icon',
                command: () => {
                    alert('second');
                },
                icon: 'activity-items'
            },
            {
                label: 'Third Item with double-sided icons',
                command: () => {
                    alert('Third');
                },
                icon: 'vehicle-repair',
                secondaryIcon: 'sap-icon--grid'
            }
        ];
    }
}
