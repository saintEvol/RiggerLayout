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
* 自动布局容器基类
*/
module riggerLayout {
	export class Group extends LayoutItem<any>{
		name: string | number;

		/**
		 * 当子对象为时是否释放
		 */
		doNotDestroy: boolean = false;

		/**
		 * 距父容器左边距离
		 * 格式:数字 -> 50, 字符串 -> "50%" | "50" | LayoutSpec | LayoutSpec[]
		 */
		public set left(v: LayoutSpec | LayoutSpec[] | any) {
			this.mLeft = this.adaptLayoutSpec(v);
		}
		public get left(): LayoutSpec | LayoutSpec[] | any {
			return this.mLeft;
		}
		protected mLeft: LayoutSpec | LayoutSpec[] | any;

		/**
		 * 距父级容器底部距离
		 * 格式:数字 -> 50, 字符串 -> "50%" | "50" | LayoutSpec | LayoutSpec[]
		 */
		public set bottom(v: LayoutSpec | LayoutSpec[] | any) {
			this.mBottom = this.adaptLayoutSpec(v);
		}
		public get bottom(): LayoutSpec | LayoutSpec[] | any {
			return this.mBottom;
		}
		mBottom: LayoutSpec | LayoutSpec[] | any;

		/**
		 * 距父级容器右边的距离
		 * 格式:数字 -> 50, 字符串 -> "50%" | "50" | LayoutSpec | LayoutSpec[]
		 */
		public set right(v: LayoutSpec | LayoutSpec[] | any) {
			this.mRight = this.adaptLayoutSpec(v);
		}
		public get right(): LayoutSpec | LayoutSpec[] | any {
			return this.mRight;
		}
		mRight: LayoutSpec | LayoutSpec[] | any;

		/**
		 * 距父级窗口顶部的距离
		 * 格式:数字 -> 50, 字符串 -> "50%" | "50" | LayoutSpec | LayoutSpec[]
		 */
		public set top(v: LayoutSpec | LayoutSpec[] | any) {
			this.mTop = this.adaptLayoutSpec(v);
		}
		public get top(): LayoutSpec | LayoutSpec[] | any {
			return this.mTop;
		}
		mTop: LayoutSpec | LayoutSpec[] | any;

		/**
		 * 宽
		 * 格式:数字 -> 50, 字符串 -> "50%" | "50" | LayoutSpec | LayoutSpec[]
		 */
		public set width(v: LayoutSpec | LayoutSpec[] | any) {
			this.mWidth = this.adaptLayoutSpec(v);
		}
		public get width(): LayoutSpec | LayoutSpec[] | any {
			return this.mWidth;
		}
		mWidth: LayoutSpec | LayoutSpec[] | any;

		/**
		 * 高
		 * 格式:数字 -> 50, 字符串 -> "50%" | "50" | LayoutSpec | LayoutSpec[]
		 */
		public set height(v: LayoutSpec | LayoutSpec[] | any) {
			this.mHeight = this.adaptLayoutSpec(v);
		}
		public get height(): LayoutSpec | LayoutSpec[] | any {
			return this.mHeight
		}
		mHeight: LayoutSpec | LayoutSpec[] | any;

		/**
		 * 在父级容器中距离X轴中心的位置
		 * 格式:数字 -> 50, 字符串 -> "50%" | "50" | LayoutSpec | LayoutSpec[]
		 */
		public set horizontalCenter(v: LayoutSpec | LayoutSpec[] | any) {
			this.mHorizontalCenter = this.adaptLayoutSpec(v);
		}
		public get horizontalCenter(): LayoutSpec | LayoutSpec[] | any {
			return this.mHorizontalCenter;
		}
		mHorizontalCenter: LayoutSpec | LayoutSpec[] | any;

		/**
		 * 在父级容器中距离Y轴中心的位置
		 */
		public set verticalCenter(v: LayoutSpec | LayoutSpec[] | any) {
			this.mVerticalCenter = this.adaptLayoutSpec(v);
		}
		public get verticalCenter(): LayoutSpec | LayoutSpec[] | any {
			return this.mVerticalCenter;
		}
		mVerticalCenter: LayoutSpec | LayoutSpec[] | any;

