import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ClickedDirective, FocusableItemDirective } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fd-fn-click-basic-example',
    templateUrl: './basic-example.component.html',
    standalone: true,
    imports: [FocusableItemDirective, ClickedDirective, JsonPipe]
})
export class BasicExampleComponent {
    fnClickEvent: any;
}
