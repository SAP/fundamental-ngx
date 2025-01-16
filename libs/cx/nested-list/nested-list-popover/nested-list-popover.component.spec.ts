import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MenuKeyboardService } from '@fundamental-ngx/core/menu';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { NestedListKeyboardService } from '../nested-list-keyboard.service';
import { NestedListPopoverComponent } from './nested-list-popover.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NestedListPopoverComponent', () => {
    let component: NestedListPopoverComponent;
    let fixture: ComponentFixture<NestedListPopoverComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PopoverModule, NoopAnimationsModule, NestedListPopoverComponent ],
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
