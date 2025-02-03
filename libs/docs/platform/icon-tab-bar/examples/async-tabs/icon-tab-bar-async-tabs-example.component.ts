import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core';
import { FDP_ICON_TAB_BAR } from '@fundamental-ngx/platform/icon-tab-bar';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'fdp-icon-tab-bar-async-tabs-example',
    imports: [FDP_ICON_TAB_BAR, AsyncPipe, ButtonComponent],
    styles: `
        .tab-container-example {
            height: 100px;
            border: 1px dashed grey;
            padding: 0.5rem;
        }
    `,
    templateUrl: './icon-tab-bar-async-tabs-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconTabBarAsyncTabsExampleComponent {
    public label$ = new BehaviorSubject<string>('Custom Tab');
    public counter$ = new BehaviorSubject<number>(1);

    public updateTab(): void {
        this.label$.next('UPDATED Custom Tab');
        this.counter$.next(this.counter$.value + 1);
    }
}
