import { A11yModule } from '@angular/cdk/a11y';
import { DOWN_ARROW } from '@angular/cdk/keycodes';
import { OverlayModule } from '@angular/cdk/overlay';

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PopoverService } from './popover-service/popover.service';
import { PopoverComponent } from './popover.component';
import { PopoverModule } from './popover.module';

describe('PopoverComponent', () => {
    let component: PopoverComponent;
    let fixture: ComponentFixture<PopoverComponent>;
    let popoverServiceStub: PopoverServiceStub;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PopoverModule, OverlayModule, A11yModule],
            providers: [{ provide: PopoverService, useClass: PopoverServiceStub }]
        })
            .overrideComponent(PopoverComponent, {
                set: {
                    providers: [{ provide: PopoverService, useClass: PopoverServiceStub }]
                }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PopoverComponent);
        component = fixture.componentInstance;
        popoverServiceStub = fixture.debugElement.injector.get(PopoverService) as any;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

    it('should call close method when isOpen is true', () => {
        component.isOpen = true;
        jest.spyOn(component, 'close').mockImplementation(() => {});

        component.toggle();

        expect(component.close).toHaveBeenCalled();
    });

    it('should call open method when isOpen is false', () => {
        component.isOpen = false;
        jest.spyOn(component, 'open').mockImplementation(() => {});

        component.toggle();

        expect(component.open).toHaveBeenCalled();
    });

    it('should call _popoverService.refreshConfiguration from ngOnChanges', () => {
        jest.spyOn(popoverServiceStub, 'refreshConfiguration');

        component.ngOnChanges();

        expect(popoverServiceStub.refreshConfiguration).toHaveBeenCalled();
    });

    it('should open popover', () => {
        jest.spyOn(popoverServiceStub, 'open');

        component.open();

        expect(popoverServiceStub.open).toHaveBeenCalled();
    });

    it('should close popover', () => {
        jest.spyOn(popoverServiceStub, 'close');

        component.close();

        expect(popoverServiceStub.close).toHaveBeenCalled();
    });

    it('should add ne wposition', () => {
        jest.spyOn(popoverServiceStub, 'applyNewPosition');

        component.applyNewPosition([]);

        expect(popoverServiceStub.applyNewPosition).toHaveBeenCalled();
    });

    it('should update popover', () => {
        jest.spyOn(component, 'refreshPosition');

        component.updatePopover();

        expect(component.refreshPosition).toHaveBeenCalled();
    });

    it('should refresh position', () => {
        jest.spyOn(popoverServiceStub, 'refreshPosition');

        component.refreshPosition();

        expect(popoverServiceStub.refreshPosition).toHaveBeenCalled();
    });

    it('should trigger keydown handler', () => {
        const event = {
            altKey: 'test-down-arrow',
            keyCode: DOWN_ARROW,
            preventDefault: () => {},
            stopPropagation: () => {}
        } as any;
        component.disabled = false;
        jest.spyOn(component, 'open');
        jest.spyOn(event, 'preventDefault');
        jest.spyOn(event, 'stopPropagation');

        component.triggerKeyDownHandler(event as KeyboardEvent);

        expect(component.open).toHaveBeenCalled();
        expect(event.preventDefault).toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();
    });
});

class PopoverServiceStub {
    initialise(): void {}
    refreshConfiguration(): void {}
    open(): void {}
    close(): void {}
    applyNewPosition(): void {}
    refreshPosition(): void {}
    onDestroy(): void {}
}
