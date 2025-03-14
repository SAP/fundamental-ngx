import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { JsonPipe } from '@angular/common';
import { FdpSelectionChangeEvent, PlatformSelectModule } from '@fundamental-ngx/platform/form';
import { OptionItem } from '@fundamental-ngx/platform/shared';

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
    selector: 'fdp-platform-select-nowrap-example',
    templateUrl: './platform-select-nowrap-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [PlatformSelectModule, JsonPipe]
})
export class PlatformSelectNoWrapExampleComponent {
    selectedValue: string;

    userList = [
        new Fruit('A', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. ', 10),
        new Fruit(
            'B',
            'Minus eligendi dolore omnis veritatis! Et voluptatibus error, commodi, henderit perspiciatis ',
            70
        ),
        new Fruit('C', 'Plums', 10),
        new Fruit('D', 'itis fuga sequi eveniet perspiciatis? Velit officiis sunt, debitis eum perspiciatis', 11),
        new Fruit('E', 's. Similique vel ipsam debitis fuga sequi eveniet perspiciatis? Velit officiis sunt, d', 10)
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
