import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SelectItem } from '@fundamental-ngx/platform';

export class Fruit {
    id: string;
    name: string;
    age: number;
    icon: string;


    constructor(id: string, name: string, age: number, icon: string) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.icon = icon;
    }
}

@Component({
    selector: 'fdp-select-types-with-icon-example',
    templateUrl: './platform-select-types-with-icon-example.component.html'
})
export class PlatformSelectTypesWithIconExampleComponent implements OnInit {
    selectedValue: string;

    userList = [
        new Fruit('A', 'Apple', 10, 'photo-voltaic'),
        new Fruit('B', 'orange', 70, 'settings'),
        new Fruit('C', 'Plums', 10, 'database'),
        new Fruit('D', 'pineapple', 11, 'passenger-train'),
        new Fruit('E', 'watermelon', 10, 'world')
    ];
    option = this.userList.map<SelectItem>(item => {
        return {
            label: item.name + item.id,
            value: item,
            triggerValue: '( ' + item.id + ' )',
            disabled: item.id === 'B' ? true : false,
            icon: item.icon === '' ? '' : item.icon
        };
    });

    constructor() {}

    ngOnInit() {}
}
