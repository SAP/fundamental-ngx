import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LayoutPanelComponent } from './layout-panel.component';

describe('LayoutPanelComponent', () => {
    let component: LayoutPanelComponent;
    let fixture: ComponentFixture<LayoutPanelComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LayoutPanelComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(fixture.nativeElement.className).toContain('fd-layout-panel');
    });
});
