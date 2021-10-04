import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsGameComponent } from './flashcards-game.component';

describe('FlashcardsGameComponent', () => {
  let component: FlashcardsGameComponent;
  let fixture: ComponentFixture<FlashcardsGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashcardsGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardsGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
