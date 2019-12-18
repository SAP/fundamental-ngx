import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FdpItem } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-platform-menu-basic-example',
    templateUrl: './platform-menu-basic-example.component.html',
    styleUrls: ['./platform-menu-basic-example.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlatformMenuBasicExampleComponent implements OnInit {
    basicMenuData: FdpItem[] = [];

    ngOnInit() {
        this.basicMenuData = [
            {
                label: 'First Item',
                command: () => {
                    alert('First');
                }
            },
            {
                label: 'Second Item',
                command: () => {
                    alert('second');
                }
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
