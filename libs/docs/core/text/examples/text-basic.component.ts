import { Component } from '@angular/core';
import { TextComponent } from '@fundamental-ngx/core/text';

@Component({
    selector: 'fd-text-basic',
    templateUrl: './text-basic.component.html',
    imports: [TextComponent]
})
export class TextBasicComponent {
    protected readonly shortText = 'This is a basic text component displaying simple content.';
    protected readonly longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Aliquam vestibulum justo non dui viverra mattis. 
        Fusce venenatis tortor sit amet neque volutpat, eu mollis eros pulvinar.`;
}
