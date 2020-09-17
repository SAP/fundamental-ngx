import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DynamicPageService {
    private toggle = new Subject<boolean>();
    private expand = new Subject<void>();
    private collapse = new Subject<void>();

    public $toggle = this.toggle.asObservable();
    public $expand = this.expand.asObservable();
    public $collapse = this.collapse.asObservable();

    public toggleHeader(val: boolean): any {
        this.toggle.next(val);
    }
    public expandHeader(): any {
        this.expand.next();
    }
    public collapseHeader(): any {
        this.collapse.next();
    }
}
