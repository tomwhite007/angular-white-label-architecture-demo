import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'acme-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
  constructor(private vcr: ViewContainerRef) {}

  ngAfterViewInit(): void {
    setTimeout(async () => {
      const { LazySvgSpriteSheetComponent } = await import(
        './lazy-svg-sprite-sheet/lazy-svg-sprite-sheet.component'
      );
      this.vcr.createComponent(LazySvgSpriteSheetComponent);
    });
  }
}
