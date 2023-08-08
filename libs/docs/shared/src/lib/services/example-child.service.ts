import { Injectable } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { BehaviorSubject } from 'rxjs';

/**
 * This service helps with setting 'Examples' tab as active if user is located on the subpage of the root documentation page.
 */
@Injectable()
export class ExampleChildService {
    private readonly _link = new BehaviorSubject('./');

    link = this._link.asObservable();

    setLink(link: Nullable<string>): void {
        link = link || './';
        this._link.next(link);
    }
}
