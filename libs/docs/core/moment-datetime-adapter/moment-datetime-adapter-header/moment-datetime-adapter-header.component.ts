import { Component } from '@angular/core';

import { ExampleFile } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-moment-datetime-adapter-header',
    templateUrl: './moment-datetime-adapter-header.component.html'
})
export class MomentDatetimeAdapterHeaderComponent {
    installSnippet: ExampleFile = {
        code: `
npm i @fundamental-ngx/moment-adapter

# using yarn?
# yarn add @fundamental-ngx/moment-adapter
                    `,
        language: 'bash'
    };
}
