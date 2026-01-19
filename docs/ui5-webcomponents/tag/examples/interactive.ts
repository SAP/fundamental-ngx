import { Component, signal } from '@angular/core';
import { Tag } from '@fundamental-ngx/ui5-webcomponents/tag';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/paddings.css';

@Component({
    selector: 'ui5-tag-interactive-sample',
    templateUrl: './interactive.html',
    standalone: true,
    imports: [Tag]
})
export class TagInteractiveSample {
    readonly clickCount = signal(0);

    onTagClick(): void {
        this.clickCount.update((count) => count + 1);
    }
}
