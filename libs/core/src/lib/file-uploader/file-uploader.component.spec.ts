import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FileUploaderComponent } from './file-uploader.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileUploaderSelectDirective } from './directives/file-uploader-select.directive';
import { FileUploaderDragndropDirective } from './directives/file-uploader-dragndrop.directive';
import { ButtonModule } from '../button/button.module';

interface MockFile extends File {
    size: number;
}

describe('FileUploaderComponent', () => {
    let component: FileUploaderComponent;
    let fixture: ComponentFixture<FileUploaderComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [FileUploaderComponent, FileUploaderSelectDirective, FileUploaderDragndropDirective],
            imports: [CommonModule, FormsModule, ButtonModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FileUploaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should setDisabledState', () => {
        component.setDisabledState(true);
        expect(component.disabled).toBeTruthy();
    });

    it('should selectHandler with no maxFileSize', () => {
        spyOn(component, 'onChange').and.callThrough();
        spyOn(component.selectedFilesChanged, 'emit').and.callThrough();
        const file1: MockFile = new File([''], 'file1');
        spyOnProperty(file1, 'size').and.returnValue(1024);
        const event: File[] = [file1];
        component.selectHandler(event);
        expect(component.onChange).toHaveBeenCalledWith(event);
        expect(component.selectedFilesChanged.emit).toHaveBeenCalledWith(event);
    });

    it('should selectHandler with maxFileSize', () => {
        spyOn(component, 'onChange').and.callThrough();
        spyOn(component.selectedFilesChanged, 'emit').and.callThrough();
        spyOn(component.selectedInvalidFiles, 'emit').and.callThrough();
        const file1: MockFile = new File([''], 'file1');
        spyOnProperty(file1, 'size').and.returnValue(1024);
        const file2: MockFile = new File([''], 'file2');
        spyOnProperty(file2, 'size').and.returnValue(1048580);
        const event: File[] = [file1, file2];
        component.maxFileSize = '1MB';
        component.selectHandler(event);
        expect(component.onChange).toHaveBeenCalledWith([file1]);
        expect(component.selectedFilesChanged.emit).toHaveBeenCalledWith([file1]);
        expect(component.selectedInvalidFiles.emit).toHaveBeenCalledWith([file2]);
    });

    it('should selectHandler with minFileSize', () => {
        spyOn(component, 'onChange').and.callThrough();
        spyOn(component.selectedFilesChanged, 'emit').and.callThrough();
        spyOn(component.selectedInvalidFiles, 'emit').and.callThrough();
        const file1: MockFile = new File([''], 'file1');
        spyOnProperty(file1, 'size').and.returnValue(1048580);
        const file2: MockFile = new File([''], 'file2');
        spyOnProperty(file2, 'size').and.returnValue(1024);
        const event: File[] = [file1, file2];
        component.minFileSize = '1MB';
        component.selectHandler(event);
        expect(component.onChange).toHaveBeenCalledWith([file1]);
        expect(component.selectedFilesChanged.emit).toHaveBeenCalledWith([file1]);
        expect(component.selectedInvalidFiles.emit).toHaveBeenCalledWith([file2]);
    });
    it('should selectHandler with minFileSize and maxFileSize', () => {
        spyOn(component, 'onChange').and.callThrough();
        spyOn(component.selectedFilesChanged, 'emit').and.callThrough();
        spyOn(component.selectedInvalidFiles, 'emit').and.callThrough();
        const file1: MockFile = new File([''], 'file1');
        spyOnProperty(file1, 'size').and.returnValue(104858);
        const file2: MockFile = new File([''], 'file2');
        spyOnProperty(file2, 'size').and.returnValue(1022);
        const event: File[] = [file1, file2];
        component.maxFileSize = '1MB';
        component.minFileSize = '1KB';
        component.selectHandler(event);
        expect(component.onChange).toHaveBeenCalledWith([file1]);
        expect(component.selectedFilesChanged.emit).toHaveBeenCalledWith([file1]);
        expect(component.selectedInvalidFiles.emit).toHaveBeenCalledWith([file2]);
    });
    it('should handle open', () => {
        spyOn(component.inputRef.nativeElement, 'click');
        component.open();
        expect(component.inputRef.nativeElement.click).toHaveBeenCalled();
    });

    it('should handle clear', () => {
        spyOn(component, 'onChange');
        component.clear();
        expect(component.inputRef.nativeElement.value).toEqual('');
        expect(component.onChange).toHaveBeenCalledWith([]);
    });
});
