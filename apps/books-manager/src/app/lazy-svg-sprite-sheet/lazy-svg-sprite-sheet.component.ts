import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './lazy-svg-sprite-sheet.component.html',
  styleUrls: ['./lazy-svg-sprite-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazySvgSpriteSheetComponent {}
