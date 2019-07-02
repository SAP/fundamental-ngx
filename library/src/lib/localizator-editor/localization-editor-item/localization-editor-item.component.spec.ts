import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizationEditorItemComponent } from './localization-editor-item.component';
import { LocalizationEditorModule } from '../localization-editor.module';
import { CommonModule } from '@angular/common';

describe('LocalizationEditorItemComponent', () => {
    let component: LocalizationEditorItemComponent;
    let fixture: ComponentFixture<LocalizationEditorItemComponent>;

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
        fixture = TestBed.createComponent(LocalizationEditorItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
