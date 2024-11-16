import {Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { faCopy, faExchangeAlt, faClose } from '@fortawesome/free-solid-svg-icons';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import {CommonModule} from "@angular/common";
import {Constants} from "../shared/constants";
import {TranslatorFactoryService} from "../services/translator-factory.service";

@Component({
  selector: 'app-translator',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule, ClipboardModule, CommonModule],
  templateUrl: './translator.component.html',
  styleUrl: './translator.component.scss'
})
export class TranslatorComponent {
  inputText: string = '';
  translatedText: string = '';
  inputWriting: string = Constants.FILIPINO;
  outputWriting: string = Constants.SCRIPTS.BAYBAYIN;
  inputTextMaxLimit: number = 500;
  faCopy = faCopy;
  faExchangeAlt = faExchangeAlt;
  faClose = faClose;

  scripts = [Constants.SCRIPTS.BAYBAYIN, Constants.SCRIPTS.TAGBANWA];

  constructor(private translatorFactory: TranslatorFactoryService,
              private clipboard: Clipboard) {
  }

  translateText() {
    if (this.inputText.length > this.inputTextMaxLimit) {
      this.inputText= this.inputText.slice(0, this.inputTextMaxLimit);
    }
    if(this.inputWriting == Constants.FILIPINO) {
      const translatorService = this.translatorFactory.getTranslator(this.outputWriting);
      this.translatedText = translatorService.translateToScript(this.inputText);
    } else {
      const translatorService = this.translatorFactory.getTranslator(this.inputWriting);
      this.translatedText = translatorService.translateToLatin(this.inputText);
    }
  }

  isFilipino(writing: string): boolean {
    return writing == Constants.FILIPINO;
  }
  swapWriting() {
    let tmpInputWriting = this.inputWriting;
    this.inputWriting = this.outputWriting;
    this.outputWriting = tmpInputWriting;
    this.inputText = this.translatedText;
    this.translateText();
  }

  clearAllText() {
    this.inputText = '';
    this.translatedText = '';
  }

  hideClearButton() {
    return this.inputText == '';
  }

  hideCopyButton() {
    return this.translatedText == '';
  }

  getInputTextLength() {
    return this.inputText.length;
  }

  copyTranslatedText() {
    this.clipboard.copy(this.translatedText);
  }

  onScriptChange(): void {
    this.translateText();
  }
}
