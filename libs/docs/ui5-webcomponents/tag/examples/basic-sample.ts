import { Component } from '@angular/core';
import { Tag } from '@fundamental-ngx/ui5-webcomponents/tag';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-tag-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [Tag]
})
export class TagBasicSample {}
