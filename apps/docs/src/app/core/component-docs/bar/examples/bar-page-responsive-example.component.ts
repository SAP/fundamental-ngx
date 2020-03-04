import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RtlService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-bar-page-responsive-example',
    templateUrl: './bar-page-responsive-example.component.html'
})
export class BarPageResponsiveExampleComponent implements OnInit {

    navigationArrow$: BehaviorSubject<string> = new BehaviorSubject<string>('navigation-left-arrow');

    constructor(private rtlService: RtlService) { }

    ngOnInit(): void {
        this.rtlService.rtl.subscribe(value => {
            this.navigationArrow$.next(value ? 'navigation-right-arrow' : 'navigation-left-arrow');
        });
    }

}
