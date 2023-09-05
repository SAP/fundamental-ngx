import { JsonPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ClickedBehaviorModule, FocusableItemDirective } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fd-fn-click-basic-example',
    templateUrl: './basic-example.component.html',
    standalone: true,
    imports: [FocusableItemDirective, ClickedBehaviorModule, NgIf, JsonPipe]
})
export class BasicExampleComponent {
    fnClickEvent: any;
}
