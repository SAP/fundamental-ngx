import { Component } from '@angular/core';
import { Bar } from '@fundamental-ngx/ui5-webcomponents/bar';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';

@Component({
    selector: 'ui5-accessible-role-bar-sample',
    standalone: true,
    templateUrl: './accessible-role.html',
    imports: [Bar, Button, Label]
})
export class AccessibleRoleBarSample {}
