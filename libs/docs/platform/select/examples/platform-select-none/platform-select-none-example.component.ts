import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

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
    selector: 'fdp-select-none-example',
    templateUrl: './platform-select-none-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformSelectNoneExampleComponent {
    selectedValue: string;

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

    onSelect(item: FdpSelectionChangeEvent): void {
        if (item) {
            this.selectedValue = item.payload;
        }
    }
}
