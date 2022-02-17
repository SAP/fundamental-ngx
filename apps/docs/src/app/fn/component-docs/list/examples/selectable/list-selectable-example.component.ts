import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fundamental-ngx-list-selectable-example',
    templateUrl: './list-selectable-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListSelectableExampleComponent {
    selectedItems = ['5'];
}
