import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlatformTableColumnResizerComponent } from './table-column-resizer.component';

describe('PlatformTableColumnResizerComponent', () => {
    let component: PlatformTableColumnResizerComponent;
    let fixture: ComponentFixture<PlatformTableColumnResizerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [PlatformTableColumnResizerComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PlatformTableColumnResizerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
