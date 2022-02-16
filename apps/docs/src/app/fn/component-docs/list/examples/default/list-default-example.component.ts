import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'fundamental-ngx-list-default-example',
    templateUrl: './list-default-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListDefaultExampleComponent {
    selectedItems = ['1'];
    isSelected = false;

    selectedChange($event: string[] | string): void {
        console.log($event);
    }
}
