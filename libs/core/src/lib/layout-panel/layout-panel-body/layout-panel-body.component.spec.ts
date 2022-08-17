import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LayoutPanelBodyComponent } from './layout-panel-body.component';

describe('LayoutPanelBodyComponent', () => {
    let component: LayoutPanelBodyComponent;
    let fixture: ComponentFixture<LayoutPanelBodyComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LayoutPanelBodyComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutPanelBodyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have body class', () => {
        expect(fixture.nativeElement.className).toContain('fd-layout-panel__body');
    });

    it('should support edge bleeding', () => {
        component.bleed = true;
        fixture.detectChanges();
        expect(fixture.nativeElement.className).toContain('fd-layout-panel__body--bleed');
    });
});
