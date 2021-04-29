import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookManagerComponent } from './book-manager.component';

describe('BookManagerComponent', () => {
  let component: BookManagerComponent;
  let fixture: ComponentFixture<BookManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