		/**
		 * 包含的子项
		 */
		elementsContent: LayoutItem<any>[];

		/**
		 * 子项数量
		 */
		get numElements(): number {
			if (this.elementsContent) return this.elementsContent.length;
			return 0;
		}

		/**
		 * 将不同格式的布局规范适配成统一格式
		 */
		public adaptLayoutSpec(v: number | string | LayoutSpec | LayoutSpec[]): LayoutSpec | LayoutSpec[] {
			if (Utils.isString(v) || Utils.isNumber(v)) {
				return LayoutSpec.create(null, null, v);
			}

			return v;
		}

		/**
		 * 此容器的布局对象
		 */
		protected mLayout: LayoutBase;
		public get layout(): LayoutBase {
			if (!this.mLayout) this.layout = new LayoutBase();
			return this.mLayout;
		}
		public set layout(v: LayoutBase) {
			if (this.mLayout) this.mLayout.dispose();
			this.mLayout = v;
			this.mLayout.target = this;
			this.mLayout.measure();
		}

		public get x() {
			return this.rectangle.x;
		}
		public set x(v: number) {
			if (v !== this.rectangle.x) {
				this.rectangle.x = v;
			}
		}

		public get y() {
			return this.rectangle.y;
		}
		public set y(v: number) {
			if (v !== this.rectangle.y) {
				this.rectangle.y = v;
			}
		}

		public get scaleX(): number {
			return this.mScaleX;
		}
		public set scaleX(v: number) {
			if (v !== this.mScaleX) {
				this.setScale(v, this.mScaleY);
			}
		}

		public get scaleY(): number {
			return this.mScaleY;
		}
		public set scaleY(v: number) {
			if (v !== this.mScaleY) {
				this.setScale(this.mScaleX, v);
			}
		}

		public setScale(x: number, y: number): void {
			this.scaleChildren(x, y);
			super.setScale(x, y);

		}

		public setPos(x: number, y: number) {
			this.offsetChildren(x - this.x, y - this.y);
			this.x = x;
			this.y = y;
		}

		protected mitemX: number = 0;
		public get itemX(): number {
			return this.mitemX;
		}
		public set itemX(v: number) {
			this.mitemX = v;
		}

		protected mItemY: number = 0;
		public get itemY(): number {
			return this.mItemY;
		}
		public set itemY(v: number) {
			this.mItemY = v;
		}

		protected mItemWidth: number = 0;
		public get itemWidth(): number {
			return this.mItemWidth;
		}
		public set itemWidth(v: number) {
			this.mItemWidth = v;
		}

		protected mItemHeight: number = 0;
		public get itemHeight(): number {
			return this.mItemHeight;
		}
		public set itemHeight(v: number) {
			this.mItemHeight = v;
		}

		protected mItemScaleX: number = 1;
		public get itemScaleX(): number {
			return this.mItemScaleX;
		}
		public set itemScaleX(v: number) {
			this.mItemScaleX = v;
		}

		protected mItemScaleY = 1;
		public get itemScaleY(): number {
			return this.mItemScaleY;
		}
		public set itemScaleY(v: number) {
			this.mItemScaleY = v;
		}

		protected mItemPivotX: number = 0;
		public get itemPivotX(): number {
			return this.mItemPivotX;
		}
		public set itemPivotX(v: number) {
			this.mItemPivotX = v;
		}

		protected mItemPivotY: number = 0;
		public get itemPivotY(): number {
			return this.mItemPivotY;
		}
		public set itemPivotY(v: number) {
			this.mItemPivotY = v;
		}

		// protected realWidthType: ValueType;
		public realWidth: number;
		// protected realHeightType: ValueType;
		public realHeight: number;
		public realX: number;
		public realY: number;

		/**
		 * 获取一个布局元素子项
		 * @param index 
		 */
		getElementAt(index: number): LayoutItem<any> {
			if (!this.elementsContent || this.elementsContent.length <= 0) return null;
			return this.elementsContent[index];
		}

