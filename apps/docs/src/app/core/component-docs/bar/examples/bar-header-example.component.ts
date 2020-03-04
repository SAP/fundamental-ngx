import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RtlService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-bar-header-example',
    templateUrl: './bar-header-example.component.html'
})
export class BarHeaderExampleComponent implements OnInit, OnDestroy {

    navigationArrow$: BehaviorSubject<string> = new BehaviorSubject<string>('navigation-left-arrow');

    constructor(private rtlService: RtlService) { }

    ngOnInit(): void {
        this.rtlService.rtl.subscribe(value => {
            this.navigationArrow$.next(value ? 'navigation-right-arrow' : 'navigation-left-arrow');
        });
    }

    ngOnDestroy(): void {
        this.rtlService.rtl.unsubscribe();
    }

}
