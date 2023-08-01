import { Component, inject } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'fd-link-example',
    templateUrl: './link-example.component.html'
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
