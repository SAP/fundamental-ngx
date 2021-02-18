import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThumbnailDetailsComponent } from './thumbnail-details.component';
import { DialogRef } from '@fundamental-ngx/core';
import { Media } from '../thumbnail.component';
import { By } from '@angular/platform-browser';
describe('ThumbnailDetailsComponent', () => {
  let component: ThumbnailDetailsComponent;
  let fixture: ComponentFixture<ThumbnailDetailsComponent>;
  const dialogRef = new DialogRef();

  const selectedMedia: Media = {
    title: 'Nature Details',
    thumbnailUrl: 'http://lorempixel.com/400/400/nature',
    mediaType: 'image',
    mediaUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
    alt: 'Failed to load http://lorempixel.com/400/400/nature',
    label: 'nature2'
}
const mediaList: Media[] = [{
    title: 'Nature Details',
    thumbnailUrl: 'http://lorempixel.com/400/400/nature',
    mediaType: 'image',
    mediaUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
    alt: 'Failed to load http://lorempixel.com/400/400/nature',
    label: 'nature2'
}]
  dialogRef.data = {
    selectedMedia:  selectedMedia,
    mediaList: mediaList,
    rtl: false,
    maxImages: 5
}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThumbnailDetailsComponent ],
      providers: [{ provide: DialogRef, useValue: dialogRef }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
