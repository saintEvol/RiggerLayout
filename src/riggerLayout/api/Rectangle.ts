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
 * Rectangle 对象是按其位置（由它左上角的点 (x, y) 确定）以及宽度和高度定义的区域。
 * Rectangle 类的 x、y、width 和 height 属性相互独立；更改一个属性的值不会影响其他属性。
 * 但是，right 和 bottom 属性与这四个属性是整体相关的。
 * 例如，如果更改 right 属性的值，则 width属性的值将发生变化；如果更改 bottom 属性，则 height 属性的值将发生变化
 */
module riggerLayout {
	export class Rectangle implements IRecoverable {
		public static readonly sign:string = "___Rectangle_";
		public static createInstance(): Rectangle {
			return Pool.getItemByClass<Rectangle>(Rectangle.sign, Rectangle);
		}

		/**
		 * 矩形左上角的 x 坐标 
		 */
		private mX:number = 0;
		public get x(): number{
			return this.mX;
		}
		public set x(v:number){
			this.mX = v;
			this.updateCorner();
		}

		/**
		 * 矩形左上角的 y 坐标 
		 */
		private mY:number = 0;
		public get y(): number{
			return this.mY;
		}
		public set y(v:number){
			this.mY = v;
			this.updateCorner();
		}

		/**
		 * 矩形的宽度（以像素为单位） 
		 */
		private mWidth:number = 0;
		public get width(): number{
			return this.mWidth;
		}
		public set width(v:number){
			this.mWidth = v;
			this.updateCorner();
		}

		/**
		 * 高度，以像素为单位
		 */
		private mHeight: number = 0;
		public get height():number{
			return this.mHeight;
		}
		public set height(v:number){
			this.mHeight = v;
			this.updateCorner();
		}

		/**
		 * 矩形左上角的 x 坐标 
		 */
		get left(): number {
			return this.topLeft.x;
		}

		/**
		 * Y与height属性的和
		 */
		get bottom(): number {
			return this.y + this.height;
		}

		/**
		 * x 和 width 属性的和 
		 */
		get right(): number {
			return this.x + this.width;
		}

		/**
		 * 矩形左上角的 y 坐标 
		 */
		get top(): number {
			return this.topLeft.y;
		}

		/**
		 * 由该点的 x 和 y 坐标确定的 Rectangle 对象左上角的位置 
		 */
		topLeft: Point;

		/**
		 * 由 right 和 bottom 属性的值确定的 Rectangle 对象的右下角的位置 
		 */
		bottomRight: Point;

		/**
		 * 判断两个矩形是否相等
		 * @param rect 
		 */
		public equal(rect:Rectangle):boolean{
			return this.x === rect.x && this.y === rect.y && this.width === rect.width && this.height === rect.height;
		}

		/**
		 * 设置矩形的属性
		 * @param x 
		 * @param y 
		 * @param width 
		 * @param height 
		 */
		public setTo(x: number, y: number, width: number, height: number): Rectangle {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;

			return this;
		}

		public isEmpty(): boolean {
			return this.x === 0 && this.y === 0 && this.width === 0 && this.height === 0;
		}

		public setEmpty(): void {
			this.x = this.y = this.width = this.height = 0;
		}

		public copyFrom(rect:Rectangle):Rectangle{
			this.x = rect.x;
			this.y = rect.y;
			this.width = rect.width;
			this.height = rect.height;

			return this;
		}

		public clone(): Rectangle {
			let rect: Rectangle = Rectangle.createInstance(); 
			rect.setTo(this.x, this.y, this.width, this.height);
			return rect;
		}

		public offset(dx:number, dy:number):void{
			this.x += dx;
			this.y += dy;
		}

		public contains(x: number, y: number): boolean {
			return x >= this.left && x <= this.right && y >= this.top && y <= this.bottom;
		}

		public containsPoint(point: Point): boolean {
			return this.contains(point.x, point.y);
		}

		public containsRect(rect: Rectangle): boolean {
			return this.containsPoint(rect.topLeft) && this.containsPoint(rect.bottomRight);
		}

		/**
		 * 合并两个矩形并形成一个新矩形(此操作不会改变原来的矩形)
		 * @param toUnion
		 */
		public union(toUnion: Rectangle): Rectangle {
			if (this.containsRect(toUnion)) return this.clone();
			if (toUnion.containsRect(this)) {
				return toUnion.clone();
			}

			let ret: Rectangle = Rectangle.createInstance();
			ret.x = Math.min(this.x, toUnion.x);
			ret.y = Math.min(this.y, toUnion.y);

			let tempLeft:number = Math.min(this.left, toUnion.left);
			let tempRight:number = Math.max(this.right, toUnion.right);
			ret.width = tempRight - tempLeft;
			
			let tempTop:number = Math.min(this.top, toUnion.top);
			let tempBottom:number = Math.max(this.bottom, toUnion.bottom);
			ret.height = tempBottom - tempTop;

			return ret;
		}

		constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
			this.mX = 0;
			this.mY = 0;
			this.mWidth = 0;
			this.mHeight = 0;

			this.topLeft = Point.createInstance();
			this.bottomRight = Point.createInstance();

			this.updateCorner();
		}

		recover(): void {
			Pool.recover(Rectangle.sign, this);
		}


		dispose(): void {
			this.bottomRight.recover();
			this.bottomRight = null;

			this.topLeft.recover();
			this.topLeft = null;
		}

		private updateCorner():void{
			this.topLeft.x = this.x;
			this.topLeft.y = this.y;

			this.bottomRight.x = this.x + this.width;
			this.bottomRight.y = this.y + this.height;
		}
	}
}