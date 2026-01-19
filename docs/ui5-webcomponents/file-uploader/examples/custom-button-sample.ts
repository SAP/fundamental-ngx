import { Component } from '@angular/core';
import { Label } from '@fundamental-ngx/ui5-webcomponents';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { FileUploader } from '@fundamental-ngx/ui5-webcomponents/file-uploader';

// Import icons
import '@ui5/webcomponents-icons/dist/add.js';
import '@ui5/webcomponents-icons/dist/upload.js';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout.css';

@Component({
    selector: 'ui5-file-uploader-custom-button-sample',
    templateUrl: './custom-button-sample.html',
    standalone: true,
    imports: [FileUploader, Button, Label]
})
export class CustomButtonSample {}