		/**
		 * 通过名字获取元素
		 * @param name 
		 */
		getElementByName(name: string | number): LayoutItem<any> {
			let eles: LayoutItem<any>[] = this.elementsContent;
			let len: number = eles.length;
			for (var i: number = 0; i < len; ++i) {
				if (name === eles[i].name) return eles[i];
			}

			return null;
		}

		protected measuredWidth: number = 0;
		protected measuredHeight: number = 0;
		/**
		 * 设置测量结果
		 * @param width 
		 * @param height 
		 */
		setMeasuredSize(width: number, height: number): void {
			this.measuredWidth = width;
			this.measuredHeight = height;
		}

		/**
		 * 将一个显示对象添加到布局组
		 * @param item 
		 */
		addChild(item: any): void {
			if (item instanceof LayoutItem) {
				this.doAddChild(item);
			}
			else {
				this.doAddChild(new GlobalSettings.realLayoutItemClass(item));
			}

			// 延迟
			this.onChildRectangleChange();
			// Laya.timer.callLater(this, this.onChildRectangleChange);
		}

		/**
		 * 从所有子级中移除对象
		 * @param item 
		 */
		remove(item: any): boolean {
			if (!item) return false;
			if (!this.elementsContent || this.numElements <= 0) return false;

			let ret: boolean = this.doRemove(item);
			if (this.numElements <= 0 && !this.doNotDestroy) {
				if (this.parent) this.parent.remove(this);
			}

			return ret;

		}

		/**
		 * 布局组中有子对象的矩形区域发生了变化
		 */
		onChildRectangleChange(): void {
			this.measure();
			let oldRect: Rectangle = Rectangle.createInstance().copyFrom(this.rectangle);
			if (!oldRect.equal(this.rectangle) && this.parent && this.parent.numElements > 0) {
				this.parent.onChildRectangleChange();
			}
			else {
				this.updateLayout(false);
			}
		}

		/**
		 * 更新布局
		 * @param needMeasure 
		 */
		updateLayout(needMeasure: boolean = true): void {
			// 测量和个子元素当前矩形区域并合并生成Group的当前区域
			needMeasure && this.measure();
			this.beforeLayout(this.rectangle.x, this.rectangle.y, this.rectangle.width / this.scaleX, this.rectangle.height / this.scaleY);

			// 确定大小(根据当前父容器大小及本身当前矩形大小)
			this.decideRealSize();
			// 应用真实大小
			this.applyRealSize();
			// 缩放后，校正矩形区域
			this.measure(false);
			// 确定位置
			this.decideRealPos();
			// 应用真实位置
			this.applyRealPos();
			// this.offsetX = this.realX;
			// this.offsetY = this.realY;
			let len: number = this.numElements;
			// 更新子项（组）的适配与布局
			let child: LayoutItem<any>;
			for (var i: number = 0; i < len; ++i) {
				child = this.getElementAt(i);
				if (child instanceof Group) {
					child.updateLayout(false);
				}
			}

			this.afterLayout(this.rectangle.x, this.rectangle.y, this.realWidth, this.realHeight);


			//将矩形数据映射至真实显示对象
			this.mapRectangle();
		}

		/**
		 * 
		 */
		updateChildrenLayout() {
			let len: number = this.numElements;
			// 更新子项（组）的适配与布局
			let child: LayoutItem<any>;
			for (var i: number = 0; i < len; ++i) {
				child = this.getElementAt(i);
				if (child instanceof Group) {
					child.updateLayout(false);
				}
			}
		}

		/**
		 * 更新子对象布局并使用生效
		 */
		updateAndApplyChildrenLayout() {
			this.updateChildrenLayout();
			this.mapRectangle();
		}

		/**
		 * 测量显示矩形区域
		 */
		public measure(ifChild: boolean = true) {
			if (!this.layout) return this.setMeasuredSize(0, 0);
			this.layout.measure(ifChild);
		}


		/**
		 * 调整目标的元素的大小并定位这些元素
		 * 
		 * @param x 
		 * @param y 
		 * @param unscaledWidth 
		 * @param unScaledHeight 
		 */
		beforeLayout(x: number, y: number, unscaledWidth: number, unScaledHeight: number): void {
			//基础布局是静态布局，不需要做任何操作，保持原位即可
			if (this.layout) this.layout.beforeLayout(x, y, unscaledWidth, unScaledHeight);
		}

