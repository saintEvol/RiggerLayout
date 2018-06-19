/*
 * Copyright 2018 Yang Wu.
 *
 *	Licensed under the Apache License, Version 2.0 (the "License");
 *	you may not use this file except in compliance with the License.
 *	You may obtain a copy of the License at
 *
 *		http://www.apache.org/licenses/LICENSE-2.0
 *
 *		Unless required by applicable law or agreed to in writing, software
 *		distributed under the License is distributed on an "AS IS" BASIS,
 *		WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *		See the License for the specific language governing permissions and
 *		limitations under the License.
 */
/**
 * 布局项，最终被真正布局的项
 */
module riggerLayout {
	export abstract class LayoutItem<T> {
		public rectangle: Rectangle;
		public parent: Group;
		protected item: T;

		public initX: number;
		protected initY: number;
		protected initWidth: number;
		protected initHeight: number;
		protected initScaleX: number;
		protected initScaleY: number;
		protected initPivoitX: number;
		protected initPivotY: number;

		public get x(): number {
			return this.rectangle.x;
		}
		public set x(v: number) {
			if (v !== this.rectangle.x) {
				this.rectangle.x = v;
				// this.itemX = this.mapRectangleX();
			}
		}

		public get y(): number {
			return this.rectangle.y
		}
		public set y(v: number) {
			if (v !== this.rectangle.y) {
				this.rectangle.y = v;
				// this.itemY = this.mapRectangleY();
			}
		}

		protected mScaleX: number = 1;
		public get scaleX(): number {
			return this.mScaleX;
		}
		public set scaleX(v: number) {
			if (v !== this.mScaleX) {
				let old: number = this.rectangle.width / this.mScaleX;
				this.rectangle.width = old * v;
				this.mScaleX = v;
			}
		}

		protected mScaleY: number = 1;
		public get scaleY(): number {
			return this.mScaleY;
		}
		public set scaleY(v: number) {
			if (v !== this.mScaleY) {
				let old: number = this.rectangle.height / this.mScaleY;
				this.rectangle.height = old * v;
				this.mScaleY = v;
			}

			
		}

		// public offset(dx:number, dy:number):void{
		// 	this.rectangle.offset(dx, dy);
		// 	this.offsetX = dx;
		// 	this.offsetY = dy;
		// }

		public offsetX:number = 0;
		// public get offsetX():number{
		// 	return this.mOffsetX;
		// }
		public offsetY:number = 0;
		// public get offsetY():number{
		// 	return this.mOffsetY;
		// }

		public abstract get itemX(): number;
		public abstract set itemX(v: number);

		public abstract get itemY(): number;
		public abstract set itemY(v: number);

		public abstract get itemWidth(): number;
		public abstract set itemWidth(v: number);

		public abstract get itemHeight(): number;
		public abstract set itemHeight(v: number);

		public abstract get itemScaleX(): number;
		public abstract set itemScaleX(v: number);

		public abstract get itemScaleY(): number;
		public abstract set itemScaleY(v: number);

		public abstract get itemPivotX(): number;
		public abstract set itemPivotX(v: number);

		public abstract get itemPivotY(): number;
		public abstract set itemPivotY(v: number);

		public compareItem(item: any): boolean {
			return item === this.item;
		}

		setPos(x: number, y: number) {
			this.x = x;
			this.y = y;
		}

		setScale(x: number, y: number) {
			if (x === this.mScaleX && y === this.mScaleY) return;
			let oldX: number = this.rectangle.width / this.mScaleX;
			let oldY: number = this.rectangle.height / this.mScaleY;
			this.rectangle.width = oldX * x;
			this.rectangle.height = oldY * y;
			this.mScaleX = x;
			this.mScaleY = y;
		}

		// offSet(dx:number, dy:number):void{
		// 	this.x += dx;
		// 	this.y += dy;
		// }

