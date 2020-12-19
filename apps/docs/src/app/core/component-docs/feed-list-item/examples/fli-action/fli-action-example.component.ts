import { Component } from '@angular/core';

@Component({
    selector: 'fd-fli-action-example',
    templateUrl: './fli-action-example.component.html'
})
export class FliActionExampleComponent {
    onClick(): void {
        alert('You custom action');
    }
}
