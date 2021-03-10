import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CommonService } from './service/common.service';

@Component({
    selector: 'fundamental-ngx-root',
    templateUrl: './app.component.html',
})
export class AppComponent {

    title$: Observable<string>;

    constructor(
        private commonService: CommonService,
    ) {
        this.title$ = this.commonService.$title.pipe(delay(0));
    }
}
