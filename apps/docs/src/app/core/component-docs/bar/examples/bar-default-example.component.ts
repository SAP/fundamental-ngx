import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RtlService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-bar-default-example',
    templateUrl: './bar-default-example.component.html'
})
export class BarDefaultExampleComponent implements OnInit {

    navigationArrow$: BehaviorSubject<string> = new BehaviorSubject<string>('navigation-left-arrow');

    constructor(private rtlService: RtlService) { }

    ngOnInit(): void {
        if (this.rtlService) {
            this.rtlService.rtl.subscribe(value => {
                this.navigationArrow$.next(value ? 'navigation-right-arrow' : 'navigation-left-arrow');
            });
        }
    }

}