		protected graphic: Laya.Sprite;
		constructor(item: any) {
			this.graphic = new Laya.Sprite();

			if (Laya.stage) {
				Laya.stage.addChildAt(this.graphic, 0);

			}
			this.item = item;
			this.mapItem();			
			this.initInfos();
			if (Laya.stage) {
				this.draw();

			}
		}

		dispose() {
			this.item = null;
			this.parent = null;
			this.rectangle.dispose();
		}

		protected draw(): void {
			this.graphic.graphics.clear();
			console.log(`draw item rect, x:${this.rectangle.x}, y:${this.rectangle.y}, width:${this.rectangle.width}, height:${this.rectangle.height}`);
			this.graphic.graphics.drawRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height, "green");
		}

		public setX(x: number): void {
			throw new Error(ErrorStrings.NotImplemented);
		}

		public setY(y: number): void {
			throw new Error(ErrorStrings.NotImplemented);
		}

		public setWidth(w: number): void {
			throw new Error(ErrorStrings.NotImplemented);
		}

		public setHeight(h: number): void {
			throw new Error(ErrorStrings.NotImplemented);
		}

		public setScaleX(sx: number): void {
			throw new Error(ErrorStrings.NotImplemented);
		}

		public setScaleY(sy: number): void {
			throw new Error(ErrorStrings.NotImplemented);
		}

		/**
		 * 测试显示矩形范围
		 */
		public measure() {
			this.mapItem();
		}

		protected initInfos() {
			if (!this.item) return;

			this.initX = this.itemX;
			this.initY = this.itemY;
			this.initWidth = this.itemWidth;
			this.initHeight = this.itemHeight;
			this.initScaleX = this.itemScaleX;
			this.initScaleY = this.itemScaleY;
		}

		/**
		 * 将显示项映射到矩形
		 */
		protected mapItem() {
			if (!this.rectangle) {
				this.rectangle = Rectangle.createInstance();
				this.rectangle.setEmpty();
			}

			if (!this.item) {
				this.rectangle.setEmpty();

				return;
			}

			this.rectangle.x = this.mapItemX();
			this.rectangle.y = this.mapItemY();
			this.rectangle.width = this.mapItemWidth();
			this.rectangle.height = this.mapItemHeight();
		}

		/**
		 * 将矩形的设置映射到实际显示对象上
		 */
		public mapRectangle(): void {
			if (!this.rectangle) return;
			if (!this.item) return;

			this.itemScaleX = this.mapRectangleWidth();
			this.itemScaleY = this.mapRectangleHeight();
			this.itemX = this.mapRectangleX();
			this.itemY = this.mapRectangleY();

			this.draw();
		}

		/**
		 * 通过X，pivotX, scaleX的关系计算出其映射到矩形上后的X坐标
		 */
		protected mapItemX(): number {
			return (this.itemX - this.itemPivotX) + this.itemPivotX * (1 - this.itemScaleX);
		}

		protected mapRectangleX(): number {
			return this.rectangle.x - this.itemPivotX * (1 - this.itemScaleX) + this.itemPivotX;
		}

		/**
		 * 通过Y，pivotY, scaleY的关系计算出其映射到矩形上后的Y坐标
		 * 
		 */
		protected mapItemY(): number {
			return (this.itemY - this.itemPivotY) + this.itemPivotY * (1 - this.itemScaleY);
		}

		protected mapRectangleY(): number {
			return this.rectangle.y - this.itemPivotY * (1 - this.itemScaleY) + this.itemPivotY;
		}

		protected mapItemWidth(): number {
			return this.rectangle.width = this.itemWidth * this.itemScaleX;
		}

		protected mapRectangleWidth(): number {
			return this.rectangle.width / this.itemWidth;
		}

		protected mapItemHeight(): number {
			return this.rectangle.height = this.itemHeight * this.itemScaleY;
		}

		protected mapRectangleHeight(): number {
			return this.rectangle.height / this.itemHeight;
		}
	}
}