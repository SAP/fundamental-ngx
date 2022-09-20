import { A11yModule } from '@angular/cdk/a11y';
import { DOWN_ARROW } from '@angular/cdk/keycodes';
import { OverlayModule } from '@angular/cdk/overlay';

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PopoverComponent, PopoverModule, PopoverService } from '@fundamental-ngx/core/popover';
import { skeletonConsumerProviders } from '@fundamental-ngx/core/skeleton';

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
                    providers: [{ provide: PopoverService, useClass: PopoverServiceStub }, skeletonConsumerProviders()]
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
        spyOn(component, 'close').and.callFake(() => {});

        component.toggle();

        expect(component.close).toHaveBeenCalled();
    });

    it('should call open method when isOpen is false', () => {
        component.isOpen = false;
        spyOn(component, 'open').and.callFake(() => {});

        component.toggle();

        expect(component.open).toHaveBeenCalled();
    });

    it('should call _popoverService.refreshConfiguration from ngOnChanges', () => {
        spyOn(popoverServiceStub, 'refreshConfiguration');

        component.ngOnChanges();

        expect(popoverServiceStub.refreshConfiguration).toHaveBeenCalled();
    });

    it('should open popover', () => {
        spyOn(popoverServiceStub, 'open');
        spyOn(component.isOpenChange, 'emit');
        component.isOpen = false;

        component.open();

        expect(popoverServiceStub.open).toHaveBeenCalled();
        expect(component.isOpenChange.emit).toHaveBeenCalled();
        expect(component.isOpen).toBe(true);
    });

    it('should close popover', () => {
        spyOn(popoverServiceStub, 'close');
        spyOn(component.isOpenChange, 'emit');
        component.isOpen = true;

        component.close();

        expect(popoverServiceStub.close).toHaveBeenCalled();
        expect(component.isOpenChange.emit).toHaveBeenCalled();
        expect(component.isOpen).toBe(false);
    });

    it('should add ne wposition', () => {
        spyOn(popoverServiceStub, 'applyNewPosition');

        component.applyNewPosition([]);

        expect(popoverServiceStub.applyNewPosition).toHaveBeenCalled();
    });

    it('should update popover', () => {
        spyOn(component, 'refreshPosition');

        component.updatePopover();

        expect(component.refreshPosition).toHaveBeenCalled();
    });

    it('should refresh position', () => {
        spyOn(popoverServiceStub, 'refreshPosition');

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
        spyOn(component, 'open');
        spyOn(event, 'preventDefault');
        spyOn(event, 'stopPropagation');

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
