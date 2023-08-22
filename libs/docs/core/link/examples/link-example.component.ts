import { Component, inject } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { IconModule } from '@fundamental-ngx/core/icon';
import { RouterLink } from '@angular/router';
import { LinkComponent } from '@fundamental-ngx/core/link';

@Component({
    selector: 'fd-link-example',
    templateUrl: './link-example.component.html',
    standalone: true,
    imports: [LinkComponent, RouterLink, IconModule, AsyncPipe]
})
export class LinkExampleComponent {
    arrowRight$: BehaviorSubject<string> = new BehaviorSubject<string>('slim-arrow-right');
    arrowLeft$: BehaviorSubject<string> = new BehaviorSubject<string>('slim-arrow-left');

    constructor() {
        const { rtl: rtl$ } = inject(RtlService, { optional: true }) || { rtl: of(false) };
        rtl$.pipe(takeUntilDestroyed()).subscribe((value) => {
            this.arrowRight$.next(value ? 'slim-arrow-left' : 'slim-arrow-right');
            this.arrowLeft$.next(value ? 'slim-arrow-right' : 'slim-arrow-left');
        });
    }
}
