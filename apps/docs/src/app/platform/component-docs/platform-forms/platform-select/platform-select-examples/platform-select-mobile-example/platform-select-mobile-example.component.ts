import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { OptionItem } from '@fundamental-ngx/platform/shared';
import { FdpSelectionChangeEvent } from '@fundamental-ngx/platform/form';

export class Fruit {
    id: string;
    name: string;
    age: number;

    constructor(id: string, name: string, age: number) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
}
@Component({
    selector: 'fdp-select-mobile-example',
    templateUrl: './platform-select-mobile-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformSelectMobileExampleComponent {
    userList = [
        new Fruit('A', 'Apple', 10),
        new Fruit('B', 'orange', 70),
        new Fruit('C', 'Plums', 10),
        new Fruit('D', 'pineapple', 11),
        new Fruit('E', 'watermelon', 10)
    ];
    option = this.userList.map<OptionItem>((item) => ({
        label: item.name + item.id,
        value: item.name,
        triggerValue: `(${item.id})`,
        icon: ''
    }));

    selectedItem = null;

    mobileConfig: MobileModeConfig = {
        title: 'Title',
        hasCloseButton: true,
        dialogConfig: {
            width: '360px',
            height: '440px'
        }
    };

    onSelect(item: FdpSelectionChangeEvent): void {
        this.selectedItem = item.payload;
    }
}
