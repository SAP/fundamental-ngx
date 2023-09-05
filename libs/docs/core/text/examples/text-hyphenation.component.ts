import { Component } from '@angular/core';
import { TextComponent } from '@fundamental-ngx/core/text';

@Component({
    selector: 'fd-text-hyphenation',
    templateUrl: './text-hyphenation.component.html',
    styleUrls: ['./text-hyphenation.component.scss'],
    standalone: true,
    imports: [TextComponent]
})
export class TextHyphenationComponent {
    text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;
    textSoftHyphens = `Lorem ipsum dolor sit amet, con\u00ADsectetur adip\u00ADiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna ali\u00ADqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco la\u00ADboris
        nisi ut aliquip ex ea commodo consequat.`;
}
