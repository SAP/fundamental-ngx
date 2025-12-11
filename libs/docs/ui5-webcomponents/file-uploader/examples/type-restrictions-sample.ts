import { Component } from '@angular/core';
import { Label } from '@fundamental-ngx/ui5-webcomponents';
import { FileUploader } from '@fundamental-ngx/ui5-webcomponents/file-uploader';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout.css';

@Component({
    selector: 'ui5-file-uploader-type-restrictions-sample',
    templateUrl: './type-restrictions-sample.html',
    standalone: true,
    imports: [FileUploader, Label]
})
export class FileTypeRestrictionsSample {}
