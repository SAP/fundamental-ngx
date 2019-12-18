import { Component, Inject, Input } from '@angular/core';
import { Libraries } from '../../utilities/libraries';

@Component({
    selector: 'import',
    template: `
        <code>
            <span style="color: rgb(0, 0, 136);">import</span>
            &#123; {{ module }} &#125;
            <span style="color: rgb(0, 0, 136);">from </span>
            <span style="color: rgb(0, 136, 0);">'{{ library }}'</span>;
        </code>
    `
})
export class ImportComponent {
    @Input() module: string;

    library: string;

    constructor(
        @Inject('CURRENT_LIB') private currentLib: Libraries
    ) {
        switch (this.currentLib) {
            case 'core' : {
                this.library = '@fundamental-ngx/core';
                break;
            }

            case 'platform': {
                this.library = '@fundamental-ngx/platform';
                break;
            }
        }
    }
}
