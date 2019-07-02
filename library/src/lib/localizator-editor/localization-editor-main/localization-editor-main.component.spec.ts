import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizationEditorMainComponent } from './localization-editor-main.component';
import { LocalizationEditorModule } from '../localization-editor.module';
import { CommonModule } from '@angular/common';

describe('LocalizationEditorMainComponent', () => {
    let component: LocalizationEditorMainComponent;
    let fixture: ComponentFixture<LocalizationEditorMainComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                LocalizationEditorModule,
                CommonModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LocalizationEditorMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
