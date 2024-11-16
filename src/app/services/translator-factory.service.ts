import { Injectable } from '@angular/core';
import {BaybayinService} from "./baybayin.service";
import {TagbanwaService} from "./tagbanwa.service";
import {TranslatorService} from "./translator.service";
import {Constants} from "../shared/constants";

@Injectable({
  providedIn: 'root'
})
export class TranslatorFactoryService {

  constructor(
      private baybayinService: BaybayinService,
      private tagbanwaService: TagbanwaService
  ) {}

  getTranslator(type: string): TranslatorService {
    switch (type) {
      case Constants.SCRIPTS.BAYBAYIN:
        return this.baybayinService;
      case Constants.SCRIPTS.TAGBANWA:
        return this.tagbanwaService;
      default:
        throw new Error('Invalid translator');
    }
  }
}
