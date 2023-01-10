import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NestedListPopoverComponent } from './nested-list-popover.component';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { NestedListKeyboardService } from '../nested-list-keyboard.service';
import { MenuKeyboardService } from '@fundamental-ngx/core/menu';

describe('NestedListPopoverComponent', () => {
    let component: NestedListPopoverComponent;
    let fixture: ComponentFixture<NestedListPopoverComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PopoverModule],
            declarations: [NestedListPopoverComponent],
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
