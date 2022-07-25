import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'fundamental-ngx-list-byline-default-example',
    templateUrl: './list-byline-default-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListBylineDefaultExampleComponent {
    selectedItems = ['1'];
    isSelected = false;

    selectedChange($event: string[] | string): void {
        console.log($event);
    }
}
