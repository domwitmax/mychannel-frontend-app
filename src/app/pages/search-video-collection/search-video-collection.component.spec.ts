import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVideoCollectionComponent } from './search-video-collection.component';

describe('SearchVideoCollectionComponent', () => {
  let component: SearchVideoCollectionComponent;
  let fixture: ComponentFixture<SearchVideoCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchVideoCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchVideoCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
