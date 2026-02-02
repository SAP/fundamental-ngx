import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LayoutPanelComponent } from './layout-panel.component';

describe('LayoutPanelComponent', () => {
    let component: LayoutPanelComponent;
    let fixture: ComponentFixture<LayoutPanelComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [LayoutPanelComponent]
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

    it('should apply transparent background', () => {
        fixture.componentRef.setInput('transparent', true);
        fixture.detectChanges();
        expect(fixture.nativeElement.className).toContain('fd-layout-panel--transparent');
    });

    it('should apply background image style', () => {
        fixture.componentRef.setInput('backgroundImage', 'test-image.jpg');
        fixture.detectChanges();
        expect(fixture.nativeElement.style.backgroundImage).toBe('url("test-image.jpg")');
    });
});
