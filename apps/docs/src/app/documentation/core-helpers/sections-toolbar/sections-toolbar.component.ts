import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SectionInterface } from './section.interface';
import { BehaviorSubject } from 'rxjs';

const SMALL_SCREEN_BREAKPOINT = 992;
@Component({
    selector: 'sections-toolbar',
    templateUrl: './sections-toolbar.component.html',
    styleUrls: ['./sections-toolbar.component.scss']
})
export class SectionsToolbarComponent implements OnInit {
    @Input() sections: SectionInterface[];

    @Output()
    readonly sideCollapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    sideCollapsed: BehaviorSubject<boolean>;

    search = '';

    private get _smallScreen(): boolean {
        return window.innerWidth < SMALL_SCREEN_BREAKPOINT;
    }

    constructor() {}

    ngOnInit(): void {
        this.onActivate();
    }

    onKeypressHandler(event: KeyboardEvent): void {
        if (event.code === 'Enter' || event.code === 'Space') {
            event.preventDefault();
            const _event = new MouseEvent('click');
            event.target.dispatchEvent(_event);
        }
    }

    onItemClick(): void {
        this.sideCollapsed.next(false);
    }

    onActivate(): void {
        if (this._smallScreen && !this.sideCollapsed.value) {
            this._setCollapseState(true);
        }
    }

    windowSize(): void {
        if (!this._smallScreen) {
            this._setCollapseState(false);
            return;
        }

        this.onActivate();
        this.sideCollapsedChange.emit(this.sideCollapsed.value);
    }

    private _setCollapseState(state: boolean): void {
        this.sideCollapsed?.next(state);
        this.sideCollapsedChange.emit(state);
    }
}
