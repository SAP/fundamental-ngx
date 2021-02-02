import { Component} from '@angular/core';
import { SelectItem } from '@fundamental-ngx/platform';

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
    selector: 'fdp-select-custom-trigger',
    templateUrl: './platform-select-custom-trigger.component.html',
    styleUrls: ['./platform-select-custom-trigger.component.scss']
})
export class PlatformSelectCustomTriggerComponent {

    selectedValue: string;
     selected: string;

    userList = [
        new Fruit('A', 'Apple', 10),
        new Fruit('B', 'orange', 70),
        new Fruit('C', 'Plums', 10),
        new Fruit('D', 'pineapple', 11),
        new Fruit('E', 'watermelon', 10)
    ];
    option = this.userList.map<SelectItem>((item) => {
       this.selected = item.id;
        return {
            label: item.name + item.id,
            value: item,
            triggerValue: '( ' + item.id + ' )',
            disabled: item.id === 'B' ? true : false,
            icon: ''
        };
    });
}
