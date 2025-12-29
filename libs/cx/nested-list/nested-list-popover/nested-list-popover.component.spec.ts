import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MenuKeyboardService } from '@fundamental-ngx/core/menu';
import { NestedListKeyboardService } from '../nested-list-keyboard.service';
import { NestedListPopoverComponent } from './nested-list-popover.component';

describe('NestedListPopoverComponent', () => {
    let component: NestedListPopoverComponent;
    let fixture: ComponentFixture<NestedListPopoverComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            providers: [MenuKeyboardService, NestedListKeyboardService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NestedListPopoverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
