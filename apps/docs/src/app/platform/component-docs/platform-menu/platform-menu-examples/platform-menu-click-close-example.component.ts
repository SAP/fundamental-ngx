import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem, MenuGroup } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-platform-menu-click-close-example',
    templateUrl: './platform-menu-click-close-example.component.html',
    styleUrls: ['./platform-menu-click-close-example.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlatformMenuClickCloseExampleComponent implements OnInit {
    closeOnClickMenuData: (MenuItem | MenuGroup)[] = [];

    // boolean flag useed in conjunction with the popover's two-way binding property
    // that changes the state of the popover visibility
    isOpen = false;

    ngOnInit() {
        this.closeOnClickMenuData = [
            {
                label: 'First Item',
                command: () => {
                    alert('Menu will close after clicking first item');
                    this.isOpen = false;
                }
            },
            {
                label: 'Second Item',
                command: () => {
                    alert('Menu will close after clicking second item');
                    this.isOpen = false;
                }
            },
            {
                label: 'Third Item',
                command: () => {
                    alert('Menu will close after clicking third item');
                    this.isOpen = false;
                }
            }
        ];
    }
}