		/**
		 * 布局完成后再次调整布局
		 * 
		 * @param x 
		 * @param y 
		 * @param realWidth 
		 * @param realHeight 
		 */
		afterLayout(x: number, y: number, realWidth: number, realHeight: number): void {
			this.layout && this.layout.afterLayout(x, y, realWidth, realHeight);
		}

		constructor(item?: any) {
			super(null);
			if (item) this.addChild(item);
		}

		dispose(): void {
			if (this.mLayout) this.mLayout.dispose();
			// 析构所有设置规范
			this.disposeLayoutSpec();
			// 析构所有子对象
			this.disposeChildren();
			// 释放矩形
			this.rectangle && this.rectangle.dispose();
			this.rectangle = null;
			// 释放布局类
			this.mLayout && this.mLayout.dispose();
			this.mLayout = null;
			// 父对象析构
			super.dispose();
		}

		/**
		 * 将自身的矩形映射到所有子项
		 */
		mapRectangle(): void {
			// 先
			let len: number = this.numElements;
			for (var i: number = 0; i < len; ++i) {
				this.getElementAt(i).mapRectangle();
			}
			// this.draw();
		}

		/**
		 * 获取所在的适配层
		 */
		public getLayer(): LayoutLayer {
			if (this instanceof LayoutLayer) return this;
			if (!this.parent) return null;
			if (this.parent instanceof LayoutLayer) {
				return this.parent;
			}
			else {
				return this.parent.getLayer();
			}
		}

		/**
		 * 偏移子对象
		 * @param dx 
		 * @param dy 
		 */
		protected offsetChildren(dx: number, dy: number): void {
			let len: number = this.numElements;
			let child: LayoutItem<any>;
			for (var i: number = 0; i < len; ++i) {
				child = this.getElementAt(i);
				child.rectangle.offset(dx, dy);
			}
		}

		/**
		 * 缩放子对象
		 * @param x 
		 * @param y 
		 */
		protected scaleChildren(x: number, y: number) {
			let len: number = this.numElements;
			let child: LayoutItem<any>;
			for (var i: number = 0; i < len; ++i) {
				child = this.getElementAt(i);
				if (child instanceof Group) {
					continue;
				}

				let oldX: number = (child.x - this.offsetX) / child.scaleX;
				let oldY: number = (child.y - this.offsetY) / child.scaleY;
				child.setScale(x, y);
				child.setPos(oldX * x, oldY * y);

			}

			// 更新自身矩形
			// this.measure(false);

		}

		/**
		 * 绘制矩形区域，用于DEBUG
		 */
		protected draw() {
			this.graphic.alpha = 0.5;
			this.graphic.graphics.clear();
			// console.log(`group ${this.name} draw,x:${this.rectangle.x}, y:${this.rectangle.y}, width:${this.rectangle.width}, height:${this.rectangle.height}`);
			this.graphic.graphics.drawRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height, "blue");
		}

		protected decideRealSize(): void {
			if (this.parent) {
				this.decideRealWidth();
				this.decideRealHeight();
			}

			// 再确定子级的
			let len: number = this.numElements;
			let temp: LayoutItem<any>;
			for (var i: number = 0; i < len; ++i) {
				temp = this.getElementAt(i);
				if (temp instanceof Group) {
					temp.decideRealSize();
				}
			}
		}

		protected decideRealPos(): void {
			if (this.parent) {
				this.decideRealX();
				this.decideRealY();
			}

			// 再确定子级的
			let len: number = this.numElements;
			let temp: LayoutItem<any>;
			for (var i: number = 0; i < len; ++i) {
				temp = this.getElementAt(i);
				if (temp instanceof Group) {
					temp.decideRealPos();
				}
			}
		}

		protected decideRealX(): void {
			if (this.decideRealXByLeft()) return;
			if (this.decideRealXByRight()) return;
			if (this.decideRealXByCenter()) return;

			this.realX = this.rectangle.x;
		}

