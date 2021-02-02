import { Component } from '@angular/core';
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
    selector: 'fdp-select-mode-example',
    templateUrl: './platform-select-mode-example.component.html'
})
export class PlatformSelectModeExampleComponent {

   // options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];
    selectedValue1: string;
    selectedValue2: string;
    selectedValue3: string;
    selectedValue4: string;
    selectedValue5 = 'Apple';

    // addedOptions = 1;

    // addOption(): void {
    //     this.userList.push(new Fruit(`${this.addedOptions++}`, `New option ${this.addedOptions++}`, this.addedOptions++));
    //   // this.userList.push(`New option ${this.addedOptions++}`);
    // }

    // removeOption(): void {
    //     if (this.userList.length > 1) {
    //         this.userList.pop();
    //     }
    // }


    userList = [
        new Fruit('A', 'Apple', 10),
        new Fruit('B', 'orange', 70),
        new Fruit('C', 'Plums', 10),
        new Fruit('D', 'pineapple', 11),
        new Fruit('E', 'watermelon', 10)
    ];
    option = this.userList.map<SelectItem>((item) => {
        return {
            label: item.name + item.id,
            value: item,
            triggerValue: '( ' + item.id + ' )',
            disabled: item.id === 'B' ? true : false,
            icon: ''
        };
    });
}
