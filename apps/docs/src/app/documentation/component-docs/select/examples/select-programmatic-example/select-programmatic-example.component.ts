import { Component } from '@angular/core';

@Component({
  selector: 'fd-select-programmatic-example',
  templateUrl: './select-programmatic-example.component.html',
  styleUrls: ['./select-programmatic-example.component.scss']
})
export class SelectProgrammaticExampleComponent {

    value: any = 'tomato';

    changeValue() {
        if (this.value === 'tomato') {
            this.value = 'apple';
        } else {
            this.value = 'tomato';
        }
    }
}