		protected decideRealY(): void {
			if (this.decideRealYByTop()) return;
			if (this.decideRealYByBottom()) return;
			if (this.decideRealYByCenter()) return;

			this.realY = this.rectangle.y;
		}

		protected decideRealXByRight(): boolean {
			if (Utils.isNullOrUndefined(this.right)) return false;

			let parentWidth: number = this.getParentRealWidth();
			let parentHeight: number = this.getParentRealHeight();

			let v: LayoutValue = LayoutSpec.calculateRealValue(this.right, parentWidth, parentHeight);
			if (Utils.isNullOrUndefined(v)) return false;
			// if(v.isRelativeDesign()){
			// 	// this.getLayer().designWidth - this.
			// 	// 修正比例
			// 	let pdw:number = this.getParentDesignWidth();
			// 	let dw:number = this.getDesignWidth();
			// 	this.rectangle.x;

			// }
			let r: number = v.calculateValue(parentWidth);

			this.realX = parentWidth - this.realWidth - r + this.parent.realX;
			return true;
		}

		protected getDesignWidth(): number {
			return this.rectangle.width / this.mScaleX;
		}

		protected getDesignHeight(): number {
			return this.rectangle.height / this.mScaleY;
		}

		protected getParentDesignWidth(): number {
			if (!this.parent) return null;
			if (this.parent instanceof LayoutLayer) {
				return this.parent.designWidth;
			}
			return this.parent.rectangle.width / this.parent.mScaleX;
		}

		protected getParentDesignHeight(): number {
			if (!this.parent) return null;
			if (this.parent instanceof LayoutLayer) {
				return this.parent.designHeight;
			}
			return this.getParentRealHeight() / this.parent.mScaleY;
		}

		protected decideRealXByLeft(): boolean {
			if (Utils.isNullOrUndefined(this.left)) return false;

			let parentWidth: number = this.getParentRealWidth();
			let parentHeight: number = this.getParentRealHeight();

			let v: LayoutValue = LayoutSpec.calculateRealValue(this.left, parentWidth, parentHeight);
			if (Utils.isNullOrUndefined(v)) return false;

			let x: number = v.calculateValue(parentWidth);
			this.realX = this.parent.realX + x;
			return true;
		}

		protected decideRealXByCenter(): boolean {
			if (Utils.isNullOrUndefined(this.horizontalCenter)) return false;

			let parentWidth: number = this.getParentRealWidth();
			let parentHeight: number = this.getParentRealHeight();

			let v: LayoutValue = LayoutSpec.calculateRealValue(this.horizontalCenter, parentWidth, parentHeight);
			if (Utils.isNullOrUndefined(v)) return false;

			let c: number = v.calculateValue(parentWidth);
			this.realX = c + this.parent.realX + (parentWidth - this.realWidth) * 0.5;
			return true;
		}

		protected decideRealYByTop(): boolean {
			if (Utils.isNullOrUndefined(this.top)) return false;

			let parentWidth: number = this.getParentRealWidth();
			let parentHeight: number = this.getParentRealHeight();

			let v: LayoutValue = LayoutSpec.calculateRealValue(this.top, parentWidth, parentHeight);
			if (Utils.isNullOrUndefined(v)) return false;

			let top: number = v.calculateValue(parentHeight);
			this.realY = this.parent.realY + top;
			return true;
		}

		protected decideRealYByBottom(): boolean {
			if (Utils.isNullOrUndefined(this.bottom)) return false;

			let parentWidth: number = this.getParentRealWidth();
			let parentHeight: number = this.getParentRealHeight();

			let v: LayoutValue = LayoutSpec.calculateRealValue(this.bottom, parentWidth, parentHeight);
			if (Utils.isNullOrUndefined(v)) return false;

			let bottom: number = v.calculateValue(parentHeight);
			this.realY = parentHeight - this.realHeight - bottom + this.parent.realY;
			return true;
		}

		protected decideRealYByCenter(): boolean {

			if (Utils.isNullOrUndefined(this.verticalCenter)) return false;

			let parentWidth: number = this.getParentRealWidth();
			let parentHeight: number = this.getParentRealHeight();

			let v: LayoutValue = LayoutSpec.calculateRealValue(this.verticalCenter, parentWidth, parentHeight);
			if (Utils.isNullOrUndefined(v)) return false;

			let c: number = v.calculateValue(parentHeight);
			this.realY = c + this.parent.realY + (parentHeight - this.realHeight) * 0.5;
			return true;
		}


