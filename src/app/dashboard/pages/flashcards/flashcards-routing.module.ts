import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTES_FLASHCARDS } from './constants/flashcards.constants';
import { FlashcardsComponent } from './flashcards.component';

const routes: Routes = [
  {
    path: '',
    component: FlashcardsComponent,
  },
  {
    path: ROUTES_FLASHCARDS.GAME,
    loadChildren: () =>
      import('./pages/flashcards-game/flashcards-game.module').then(
        (m) => m.FlashcardsGameModule
      ),
  },
  {
    path: ROUTES_FLASHCARDS.LIST,
    loadChildren: () =>
      import('./pages/flashcards-list/flashcards-list.module').then(
        (m) => m.FlashcardsListModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlashcardsRoutingModule {}
