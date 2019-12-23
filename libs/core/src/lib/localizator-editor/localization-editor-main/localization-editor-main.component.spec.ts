import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalizationEditorModule } from '../localization-editor.module';
import { CommonModule } from '@angular/common';
import { LocalizationEditorMainComponent } from './localization-editor-main.component';

@Component({
    selector: 'fd-localization-main-test',
    template: `<fd-localization-editor-main>
        <ng-template fd-localization-editor-label>
            <span >Custom Label</span>
        </ng-template>
        <input fd-localization-editor-input />
  </fd-localization-editor-main>`
})
class TestLocalizationMainComponent {}

describe('LocalizationEditorMainComponent', () => {
    let component: LocalizationEditorMainComponent;
    let fixture: ComponentFixture<TestLocalizationMainComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                LocalizationEditorModule,
                CommonModule
            ],
            declarations: [
                TestLocalizationMainComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestLocalizationMainComponent);
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
