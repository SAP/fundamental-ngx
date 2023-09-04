import { Component } from '@angular/core';
import { TextComponent } from '@fundamental-ngx/core/text';

@Component({
    selector: 'fd-text-basic',
    templateUrl: './text-basic.component.html',
    standalone: true,
    imports: [TextComponent]
})
export class TextBasicComponent {}
