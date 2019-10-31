import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedListPopoverComponent } from './nested-list-popover.component';
import { PopoverModule } from '../../popover/popover.module';

describe('NestedListPopoverComponent', () => {
    let component: NestedListPopoverComponent;
    let fixture: ComponentFixture<NestedListPopoverComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [PopoverModule],
            declarations: [NestedListPopoverComponent]
        })
            .compileComponents();
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
