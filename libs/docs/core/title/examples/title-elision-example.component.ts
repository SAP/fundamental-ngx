import { Component } from '@angular/core';
import { TitleComponent } from '@fundamental-ngx/core/title';

@Component({
    selector: 'fd-title-elision-example',
    templateUrl: './title-elision-example.component.html',
    imports: [TitleComponent]
})
export class TitleElisionExampleComponent {
    protected readonly longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor';
}
