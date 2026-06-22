import { Component } from '@angular/core';
import { Bar } from '@fundamental-ngx/ui5-webcomponents/bar';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Dialog } from '@fundamental-ngx/ui5-webcomponents/dialog';
import { Input } from '@fundamental-ngx/ui5-webcomponents/input';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';

// Import styles
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/panel.css';

@Component({
    selector: 'ui5-autofocus-sample',
    templateUrl: './autofocus-sample.html',
    imports: [Input, Button, Label, Dialog, Bar]
})
export class AutofocusSample {
    dialogOpen = false;

    openDialog(): void {
        this.dialogOpen = true;
    }

    closeDialog(): void {
        this.dialogOpen = false;
    }
}
