import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FdpSelectionChangeEvent, PlatformSelectModule, SelectOptionItem } from '@fundamental-ngx/platform/form';

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
    selector: 'fdp-platform-select-mode-example',
    templateUrl: './platform-select-mode-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [PlatformSelectModule, ContentDensityDirective]
})
export class PlatformSelectModeExampleComponent {
    userList = [
        new Fruit('A', 'Apple', 10),
        new Fruit('B', 'orange', 70),
        new Fruit('C', 'Plums', 10),
        new Fruit('D', 'pineapple', 11),
        new Fruit('E', 'watermelon', 10)
    ];
    option = this.userList.map<SelectOptionItem>((item) => ({
        label: item.name + item.id,
        value: item.name,
        disabled: item.id === 'B',
        icon: ''
    }));

    selectedValue1 = null;
    selectedValue3 = this.option[4].label;
    selectedValue4 = this.option[3].label;

    onSelect1(item: FdpSelectionChangeEvent): void {
        this.selectedValue1 = item.payload;
    }
}
