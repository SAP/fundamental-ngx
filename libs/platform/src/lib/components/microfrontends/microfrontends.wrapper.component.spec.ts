import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MicroFrontendsWrapperComponent } from './microfrontends.wrapper.component';

@Component({
    selector: 'fdp-test-component',
    template: `
    <element-anchor #microfrontendswrapper
        [src]="'simple.main.js'" 
        [stylesheet]="'theme.css'"
        [elParameters]="elParameters" 
        [customTag]="'simple-test'" 
        [routeOutlet]=false
        [routeRoot]="'platform/microfrontends/example'"
        (oncustomevent)="onMicroAppEvent($event)">
    </element-anchor>
    `
})
class TestComponent {}

describe('MicroFrontendsWrapperComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MicroFrontendsWrapperComponent, TestComponent],
            imports: []
        }).compileComponents();
    }));
        
    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
        
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be able to create custom element and css href', () => {
        
        fixture.detectChanges();
        const children = fixture.debugElement.children;
        let customElementCreated = false;
        let customElementCssCreated = false;
        if (children && children.length > 0
            && children[0].nativeElement 
            && children[0].nativeElement.children.length > 0
            && children[0].nativeElement.children[0].shadowRoot) {

            const shadowRoot = children[0].nativeElement.children[0].shadowRoot;

            const childNodes = shadowRoot.childNodes;

            for (let i = 0; i < childNodes.length; i++) {
               const childNode = childNodes[i];
              
               if (childNode.tagName === 'DIV') {

                if (childNode.className === '__micro_app_css_href__' 
                 && childNode.getAttribute('css_href')) {

                    customElementCssCreated = true;

                    const cssHref = childNode.getAttribute('css_href');
                    expect(cssHref).toBe('theme.css');

                }

               } else if (childNode.tagName === 'SIMPLE-TEST') {  

                   customElementCreated = true;
               
                }
            }
        }    
        expect(customElementCreated).toBe(true);
        expect(customElementCssCreated).toBe(true);
    });

    
});

