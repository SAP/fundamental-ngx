import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DynamicPageService {
    /** @hidden */
    private toggle = new Subject<void>();
    /** @hidden */
    private expand = new Subject<void>();
    /** @hidden */
    private collapse = new Subject<void>();
    /** @hidden */
    private collapseValue = new Subject<boolean>();
    /** @hidden */
    private isCollapsed = false;

    /** @hidden */
    public $toggle = this.toggle.asObservable();
    /** @hidden */
    public $expand = this.expand.asObservable();
    /** @hidden */
    public $collapse = this.collapse.asObservable();
    /** @hidden */
    public $collapseValue = this.collapseValue.asObservable();

    /** @hidden */
    public toggleHeader(): void {
        this.toggle.next();
    }

    /** @hidden */
    public expandHeader(): void {
        this.isCollapsed = false;
        this.expand.next();
    }

    /** @hidden */
    public collapseHeader(): void {
        this.isCollapsed = true;
        this.collapse.next();
    }

    /** @hidden */
    public setCollapseValue(val: boolean): void {
        this.setIsCollapsed(val);
        this.collapseValue.next(val);
    }

    /** @hidden */
    public getIsCollapsed(): boolean {
        return this.isCollapsed;
    }

    /** @hidden */
    public setIsCollapsed(collapsed: boolean): void {
        this.isCollapsed = collapsed;
    }
}
