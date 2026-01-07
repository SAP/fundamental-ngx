import { Component, signal } from '@angular/core';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';

@Component({
    selector: 'ui5-text-hyphenation-sample',
    templateUrl: './hyphenation.html',
    standalone: true,
    imports: [Text]
})
export class TextHyphenationSample {
    readonly regularText = signal('An extraordinarily long English word!');

    // Soft hyphen (U+00AD) - normally invisible, you can inspect and see it in the browser's dev tools
    readonly textWithSoftHyphen = signal('An extraord­inarily long English word!');
}
