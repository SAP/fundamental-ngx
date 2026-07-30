import { Component } from '@angular/core';
import { TitleComponent } from '@fundamental-ngx/core/title';

@Component({
    selector: 'fd-title-wrapping-example',
    templateUrl: './title-wrapping-example.component.html',
    imports: [TitleComponent]
})
export class TitleWrappingExampleComponent {
    protected readonly longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor';
}
