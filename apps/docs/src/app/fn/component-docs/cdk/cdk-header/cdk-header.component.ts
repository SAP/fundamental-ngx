import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-cdk-header',
    templateUrl: './cdk-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CdkHeaderComponent {}
