import { Routes } from '@angular/router';
import {TranslatorComponent} from "./translator/translator.component";
import {NotFoundComponent} from "./not-found/not-found.component";

export const routes: Routes = [
  {
    path: 'baybayin',
    component: TranslatorComponent,
  },
  {
    path: '',
    component: TranslatorComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
