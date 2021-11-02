import { Graphics } from 'pixi.js';
import { ArenaConfig } from '../config';

export class Row extends Graphics {
    constructor() {
        super();
    }

    _build(rowHeight) {
        this.lineStyle(rowHeight, 0x222222);
    }
}