		protected applyRealSize(): void {
			let oldWidth: number = this.rectangle.width / this.mScaleX;
			let oldHeight: number = this.rectangle.height / this.mScaleY;

			let scaleX: number;
			let scaleY: number;
			// 如果宽，高都未设定，则不缩放
			if (Utils.isNullOrUndefined(this.realWidth) && Utils.isNullOrUndefined(this.realHeight)) {
				scaleX = this.mScaleX;
				scaleY = this.mScaleY;
			}
			// 如果未设置有效宽，则与高一起等比缩放			
			else if (Utils.isNullOrUndefined(this.realWidth)) {
				scaleX = scaleY = this.realHeight / oldHeight;
				this.realWidth = oldWidth * scaleX;
			}
			// 如果未设置有效高，则与宽一起做等比缩放
			else if (Utils.isNullOrUndefined(this.realHeight)) {
				scaleX = scaleY = this.realWidth / oldWidth;
				this.realHeight = oldHeight * scaleY;
			}
			else {
				scaleX = this.realWidth / oldWidth;
				scaleY = this.realHeight / oldHeight;
			}
			this.setScale(scaleX, scaleY);
		}

		protected applyRealPos(): void {
			this.setPos(Utils.isNullOrUndefined(this.realX) ? this.rectangle.x : this.realX, Utils.isNullOrUndefined(this.realY) ? this.rectangle.y : this.realY);
		}

		doRemove(item: any): boolean {
			let len: number = this.numElements;
			let children: LayoutItem<any>[] = this.elementsContent;
			let ret: boolean = false;
			let temp: LayoutItem<any>;
			let newChildiren: LayoutItem<any>[] = [];

			// 递归移除
			for (var i: number = 0; i < len; ++i) {
				temp = children[i];
				if (temp.equal(item)) {
					temp.dispose();
					ret = true;
				}
				else {
					// newChildiren.push(temp);
					if (temp instanceof Group) {
						if (temp.remove(item)) {
							if (temp.numElements > 0 || temp.doNotDestroy) {
								newChildiren.push(temp);
							}
							ret = true;
						}
					}
				}
			}
			this.elementsContent = newChildiren;
			return ret;
		}

		private doAddChild(item: LayoutItem<any>): void {
			if (!this.elementsContent) this.elementsContent = [];
			let idx: number = this.elementsContent.indexOf(item);
			if (idx >= 0) return;
			item.parent = this;
			this.elementsContent.push(item);
		}

		/**
		 * 更新Group的最终真实宽度 
		 * 1. 如果未规定则取初始值（加入时的值)
		 * 2. 如果同时填写了left与right,则优先取left与right
		 * 3.
		 * @param parentWidth 
		 */
		private decideRealWidth(): void {
			if (!this.parent) return;
			// 先看left和Right是否会影响宽
			if (this.decideWidthByLeftAndRight()) return;

			// 根据宽的类型确定真实宽
			if (Utils.isNullOrUndefined(this.width)) {
				this.realWidth = Utils.isNullOrUndefined(this.height) ? this.rectangle.width : null;
				return;
			}

			let parentWidth: number = this.getParentRealWidth();
			let parentHeight: number = this.getParentRealHeight();

			let widthValue: LayoutValue = LayoutSpec.calculateRealValue(this.width, parentWidth, parentHeight);
			if (Utils.isNullOrUndefined(widthValue)) {
				this.realWidth = Utils.isNullOrUndefined(this.height) ? this.rectangle.width : null;
				return;
			}
			if (widthValue.isRelativeDesign()) {
				let oldWidth: number = this.rectangle.width / this.mScaleX;
			}
			else {
				this.realWidth = widthValue.calculateValue(parentWidth);
			}
		}

