import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RtlService } from '@fundamental-ngx/core/utils';

@Component({
    selector: 'fd-link-example',
    templateUrl: './link-example.component.html'
})
export class LinkExampleComponent implements OnInit {
    arrowRight$: BehaviorSubject<string> = new BehaviorSubject<string>('slim-arrow-right');
    arrowLeft$: BehaviorSubject<string> = new BehaviorSubject<string>('slim-arrow-left');

    constructor(private rtlService: RtlService) {}

    ngOnInit(): void {
        if (this.rtlService) {
            this.rtlService.rtl.subscribe((value) => {
                this.arrowRight$.next(value ? 'slim-arrow-left' : 'slim-arrow-right');
                this.arrowLeft$.next(value ? 'slim-arrow-right' : 'slim-arrow-left');
            });
        }
    }
}
