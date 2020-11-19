import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Component } from '@angular/core';

import { DialogContainerComponent } from '../dialog-container/dialog-container.component';
import { DIALOG_CONFIG, DialogConfig } from '../utils/dialog-config.class';
import { DIALOG_REF, DialogRef } from '../utils/dialog-ref.class';
import { DialogDefaultContent } from '../utils/dialog-default-content.class';
import { whenStable } from '../../utils/tests';

const TEXT_CONTENT = 'Hello there';

@Component({
    selector: 'fd-content-test-component',
    template: TEXT_CONTENT
})
class ContentTestComponent { }

describe('DialogContainerComponent', () => {
    let component: DialogContainerComponent;
    let fixture: ComponentFixture<DialogContainerComponent>;
    const dialogConfig = { ...new DialogConfig(), componentClass: 'test-class' };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DialogContainerComponent, ContentTestComponent],
            providers: [
                { provide: DIALOG_CONFIG, useValue: dialogConfig },
                { provide: DIALOG_REF, useClass: DialogRef }
            ]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: { entryComponents: [ContentTestComponent] }
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogContainerComponent);
        component = fixture.componentInstance;
        component.childContent = ContentTestComponent;
    });

    it('should create', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('should create embedded content', async () => {
        await whenStable(fixture);

        const childComponentEl = fixture.nativeElement.querySelector('fd-content-test-component');
        expect(childComponentEl).toBeTruthy();
        expect(childComponentEl.textContent).toContain(TEXT_CONTENT);
    });

    it('should create component from object', async () => {
        component.childContent = { title: TEXT_CONTENT } as DialogDefaultContent;
        const embedContentSpy = spyOn(<any>component, '_createFromDefaultDialog');

        await whenStable(fixture);

        expect(embedContentSpy).toHaveBeenCalled();
    });
});
