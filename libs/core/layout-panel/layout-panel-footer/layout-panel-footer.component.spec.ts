import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LayoutPanelFooterComponent } from './layout-panel-footer.component';

describe('LayoutPanelFooterComponent', () => {
    let component: LayoutPanelFooterComponent;
    let fixture: ComponentFixture<LayoutPanelFooterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [LayoutPanelFooterComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutPanelFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have default footer class', () => {
        expect(fixture.nativeElement.className).toContain('fd-layout-panel__footer');
    });

    it('should apply modifier class for footer content position start/left', () => {
        fixture.componentRef.setInput('position', 'start');
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-layout-panel__footer--start')).toBe(true);
    });

    it('should apply modifier class for footer content position end/right', () => {
        fixture.componentRef.setInput('position', 'end');
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-layout-panel__footer--end')).toBe(true);
    });
});
