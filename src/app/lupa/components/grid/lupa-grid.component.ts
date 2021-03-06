import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { GridItem } from './grid-item/grid-item';

export interface CheckedMap {
  [id: string]: boolean;
}

@Component({
  selector: 'lupa-grid',
  templateUrl: './lupa-grid.component.html',
  styleUrls: ['./lupa-grid.component.css'],
})
export class GridComponent implements OnInit, OnChanges {
  @Input() items: GridItem[];
  @Output() loadItems = new EventEmitter();
  @Output() selectItem = new EventEmitter<{ data: any, isChecked: boolean }>();

  layout: string;
  checked: CheckedMap;
  onSelectMode: boolean;
  selectedCount: number;
  lastSelectedCount: number;

  constructor() { }

  ngOnInit() {
    this.layout = 'grid';
    this.checked = {};
    this.selectedCount = 0;
    this.lastSelectedCount = 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items && this.onSelectMode) {
      this.items.forEach(item => item.data.isHover = true);
    }
  }

  onSelectItem(selectedItem: GridItem) {
    this.lastSelectedCount = this.selectedCount;
    if (!this.checked[selectedItem.data.id]) {
      this.selectedCount += 1;
    } else {
      this.selectedCount -= 1;
    }

    if (this.selectedCount > 0 && this.lastSelectedCount === 0) {
      this.onSelectMode = true;
      this.items.forEach(item => item.data.isHover = true);
    }

    if (this.selectedCount === 0 && this.lastSelectedCount > 0) {
      this.onSelectMode = false;
      this.items.forEach(item => item.data.isHover = false);
      selectedItem.data.isHover = true;
    }

    const emitData = {
      data: selectedItem.data,
      isChecked: !this.checked[selectedItem.data.id],
      selectedCount: this.selectedCount,
    };

    this.selectItem.emit(emitData);
  }

  trackingItem(index: any, item: any) {
    return [index, item.data.id].join('');
  }

  onScroll() {
    this.loadItems.emit();
  }

}
