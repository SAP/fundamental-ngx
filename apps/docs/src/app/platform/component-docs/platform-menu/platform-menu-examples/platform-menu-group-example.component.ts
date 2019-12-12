import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FdpItem } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-platform-menu-group-example',
    templateUrl: './platform-menu-group-example.component.html',
    styleUrls: ['./platform-menu-group-example.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlatformMenuGroupExampleComponent implements OnInit {
    groupMenuData: FdpItem[] = [];
    ngOnInit() {
        this.groupMenuData = [
            {
                label: 'First Item',
                command: () => {
                    alert('First');
                }
            },
            {
                label: 'Second Item',
                groupItems: [
                    {
                        label: 'Item 1 in Group 1',
                        command: () => {
                            alert('Item 1 in Group 1 called');
                        }
                    },
                    {
                        label: 'Item 2 in Group 1',
                        command: () => {
                            alert('Item 2 in Group 1 called');
                        },
                        disabled: true
                    }
                ]
            },
            {
                label: 'Third Item',
                command: () => {
                    alert('Third');
                }
            }
        ];
    }
}
