import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { whenStable } from '@fundamental-ngx/core/tests';

import { SplitterSplitPaneComponent } from './splitter-split-pane/splitter-split-pane.component';
import { SplitterComponent } from './splitter.component';
import { SplitterModule } from './splitter.module';

@Component({
    template: `
        <fd-splitter>
            <fd-splitter-pane-container>
                <fd-splitter-split-pane #paneOne [id]="paneOneId"> Pane {{ paneOneId }} </fd-splitter-split-pane>
            </fd-splitter-pane-container>
        </fd-splitter>
    `
})
class SplitterHostComponent {
    @ViewChild(SplitterComponent)
    splitterComponent: SplitterComponent;

    @ViewChild('paneOne')
    paneOne: SplitterSplitPaneComponent;

    paneOneId = 'one';
}

describe('SplitterComponent', () => {
    let hostComponent: SplitterHostComponent;
    let splitterComponent: SplitterComponent;
    let fixture: ComponentFixture<SplitterHostComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SplitterHostComponent],
            imports: [SplitterModule]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(SplitterHostComponent);
        hostComponent = fixture.debugElement.componentInstance;

        await whenStable(fixture);

        splitterComponent = hostComponent.splitterComponent;
    });

    it('should create', () => {
        expect(hostComponent).toBeTruthy();
    });

    it('should toggle pane on the canvas', () => {
        const hideSpy = spyOn(hostComponent.paneOne, 'hideFromCanvas').and.callThrough();
        const showSpy = spyOn(hostComponent.paneOne, 'showOnCanvas').and.callThrough();

        splitterComponent.hidePaneFromCanvas(hostComponent.paneOneId);
        fixture.detectChanges();

        expect(hideSpy).toHaveBeenCalled();
        expect(splitterComponent.isPaneOnCanvas(hostComponent.paneOneId)).toBeFalse();

        splitterComponent.showPaneOnCanvas(hostComponent.paneOneId);
        fixture.detectChanges();

        expect(showSpy).toHaveBeenCalled();
        expect(splitterComponent.isPaneOnCanvas(hostComponent.paneOneId)).toBeTrue();
    });
});
