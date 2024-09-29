import { Routes } from '@angular/router';
import {BaybayinTranslatorComponent} from "./translators/baybayin-translator/baybayin-translator.component";
import {BuhidTranslatorComponent} from "./translators/buhid-translator/buhid-translator.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {NotFoundComponent} from "./not-found/not-found.component";

export const routes: Routes = [
  {
    path: 'baybayin',
    component: BaybayinTranslatorComponent,
  },
  {
    path: 'buhid',
    component: BuhidTranslatorComponent,
  },
  {
    path: '',
    component: BaybayinTranslatorComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
