import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileInputComponent } from './file-input.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileSelectDirective } from './directives/file-select.directive';
import { FileDragndropDirective } from './directives/file-dragndrop.directive';

describe('FileInputComponent', () => {
    let component: FileInputComponent;
    let fixture: ComponentFixture<FileInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FileInputComponent, FileSelectDirective, FileDragndropDirective],
            imports: [CommonModule, FormsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FileInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
