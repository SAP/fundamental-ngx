import { AsyncPipe, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { BehaviorSubject, of } from 'rxjs';

@Component({
    selector: 'fd-link-example',
    templateUrl: './link-example.component.html',
    imports: [LinkComponent, RouterLink, IconComponent, AsyncPipe, NgStyle]
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
