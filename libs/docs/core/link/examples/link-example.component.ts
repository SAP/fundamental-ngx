import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { DestroyedService, RtlService } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fd-link-example',
    templateUrl: './link-example.component.html',
    providers: [DestroyedService]
})
export class LinkExampleComponent implements OnInit {
    arrowRight$: BehaviorSubject<string> = new BehaviorSubject<string>('slim-arrow-right');
    arrowLeft$: BehaviorSubject<string> = new BehaviorSubject<string>('slim-arrow-left');

    constructor(private rtlService: RtlService, private readonly _destroy$: DestroyedService) {}

    ngOnInit(): void {
        if (this.rtlService) {
            this.rtlService.rtl.pipe(takeUntil(this._destroy$)).subscribe((value) => {
                this.arrowRight$.next(value ? 'slim-arrow-left' : 'slim-arrow-right');
                this.arrowLeft$.next(value ? 'slim-arrow-right' : 'slim-arrow-left');
            });
        }
    }
}
