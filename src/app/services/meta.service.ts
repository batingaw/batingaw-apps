import { Injectable } from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(private title: Title,
              private meta: Meta) { }

  UpdateTags(tags: any){
    this.title.setTitle(tags?.title)
    this.meta.updateTag({ name: 'description', content: tags?.description })
    this.meta.updateTag({ property: 'og:title', content: tags?.title });
    this.meta.updateTag({ property: 'og:description', content: tags?.description });
    this.meta.updateTag({ property: 'og:image', content: tags?.image });
  }
}
