import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AlertComponent } from '@fundamental-ngx/core/alert';

@Component({
    selector: 'fd-alert-inline-example',
    templateUrl: './alert-inline-example.component.html',
    styleUrls: ['alert-inline-example.component.scss']
})
export class AlertInlineExampleComponent implements AfterViewInit {
    @ViewChild('alert')
    alertComponent: AlertComponent;

    openAlert(): void {
        this.alertComponent.open();
    }

    ngAfterViewInit(): void {
        this.openAlert();
    }
}
