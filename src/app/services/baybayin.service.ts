import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaybayinService {

  private latinBaybayinCharMap = [
    { latin: "ng", baybayin: "\u1705" },
    { latin: "k", baybayin: "\u1703" },
    { latin: "c", baybayin: "\u1703" },
    { latin: "q", baybayin: "\u1703" },
    { latin: "g", baybayin: "\u1704" },
    { latin: "t", baybayin: "\u1706" },
    { latin: "d", baybayin: "\u1707" },
    { latin: "r", baybayin: "\u1707" },
    { latin: "n", baybayin: "\u1708" },
    { latin: "p", baybayin: "\u1709" },
    { latin: "f", baybayin: "\u1709" },
    { latin: "b", baybayin: "\u170A" },
    { latin: "v", baybayin: "\u170A" },
    { latin: "m", baybayin: "\u170B" },
    { latin: "y", baybayin: "\u170C" },
    { latin: "l", baybayin: "\u170E" },
    { latin: "w", baybayin: "\u170F" },
    { latin: "s", baybayin: "\u1710" },
    { latin: "z", baybayin: "\u1710" },
    { latin: "h", baybayin: "\u1711" },
    { latin: "j", baybayin: "\u1707\u1714\u170C" },
    { latin: "x", baybayin: "\u1703\u1714\u1710" },
  ]

  private vowelMap = [
    { latin: "a", baybayin: "\u1700" },
    { latin: "i|e", baybayin: "\u1701" },
    { latin: "o|u", baybayin: "\u1702" },
  ]

  private kudlitMap: Map<string, string> = new Map(
      [
        ["a", ""],
        ["ie", "\u1712"],
        ["ou", "\u1713"],
        ["", "\u1714"],
      ]
  );

  private wordFixMap = [
    { from: "bubu", to: "bobo" },
    { from: "pidu", to: "pero" },
    { from: "pida", to: "pera" },
    { from: "puwidi", to: "puwede" },
    { from: "pwidi", to: "pwede" },
    { from: "puidi", to: "puede" },
    { from: "didi", to: "dede" },
    { from: "bunduk", to: "bundok" },
    { from: "dadwin", to: "darwin" },
    { from: "dabilas", to: "rabilas" },
    { from: "guapu", to: "guapo" },
    { from: "aku", to: "ako" },
    { from: "ku", to: "ko" },
    { from: "mu", to: "mo" },
    { from: "tayu", to: "tayo" },
    { from: "uu", to: "oo" },
    { from: "pinuy", to: "pinoy" },
  ]

      constructor() { }

  translateToBaybayin(inputText: string): string {
    let translatedText = inputText.toLowerCase();

    translatedText = this.translateFilipinoSyllables(translatedText, "a");
    translatedText = this.translateFilipinoSyllables(translatedText, "ie");
    translatedText = this.translateFilipinoSyllables(translatedText, "ou");
    translatedText = this.translateFilipinoVowels(translatedText);
    translatedText = this.translateFilipinoSingleConsonants(translatedText);

    return translatedText;
  }

  translateFilipinoSyllables(text: string, vowels: string) {
    let outputText = text;
    this.latinBaybayinCharMap.forEach(mapping => {
      let regex = new RegExp(`${mapping.latin}[${vowels}]`, 'g');
      outputText = outputText.replace(regex, mapping.baybayin + this.kudlitMap.get(vowels));
    });
    return outputText;
  }

  translateFilipinoVowels(text: string) {
    let outputText = text;
    this.vowelMap.forEach(mapping => {
      let regex = new RegExp(`${mapping.latin}`, 'g');
      outputText = outputText.replace(regex, mapping.baybayin);
    });
    return outputText;
  }

  translateFilipinoSingleConsonants(text: string) {
    let outputText = text;
    this.latinBaybayinCharMap.forEach(mapping => {
      let regex = new RegExp(`${mapping.latin}`, 'g');
      outputText = outputText.replace(regex, mapping.baybayin + this.kudlitMap.get(""));
    });
    return outputText;
  }

  translateToFilipino(inputText: string) {
    let translatedText = inputText.toLowerCase();

    translatedText = this.translateBaybayinSyllables(translatedText, "ie");
    translatedText = this.translateBaybayinSyllables(translatedText, "ou");
    translatedText = this.translateBaybayinSingleConsonants(translatedText);
    translatedText = this.translateBaybayinSyllables(translatedText, "a");
    translatedText = this.translateBaybayinVowels(translatedText);
    translatedText = this.fixTranslatedWords(translatedText);

    return translatedText;
  }

  translateBaybayinSyllables(text: string, vowels: string) {
    let outputText = text;
    this.latinBaybayinCharMap.forEach(mapping => {
      let regex = new RegExp(`${mapping.baybayin}${this.kudlitMap.get(vowels)}`, 'g');
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

  translateBaybayinVowels(text: string) {
    let outputText = text;
    this.vowelMap.forEach(mapping => {
      let regex = new RegExp(`${mapping.baybayin}`, 'g');
      outputText = outputText.replace(regex, this.getVowel(mapping.latin));
    });
    return outputText;
  }

  translateBaybayinSingleConsonants(text: string) {
    let outputText = text;
    this.latinBaybayinCharMap.forEach(mapping => {
      let regex = new RegExp(`${mapping.baybayin}${this.kudlitMap.get("")}`, 'g');
      outputText = outputText.replace(regex, mapping.latin);
    });
    return outputText;
  }

  fixTranslatedWords(text: string) {
    let outputText = text;
    this.wordFixMap.forEach(mapping => {
      const regex = new RegExp(`(^|\\s)${mapping.from}(\\s|$)`, 'gi');
      outputText = outputText.replace(regex, `$1${mapping.to}$2`);
    });
    return outputText;
  }
}
