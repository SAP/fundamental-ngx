import { Component } from '@angular/core';
import { NgIf, JsonPipe } from '@angular/common';
import { ClickedBehaviorModule } from '@fundamental-ngx/cdk/utils';
import { FocusableItemDirective } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fd-fn-click-basic-example',
    templateUrl: './basic-example.component.html',
    standalone: true,
    imports: [FocusableItemDirective, ClickedBehaviorModule, NgIf, JsonPipe]
})
export class BasicExampleComponent {
    fnClickEvent: any;
}