		private decideRealHeight(): void {
			if (!this.parent) return;
			// 检查top与bottom是否会影响高
			if (this.decideHeightByTopAndBottom()) return;

			// 根据高的类型确定真实高
			if (Utils.isNullOrUndefined(this.height)) {
				this.realHeight = Utils.isNullOrUndefined(this.width) ? this.rectangle.height : null;
				return;
			}

			let parentWidth: number = this.getParentRealWidth()
			let parentHeight: number = this.getParentRealHeight();
			let heightValue: LayoutValue = LayoutSpec.calculateRealValue(this.height, parentWidth, parentHeight);
			if (Utils.isNullOrUndefined(heightValue)) {
				this.realHeight = Utils.isNullOrUndefined(this.width) ? this.rectangle.height : null;
				return;
			}

			this.realHeight = heightValue.calculateValue(parentHeight);
		}

		private decideHeightByTopAndBottom(): boolean {
			if (Utils.isNullOrUndefined(this.top) || Utils.isNullOrUndefined(this.bottom)) return false;

			let parentWidth: number = this.getParentRealWidth();
			let parentHeight: number = this.getParentRealHeight();
			let topValue: LayoutValue = LayoutSpec.calculateRealValue(this.top, parentWidth, parentHeight);
			if (Utils.isNullOrUndefined(topValue)) return false;

			let bottomValue: LayoutValue = LayoutSpec.calculateRealValue(this.bottom, parentWidth, parentHeight);
			if (Utils.isNullOrUndefined(bottomValue)) return false;

			let realTop: number = topValue.calculateValue(parentHeight);
			let realBottom: number = bottomValue.calculateValue(parentHeight);

			this.realHeight = parentHeight - realTop - realBottom;

			return true;
		}

		/**
		 * 根据左右边距确定宽：当同时规定了左右边距时，也意味着确定了宽
		 */
		private decideWidthByLeftAndRight(): boolean {
			if (Utils.isNullOrUndefined(this.left) || Utils.isNullOrUndefined(this.right)) return false;

			let parentWidth: number = this.getParentRealWidth();
			let parentHeight: number = this.getParentRealHeight();

			let leftValue: LayoutValue = LayoutSpec.calculateRealValue(this.left, parentWidth, parentHeight);
			if (Utils.isNullOrUndefined(leftValue)) return false;

			let rightValue: LayoutValue = LayoutSpec.calculateRealValue(this.right, parentWidth, parentHeight);
			if (Utils.isNullOrUndefined(rightValue)) return false;

			let realLeft: number = leftValue.calculateValue(parentWidth);
			let realRight: number = rightValue.calculateValue(parentWidth);

			this.realWidth = parentWidth - realLeft - realRight;

			return true;
		}

		private getParentRealWidth(): number {
			return Utils.isNullOrUndefined(this.parent.realWidth) ? this.parent.rectangle.width : this.parent.realWidth;
		}

		private getParentRealHeight():number{
			return Utils.isNullOrUndefined(this.parent.realHeight) ? this.parent.rectangle.height : this.parent.realHeight;
		}

		/**
		 * 析构适配规范设置
		 */
		private disposeLayoutSpec(): void {
			this.doDisposeLayoutSpec(this.top);
			this.top = null;
			this.doDisposeLayoutSpec(this.bottom);
			this.bottom = null;
			this.doDisposeLayoutSpec(this.left);
			this.left = null;
			this.doDisposeLayoutSpec(this.right);
			this.right = null;
			this.doDisposeLayoutSpec(this.horizontalCenter);
			this.horizontalCenter = null;
			this.doDisposeLayoutSpec(this.verticalCenter);
			this.verticalCenter = null;
		}

		private disposeChildren(): void {
			let children: LayoutItem<any>[] = this.elementsContent;
			if (!children) return;
			let len: number = children.length;
			for (var i: number = 0; i < len; ++i) {
				children[i].dispose();
			}
			this.elementsContent = null;
		}

		private doDisposeLayoutSpec(spec: LayoutSpec | LayoutSpec[]): void {
			if (!spec) return;
			if (spec instanceof LayoutSpec) {
				spec.dispose();
				return;
			}

			for (var i: number = 0; i < spec.length; ++i) {
				spec[i].dispose();
			}

		}
	}
}