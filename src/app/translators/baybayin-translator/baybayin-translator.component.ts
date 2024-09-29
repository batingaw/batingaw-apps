import {Component, OnInit} from '@angular/core';
import {BaybayinService} from "../../services/baybayin.service";
import { FormsModule } from '@angular/forms';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { faCopy, faExchangeAlt, faClose } from '@fortawesome/free-solid-svg-icons';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import {MetaService} from "../../services/meta.service";

@Component({
  selector: 'app-baybayin-translator',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule, ClipboardModule],
  templateUrl: './baybayin-translator.component.html',
  styleUrl: './baybayin-translator.component.scss'
})
export class BaybayinTranslatorComponent implements OnInit {
  inputText: string = '';
  translatedText: string = '';
  inputWriting: string = 'Filipino';
  outputWriting: string = 'Baybayin';
  inputTextMaxLimit: number = 1000;
  faCopy = faCopy;
  faExchangeAlt = faExchangeAlt;
  faClose = faClose;

  constructor(private baybayinService: BaybayinService,
              private metaService: MetaService,
              private clipboard: Clipboard) {
  }

  async ngOnInit() {
    this.metaService.UpdateTags({
      title: "Baybayin Translator",
      description: `Translate Filipino to Baybayin and Baybayin to Filipino`,
      image: 'assets/baybayin.png'
    });
  }

  translateText() {
    if (this.inputText.length > this.inputTextMaxLimit) {
      this.inputText= this.inputText.slice(0, this.inputTextMaxLimit);
    }
    if(this.inputWriting == "Filipino") {
      this.translatedText = this.baybayinService.translateToBaybayin(this.inputText);
    } else {
      this.translatedText = this.baybayinService.translateToFilipino(this.inputText);
    }
  }

  swapWriting() {
    if(this.inputWriting == "Filipino") {
      this.inputWriting = "Baybayin";
      this.outputWriting = "Filipino";
    } else {
      this.inputWriting = "Filipino";
      this.outputWriting = "Baybayin";
    }
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

}
