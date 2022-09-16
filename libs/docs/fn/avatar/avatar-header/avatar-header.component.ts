import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-avatar-header',
    templateUrl: './avatar-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarHeaderComponent {}
