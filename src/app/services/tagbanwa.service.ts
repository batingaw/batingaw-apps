import { Injectable } from '@angular/core';
import {TranslatorService} from "./translator.service";

@Injectable({
  providedIn: 'root'
})
export class TagbanwaService extends TranslatorService {

  protected override consonantCharMap = [
    { latin: "ng", unicode: "\u1765" },
    { latin: "k", unicode: "\u1763" },
    { latin: "c", unicode: "\u1763" },
    { latin: "q", unicode: "\u1763" },
    { latin: "g", unicode: "\u1764" },
    { latin: "t", unicode: "\u1766" },
    { latin: "d", unicode: "\u1767" },
    { latin: "r", unicode: "\u1767" },
    { latin: "n", unicode: "\u1768" },
    { latin: "p", unicode: "\u1769" },
    { latin: "f", unicode: "\u1769" },
    { latin: "b", unicode: "\u176A" },
    { latin: "v", unicode: "\u176A" },
    { latin: "m", unicode: "\u176B" },
    { latin: "y", unicode: "\u176C" },
    { latin: "l", unicode: "\u176D" },
    { latin: "w", unicode: "\u176E" },
    { latin: "s", unicode: "\u176F" },
    { latin: "z", unicode: "\u176F" },
    { latin: "h", unicode: "\u1770" },
    { latin: "j", unicode: "\u1767\u1774\u176C" },
    { latin: "x", unicode: "\u1763\u1774\u176F" },
  ]

  protected override vowelCharMap = [
    { latin: "a", unicode: "\u1760" },
    { latin: "i|e", unicode: "\u1761" },
    { latin: "o|u", unicode: "\u1762" },
  ]

  protected override kudlitMap: Map<string, string> = new Map(
      [
        ["a", ""],
        ["ie", "\u1772"],
        ["ou", "\u1773"],
        ["", "\u1774"],
      ]
  );

  constructor() { super() ;}
}
