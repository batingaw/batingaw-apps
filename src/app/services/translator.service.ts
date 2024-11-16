import { Injectable } from '@angular/core';

export interface CharMap {
  latin: string;
  unicode: string;
}

@Injectable({
  providedIn: 'root'
})
export abstract class TranslatorService {

  protected consonantCharMap: CharMap[] = [];
  protected vowelCharMap: CharMap[] = [];
  protected kudlitMap: Map<string, string> = new Map();

  private wordFixMap = [
    { from: "bubu", to: "bobo" }, { from: "pidu", to: "pero" }, { from: "pida", to: "pera" }, { from: "puwidi", to: "puwede" },
    { from: "pwidi", to: "pwede" }, { from: "puidi", to: "puede" }, { from: "didi", to: "dede" }, { from: "bunduk", to: "bundok" },
    { from: "dadwin", to: "darwin" }, { from: "dabilas", to: "rabilas" }, { from: "albin", to: "alvin" },
    { from: "guapu", to: "guapo" }, { from: "aku", to: "ako" }, { from: "ku", to: "ko" }, { from: "mu", to: "mo" },
    { from: "tayu", to: "tayo" }, { from: "uu", to: "oo" }, { from: "pu", to: "po" },
    { from: "pinuy", to: "pinoy" }, { from: "kubu", to: "kubo" }, { from: "duun", to: "doon" }, { from: "sadi-sadi", to: "sari-sari" },
    { from: "talung", to: "talong" }, { from: "sigadilyas", to: "sigarilyas" }, { from: "kundul", to: "kundol" },
    { from: "patula", to: "patola" }, { from: "mayduun", to: "mayroon" }, { from: "labanus", to: "labanos" },
    { from: "pudu", to: "puro" }, { from: "anitu", to: "anito" }, { from: "ninunu", to: "ninuno" },
  ]

  protected constructor() { }

  translateToScript(inputText: string): string {
    let translatedText = inputText.toLowerCase();

    translatedText = this.translateLatinSyllables(translatedText, "a");
    translatedText = this.translateLatinSyllables(translatedText, "ie");
    translatedText = this.translateLatinSyllables(translatedText, "ou");
    translatedText = this.translateLatinVowels(translatedText);
    translatedText = this.translateLatinSingleConsonants(translatedText);

    return translatedText;
  }

  translateLatinSyllables(text: string, vowels: string) {
    let outputText = text;
    this.consonantCharMap.forEach(mapping => {
      let regex = new RegExp(`${mapping.latin}[${vowels}]`, 'g');
      outputText = outputText.replace(regex, mapping.unicode + this.kudlitMap.get(vowels));
    });
    return outputText;
  }

  translateLatinVowels(text: string) {
    let outputText = text;
    this.vowelCharMap.forEach(mapping => {
      let regex = new RegExp(`${mapping.latin}`, 'g');
      outputText = outputText.replace(regex, mapping.unicode);
    });
    return outputText;
  }

  translateLatinSingleConsonants(text: string) {
    let outputText = text;
    this.consonantCharMap.forEach(mapping => {
      let regex = new RegExp(`${mapping.latin}`, 'g');
      outputText = outputText.replace(regex, mapping.unicode + this.kudlitMap.get(""));
    });
    return outputText;
  }

  translateToLatin(inputText: string) {
    let translatedText = inputText.toLowerCase();

    translatedText = this.translateUnicodeSyllables(translatedText, "ie");
    translatedText = this.translateUnicodeSyllables(translatedText, "ou");
    translatedText = this.translateUnicdeSingleConsonants(translatedText);
    translatedText = this.translateUnicodeSyllables(translatedText, "a");
    translatedText = this.translateUnicodeVowels(translatedText);
    translatedText = this.fixTranslatedWords(translatedText);

    return translatedText;
  }

  translateUnicodeSyllables(text: string, vowels: string) {
    let outputText = text;
    this.consonantCharMap.forEach(mapping => {
      let regex = new RegExp(`${mapping.unicode}${this.kudlitMap.get(vowels)}`, 'g');
      outputText = outputText.replace(regex, mapping.latin + this.getVowel(vowels));
    });
    return outputText;
  }

  getVowel(vowels: string): string {
    if(vowels == "ie" || vowels == "i|e") {
      return "i";
    }
    if(vowels == "ou" || vowels == "o|u") {
      return "u";
    }
    return vowels;
  }

  translateUnicodeVowels(text: string) {
    let outputText = text;
    this.vowelCharMap.forEach(mapping => {
      let regex = new RegExp(`${mapping.unicode}`, 'g');
      outputText = outputText.replace(regex, this.getVowel(mapping.latin));
    });
    return outputText;
  }

  translateUnicdeSingleConsonants(text: string) {
    let outputText = text;
    this.consonantCharMap.forEach(mapping => {
      let regex = new RegExp(`${mapping.unicode}${this.kudlitMap.get("")}`, 'g');
      outputText = outputText.replace(regex, mapping.latin);
    });
    return outputText;
  }

  fixTranslatedWords(text: string) {
    let outputText = text;
    this.wordFixMap.forEach(mapping => {
      const regex = new RegExp(`(^|\\W)${mapping.from}(\\W|$)`, 'gi');
      outputText = outputText.replace(regex, `$1${mapping.to}$2`);
    });
    return outputText;
  }
}
