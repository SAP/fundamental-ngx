import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {
    MessageBoxConfig,
    MessageBoxContainerComponent,
    MessageBoxContent,
    MessageBoxModule,
    MessageBoxRef
} from '@fundamental-ngx/core/message-box';
import { whenStable } from '@fundamental-ngx/core/tests';

@Component({ template: '<ng-template #template></ng-template>' })
class TestComponent {
    @ViewChild('template')
    templateRef: TemplateRef<any>;
}

describe('MessageBoxContainerComponent', () => {
    let component: MessageBoxContainerComponent;
    let fixture: ComponentFixture<MessageBoxContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestComponent],
            providers: [MessageBoxRef, MessageBoxConfig],
            imports: [MessageBoxModule, NoopAnimationsModule]
        })
            .overrideModule(BrowserDynamicTestingModule, {
                set: { entryComponents: [TestComponent] }
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MessageBoxContainerComponent);
        component = fixture.componentInstance;
        component.childContent = {};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create embedded content from component', () => {
        const creationSpy = spyOn(<any>component, '_createFromComponent');
        component.childContent = TestComponent;

        component['_loadContent']();

        expect(creationSpy).toHaveBeenCalled();
    });

    it('should create embedded content from template', async () => {
        const creationSpy = spyOn(<any>component, '_createFromTemplate');
        const testComponent = TestBed.createComponent(TestComponent);

        await whenStable(testComponent);

        component.childContent = testComponent.componentInstance.templateRef;
        component['_loadContent']();

        expect(creationSpy).toHaveBeenCalled();
    });

    it('should create embedded content from content object', () => {
        const creationSpy = spyOn(<any>component, '_createFromDefaultMessageBox');

        component.childContent = { title: 'title' } as MessageBoxContent;

        component['_loadContent']();

        expect(creationSpy).toHaveBeenCalled();
    });
});
