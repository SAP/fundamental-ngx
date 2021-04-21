import { Component } from '@angular/core';

@Component({
    selector: 'fd-notification-group-example',
    templateUrl: './notification-group-example.component.html'
})
export class NotificationGroupExampleComponent {
    expandedByDate = true;
    expandedByType1 = true;
    expandedByType2 = false;
    expandedByPriority = true;
}
