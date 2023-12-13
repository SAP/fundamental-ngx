import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DynamicPageService {
    /** @ignore */
    private toggle = new Subject<void>();
    /** @ignore */
    private expand = new Subject<void>();
    /** @ignore */
    private collapse = new Subject<void>();
    /** @ignore */
    private collapseValue = new Subject<boolean>();
    /** @ignore */
    private isCollapsed = false;

    /** @ignore */
    public $toggle = this.toggle.asObservable();
    /** @ignore */
    public $expand = this.expand.asObservable();
    /** @ignore */
    public $collapse = this.collapse.asObservable();
    /** @ignore */
    public $collapseValue = this.collapseValue.asObservable();

    /** @ignore */
    public toggleHeader(): void {
        this.toggle.next();
    }

    /** @ignore */
    public expandHeader(): void {
        this.isCollapsed = false;
        this.expand.next();
    }

    /** @ignore */
    public collapseHeader(): void {
        this.isCollapsed = true;
        this.collapse.next();
    }

    /** @ignore */
    public setCollapseValue(val: boolean): void {
        this.setIsCollapsed(val);
        this.collapseValue.next(val);
    }

    /** @ignore */
    public getIsCollapsed(): boolean {
        return this.isCollapsed;
    }

    /** @ignore */
    public setIsCollapsed(collapsed: boolean): void {
        this.isCollapsed = collapsed;
    }
}
