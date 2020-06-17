import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPanelComponent } from './layout-panel.component';

describe('LayoutPanelComponent', () => {
    let component: LayoutPanelComponent;
    let fixture: ComponentFixture<LayoutPanelComponent>;

    beforeEach(async(() => {
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
