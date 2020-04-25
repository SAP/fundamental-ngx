import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizationEditorItemComponent } from './localization-editor-item.component';
import { LocalizationEditorModule } from '../localization-editor.module';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'fd-localization-item-test',
    template: `<fd-localization-editor-item>
        <ng-template fd-localization-editor-label>
            <span>Custom Label</span>
        </ng-template>
        <input fd-localization-editor-input />
    </fd-localization-editor-item>`
})
class TestLocalizationItemComponent {}

describe('LocalizationEditorItemComponent', () => {
    let component: LocalizationEditorItemComponent;
    let fixture: ComponentFixture<TestLocalizationItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [LocalizationEditorModule, CommonModule],
            declarations: [TestLocalizationItemComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestLocalizationItemComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should detect custom label template', () => {
        expect(component.labelTemplate).toBeTruthy();
    });
});
