import { InitialFocusDirective } from './initial-focus.directive';
import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { TabbableElementService } from '../../services/tabbable-element.service';

@Component({
    hostDirectives: [InitialFocusDirective],
    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
    host: {
        '[attr.tabindex]': 'rootElementTabIndex'
    },
    standalone: true,
    providers: [
        {
            provide: TabbableElementService,
            useFactory: () => {
                function getTabbableElement(root: HTMLElement): HTMLElement | null {
                    if (root.getAttribute('tabindex') === '0') {
                        return root;
                    }
                    const rootChildren = root.children;

                    for (let i = 0; i < rootChildren.length; i++) {
                        const tabbableChild =
                            rootChildren[i].nodeType === document.ELEMENT_NODE
                                ? getTabbableElement(rootChildren[i] as HTMLElement)
                                : null;

                        if (tabbableChild) {
                            return tabbableChild;
                        }
                    }

                    return null;
                }
                return {
                    getTabbableElement
                };
            }
        }
    ],
    template: `
        <span>Non Focusable</span>
        <span tabindex="0" id="nestedElementToFocus">Focusable</span>
    `
})
class TestComponent {
    rootElementTabIndex = 0;
}

describe('InitialFocusDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let hostFocusSpy: jest.SpyInstance;
    let childFocusSpy: jest.SpyInstance;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        hostFocusSpy = jest.spyOn(fixture.nativeElement, 'focus');
        childFocusSpy = jest.spyOn(fixture.nativeElement.querySelector('#nestedElementToFocus'), 'focus');
    });

    it('should focus element', async () => {
        fixture.detectChanges();
        expect(hostFocusSpy).toHaveBeenCalled();
        expect(childFocusSpy).not.toHaveBeenCalled();
    });

    it('should focus nested element', fakeAsync(() => {
        component.rootElementTabIndex = -1;
        fixture.detectChanges();
        expect(hostFocusSpy).not.toHaveBeenCalled();
        expect(childFocusSpy).toHaveBeenCalled();
    }));
});
