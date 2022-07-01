import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { whenStable } from '@fundamental-ngx/core/tests';

import { SplitterModule } from '../splitter.module';
import { SplitterSplitPaneComponent } from './splitter-split-pane.component';

describe('SplitterSplitPaneComponent', () => {
    let component: SplitterSplitPaneComponent;
    let fixture: ComponentFixture<SplitterSplitPaneComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [SplitterModule]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(SplitterSplitPaneComponent);
        component = fixture.debugElement.componentInstance;

        await whenStable(fixture);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle on canvas', () => {
        const spy = spyOn(component.toggleOnCanvas, 'emit').and.callThrough();

        component.hideFromCanvas();
        fixture.detectChanges();

        expect(spy).toHaveBeenCalledTimes(1);

        component.showOnCanvas();
        fixture.detectChanges();

        expect(spy).toHaveBeenCalledTimes(2);
    });
});
