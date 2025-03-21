import { Component } from '@angular/core';
import { TextComponent } from '@fundamental-ngx/core/text';

@Component({
    selector: 'fd-text-whitespaces',
    templateUrl: './text-whitespaces.component.html',
    imports: [TextComponent]
})
export class TextWhitespacesComponent {
    text = `    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididuntut labore et
dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
aliquip ex ea commodo consequat.

    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
deserunt mollit anim id est laborum.`;
}
