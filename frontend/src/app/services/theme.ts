import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private fontSubject = new BehaviorSubject<string>('plus-jakarta');
  font$ = this.fontSubject.asObservable();

  private fonts: Record<string, string> = {
    'plus-jakarta': "'Plus Jakarta Sans', sans-serif",
    'work-sans': "'Work Sans', sans-serif",
    'nunito': "'Nunito', sans-serif",
    'quicksand': "'Quicksand', sans-serif",
    'balthazar': "'Balthazar', serif"
  };

  setFont(fontId: string) {
    const fontFamily = this.fonts[fontId];
    if (fontFamily) {
      document.documentElement.style.setProperty('--font-family', fontFamily);
      this.fontSubject.next(fontId);
    }
  }

  getCurrentFont(): string {
    return this.fontSubject.value;
  }
}
