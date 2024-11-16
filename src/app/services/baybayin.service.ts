import { Injectable } from '@angular/core';
import {TranslatorService} from "./translator.service";

@Injectable({
  providedIn: 'root'
})
export class BaybayinService extends TranslatorService {

  protected override consonantCharMap = [
    { latin: "ng", unicode: "\u1705" },
    { latin: "k", unicode: "\u1703" },
    { latin: "c", unicode: "\u1703" },
    { latin: "q", unicode: "\u1703" },
    { latin: "g", unicode: "\u1704" },
    { latin: "t", unicode: "\u1706" },
    { latin: "d", unicode: "\u1707" },
    { latin: "r", unicode: "\u1707" },
    { latin: "n", unicode: "\u1708" },
    { latin: "p", unicode: "\u1709" },
    { latin: "f", unicode: "\u1709" },
    { latin: "b", unicode: "\u170A" },
    { latin: "v", unicode: "\u170A" },
    { latin: "m", unicode: "\u170B" },
    { latin: "y", unicode: "\u170C" },
    { latin: "l", unicode: "\u170E" },
    { latin: "w", unicode: "\u170F" },
    { latin: "s", unicode: "\u1710" },
    { latin: "z", unicode: "\u1710" },
    { latin: "h", unicode: "\u1711" },
    { latin: "j", unicode: "\u1707\u1714\u170C" },
    { latin: "x", unicode: "\u1703\u1714\u1710" },
  ]

  protected override vowelCharMap = [
    { latin: "a", unicode: "\u1700" },
    { latin: "i|e", unicode: "\u1701" },
    { latin: "o|u", unicode: "\u1702" },
  ]

  protected override kudlitMap: Map<string, string> = new Map(
      [
        ["a", ""],
        ["ie", "\u1712"],
        ["ou", "\u1713"],
        ["", "\u1714"],
      ]
  );

  constructor() { super() ;}
}
