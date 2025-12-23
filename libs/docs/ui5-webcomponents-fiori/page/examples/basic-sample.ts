import { Component } from '@angular/core';
import { Page } from '@fundamental-ngx/ui5-webcomponents-fiori/page';
import { Bar } from '@fundamental-ngx/ui5-webcomponents/bar';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';

@Component({
    selector: 'ui5-doc-page-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [Page, Bar, Button, Label]
})
export class BasicSample {}
