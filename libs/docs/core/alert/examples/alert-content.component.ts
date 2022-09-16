import { Component } from '@angular/core';
import { AlertRef } from '@fundamental-ngx/core/alert';

@Component({
    selector: 'fd-alert-content',
    template: `
        <div>{{ ref.data.label }}</div>
        <br />
        <div>It will stay open when the mouse is hovered inside.</div>
        <br />
        <div>Injecting AlertRef allows you to call <code>dismiss()</code> on the alert or access passed data.</div>
    `
})
export class AlertContentComponent {
    constructor(public ref: AlertRef) {}
}
