import { ChangeDetectionStrategy, Component } from '@angular/core';

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
    selector: 'fdp-select-semantic-state-example',
    templateUrl: './platform-select-semantic-state-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformSelectSemanticStateExampleComponent {
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
        disabled: item.id === 'B',
        icon: ''
    }));
}
