import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DynamicPageService {
    private toggle = new Subject<void>();
    private expand = new Subject<void>();
    private collapse = new Subject<void>();
    private collapseValue = new Subject<boolean>();
    private isCollapsed = false;

    public $toggle = this.toggle.asObservable();
    public $expand = this.expand.asObservable();
    public $collapse = this.collapse.asObservable();
    public $collapseValue = this.collapseValue.asObservable();

    public toggleHeader(): void {
        this.toggle.next();
    }
    public expandHeader(): void {
        this.isCollapsed = false;
        this.expand.next();
    }
    public collapseHeader(): void {
        this.isCollapsed = true;
        this.collapse.next();
    }
    public setCollapseValue(val: boolean): void {
        this.setIsCollapsed(val);
        this.collapseValue.next(val);
    }

    public getIsCollapsed(): boolean {
        return this.isCollapsed;
    }

    public setIsCollapsed(collapsed: boolean): void {
        this.isCollapsed = collapsed;
    }
}
