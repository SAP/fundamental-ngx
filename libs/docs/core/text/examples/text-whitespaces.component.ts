import { Component } from '@angular/core';
import { TextComponent } from '@fundamental-ngx/core/text';

@Component({
    selector: 'fd-text-whitespaces',
    templateUrl: './text-whitespaces.component.html',
    imports: [TextComponent]
})
export class TextWhitespacesComponent {
    protected readonly text = `    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    This text has leading spaces and line breaks.

    It also contains multiple paragraphs to demonstrate
    whitespace preservation behavior.`;
}
