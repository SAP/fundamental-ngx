import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fn-avatar-fallback-example',
    templateUrl: './avatar-fallback-example.component.html',
    styleUrls: ['./avatar-example-styles.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class AvatarFallbackExampleComponent {}
