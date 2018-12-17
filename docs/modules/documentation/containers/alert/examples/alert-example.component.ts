import { Component } from '@angular/core';
@Component({
    selector: 'fd-alert-example',
    templateUrl: './alert-example.component.html'
})
export class AlertExampleComponent {

    showAlert(id: string) {
        alert(`Alert with id ${id} has triggered a close event!`);
    }

}
