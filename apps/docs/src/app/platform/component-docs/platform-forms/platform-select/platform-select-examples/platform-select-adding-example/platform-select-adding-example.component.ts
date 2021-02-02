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
    selector: 'fdp-select-adding-example',
    templateUrl: './platform-select-adding-example.component.html',
    styleUrls: ['./platform-select-adding-example.component.scss']
})
export class PlatformSelectAddingExampleComponent {

    selectedValue: string;

    addedOptions = 1;

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

    addOption(): void {
        this.option.push({label: `Option ${this.addedOptions++}`,
         value: Fruit, triggerValue: `(Option ${this.addedOptions})`,
          disabled: false, icon: ''}
        );
    }

    removeOption(): void {
        if (this.userList.length > 1) {
            this.option.pop();
        }
    }
}
