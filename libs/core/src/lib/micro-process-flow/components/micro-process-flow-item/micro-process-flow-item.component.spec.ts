import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroProcessFlowItemComponent } from './micro-process-flow-item.component';

describe('MicroProcessFlowItemComponent', () => {
    let component: MicroProcessFlowItemComponent;
    let fixture: ComponentFixture<MicroProcessFlowItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MicroProcessFlowItemComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MicroProcessFlowItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should hide connector', () => {
        component.setLastItem(true);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.fd-micro-process-flow__connector')).toBeNull();
    });

    it('should show connector', () => {
        component.setLastItem(false);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.fd-micro-process-flow__connector')).toBeTruthy();
    });
});
