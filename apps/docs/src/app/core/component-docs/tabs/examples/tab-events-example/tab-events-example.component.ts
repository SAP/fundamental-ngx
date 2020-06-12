import { Component } from '@angular/core';

@Component({
    selector: 'fd-tab-events-example',
    templateUrl: './tab-events-example.component.html'
})
export class TabEventsExampleComponent {
    clickHandler(event: MouseEvent): void {
        console.log(event);
    }
}
