import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaybayinService {

  private latinBaybayinCharMap = [
    { latin: "ng", baybayin: "\u1705" },
    { latin: "k", baybayin: "\u1703" },
    { latin: "g", baybayin: "\u1704" },
    { latin: "t", baybayin: "\u1706" },
    { latin: "d", baybayin: "\u1707" },
    { latin: "r", baybayin: "\u1707" },
    { latin: "n", baybayin: "\u1708" },
    { latin: "p", baybayin: "\u1709" },
    { latin: "f", baybayin: "\u1709" },
    { latin: "b", baybayin: "\u170A" },
    { latin: "m", baybayin: "\u170B" },
    { latin: "y", baybayin: "\u170C" },
    { latin: "l", baybayin: "\u170E" },
    { latin: "w", baybayin: "\u170F" },
    { latin: "s", baybayin: "\u1710" },
    { latin: "h", baybayin: "\u1711" },
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

  translateToFilipino2(inputText: string) {
    let translatedText = inputText;

    const multiCharMap = [
      { regex: /\u1705\u1712/g, replace: "ngi" },
      { regex: /\u1705\u1713/g, replace: "ngu" },
      { regex: /\u1705\u1714/g, replace: "ng" },
      { regex: /\u1705/g, replace: "nga" }
    ];

    const charMapWithVowels = [
      { regex: /\u1703\u1712/g, replace: "ki" }, { regex: /\u1703\u1713/g, replace: "ku" }, { regex: /\u1703/g, replace: "ka" },
      { regex: /\u1704\u1712/g, replace: "gi" }, { regex: /\u1704\u1713/g, replace: "gu" }, { regex: /\u1704/g, replace: "ga" },
      { regex: /\u1706\u1712/g, replace: "ti" }, { regex: /\u1706\u1713/g, replace: "tu" }, { regex: /\u1706/g, replace: "ta" },
      { regex: /\u1707\u1712/g, replace: "di" }, { regex: /\u1707\u1713/g, replace: "du" }, { regex: /\u1707/g, replace: "da" },
      { regex: /\u1708\u1712/g, replace: "ni" }, { regex: /\u1708\u1713/g, replace: "nu" }, { regex: /\u1708/g, replace: "na" },
      { regex: /\u1709\u1712/g, replace: "pi" }, { regex: /\u1709\u1713/g, replace: "pu" }, { regex: /\u1709/g, replace: "pa" },
      { regex: /\u170A\u1712/g, replace: "bi" }, { regex: /\u170A\u1713/g, replace: "bu" }, { regex: /\u170A/g, replace: "ba" },
      { regex: /\u170B\u1712/g, replace: "mi" }, { regex: /\u170B\u1713/g, replace: "mu" }, { regex: /\u170B/g, replace: "ma" },
      { regex: /\u170C\u1712/g, replace: "yi" }, { regex: /\u170C\u1713/g, replace: "yu" }, { regex: /\u170C/g, replace: "ya" },
      { regex: /\u170E\u1712/g, replace: "li" }, { regex: /\u170E\u1713/g, replace: "lu" }, { regex: /\u170E/g, replace: "la" },
      { regex: /\u170F\u1712/g, replace: "wi" }, { regex: /\u170F\u1713/g, replace: "wu" }, { regex: /\u170F/g, replace: "wa" },
      { regex: /\u1710\u1712/g, replace: "si" }, { regex: /\u1710\u1713/g, replace: "su" }, { regex: /\u1710/g, replace: "sa" },
      { regex: /\u1711\u1712/g, replace: "hi" }, { regex: /\u1711\u1713/g, replace: "hu" }, { regex: /\u1711/g, replace: "ha" }
    ];

    const charMap = [
      { regex: /\u1700/g, replace: "a" }, { regex: /\u1701/g, replace: "i" }, { regex: /\u1702/g, replace: "u" },
      { regex: /\u1703\u1714/g, replace: "k" }, { regex: /\u1704\u1714/g, replace: "g" }, { regex: /\u1706\u1714/g, replace: "t" },
      { regex: /\u1707\u1714/g, replace: "d" }, { regex: /\u1708\u1714/g, replace: "n" }, { regex: /\u1709\u1714/g, replace: "p" },
      { regex: /\u170A\u1714/g, replace: "b" }, { regex: /\u170B\u1714/g, replace: "m" }, { regex: /\u170C\u1714/g, replace: "y" },
      { regex: /\u170E\u1714/g, replace: "l" }, { regex: /\u170F\u1714/g, replace: "w" }, { regex: /\u1710\u1714/g, replace: "s" },
      { regex: /\u1711\u1714/g, replace: "h" }
    ];

    multiCharMap.forEach(mapping => {
      translatedText = translatedText.replace(mapping.regex, mapping.replace);
    });

    charMap.forEach(mapping => {
      translatedText = translatedText.replace(mapping.regex, mapping.replace);
    });

    charMapWithVowels.forEach(mapping => {
      translatedText = translatedText.replace(mapping.regex, mapping.replace);
    });



    return translatedText;
  }

}
