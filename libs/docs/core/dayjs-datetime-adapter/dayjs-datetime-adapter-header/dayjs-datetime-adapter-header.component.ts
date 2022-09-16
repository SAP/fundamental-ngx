import { Component } from '@angular/core';

import { ExampleFile } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-datetime-datetime-adapter-header',
    templateUrl: './dayjs-datetime-adapter-header.component.html'
})
export class DayjsDatetimeAdapterHeaderComponent {
    installSnippet: ExampleFile = {
        code: `npm i @fundamental-ngx/datetime-adapter

# using yarn?
# yarn add @fundamental-ngx/datetime-adapter`,
        language: 'bash'
    };
}
