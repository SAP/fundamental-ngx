import { Component } from '@angular/core';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-title-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [Title]
})
export class TitleBasicSample {}
