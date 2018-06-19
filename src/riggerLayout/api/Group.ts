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
		name: string;
		/**
		 * 距父容器左边距离
		 */
		left: number | string;

		/**
		 * 距父级容器底部距离
		 */
		bottom: number | string;

		/**
		 * 距父级容器右边的距离
		 */
		right: number | string;

		/**
		 * 距父级窗口顶部的距离
		 */
		top: number | string;

		/**
		 * 高
		 */
		width: number | string;

		/**
		 * 宽
		 */
		height: number | string;

		/**
		 * 在父级容器中距离X轴中心的位置
		 */
		horizontalCenter: number | string;

		/**
		 * 在父级容器中距离Y轴中心的位置
		 */
		verticalCenter: number | string;

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
		 * 外部显示设置的高度
		 */
		explicitHeight: number;

		/**
		 * 外部显示设置的宽度
		 */
		// explicitWidth: number;

		/**
		 * 指定此Group是否包含在父容器的布局中
		 */
		// includeInLayout: boolean;

		/**
		 * 此容器的布局对象
		 */
		protected mLayout: LayoutBase;
		public get layout(): LayoutBase {
			return this.mLayout;
		}
		public set layout(v: LayoutBase) {
			if (this.mLayout) this.mLayout.dispose();
			this.mLayout = v;
			this.mLayout.target = this;
			this.mLayout.measure();
		}

		/**
		 * group 最大宽度，同时影响测试及自动布局的尺寸
		 */
		maxWidth: number | string;

		/**
		 * group 最大高度，同时影响测试及自动布局的尺寸
		 */
		maxHeight: number | string;

		/**
		 * group 最小宽度，同时影响测试及自动布局的尺寸,大于maxWidth时无效
		 */
		minWidth: number | string;

		/**
		 * group 最小高度，同时影响测试及自动布局的尺寸,大于maxHeight时无效
		 */
		minHeight: number | string;

		/**
		 * 相对父级容器高度的百分比
		 */
		// percentHeight: number;

		/**
		 * 相对父级容器宽度的百分比
		 */
		// percentWidth: number;

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

		addChild(item: any): void {
			if (item instanceof LayoutItem) {
				this.doAddChild(item);
			}
			else {
				this.doAddChild(new GlobalSettings.realLayoutItemClass(item));
			}

			// 延迟
			Laya.timer.callLater(this, this.onChildRectangleChange);
			// this.onChildRectangleChange();
		}

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

		updateLayout(needMeasure: boolean = true): void {
			// 测量和个子元素当前矩形区域并合并生成Group的当前区域
			needMeasure && this.measure();
			this.updateDisplayList(this.rectangle.width / this.scaleX, this.rectangle.height / this.scaleY);
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

			//将矩形映射至真实显示对象
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
		 * @param width 
		 * @param height 
		 */
		updateDisplayList(unscaledWidth: number, unScaledHeight: number): void {
			//基础布局是静态布局，不需要做任何操作，保持原位即可
			if (this.layout) this.layout.updateDisplayList(unscaledWidth, unScaledHeight);
		}

		constructor(item?: any) {
			super(null);
			if (item) this.addChild(item);
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
			this.draw();
		}

		protected offsetChildren(dx: number, dy: number): void {
			let len: number = this.numElements;
			let child: LayoutItem<any>;
			for (var i: number = 0; i < len; ++i) {
				child = this.getElementAt(i);
				// child.rectangle.offset(dx, dy);
				child.rectangle.offset(dx, dy);				
			}
		}

		protected scaleChildren(x: number, y: number) {
			let len: number = this.numElements;
			let child: LayoutItem<any>;
			for (var i: number = 0; i < len; ++i) {
				child = this.getElementAt(i);
				if (child instanceof Group) {
					break;
				}

				let oldX: number = (child.x - this.offsetX) / child.scaleX;
				let oldY: number = (child.y - this.offsetY) / child.scaleY;
				child.setScale(x, y);			
				child.setPos(oldX * x, oldY * y);
				
			}

			// 更新自身矩形
			// this.measure(false);

		}

		protected draw() {
			this.graphic.alpha = 0.5;
			this.graphic.graphics.clear();
			console.log(`group ${this.name} draw,x:${this.rectangle.x}, y:${this.rectangle.y}, width:${this.rectangle.width}, height:${this.rectangle.height}`);
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
			let [t, v] = Utils.parseValueSpecs(this.right);
			if (Utils.isNullOrUndefined(v)) return false;
			let r: number = t === ValueType.Percent ? this.parent.realWidth * v * 0.01 : v;

			this.realX = this.parent.realWidth - this.realWidth - r + this.parent.realX;
			return true;
		}

		protected decideRealXByLeft(): boolean {
			if (Utils.isNullOrUndefined(this.left)) return false;
			let [t, v] = Utils.parseValueSpecs(this.left);
			if (Utils.isNullOrUndefined(v)) return false;

			let x: number = t === ValueType.Percent ? this.parent.realWidth * v * 0.01 : v;
			this.realX = this.parent.realX + x;
			return true;
		}

		protected decideRealXByCenter(): boolean {
			if (Utils.isNullOrUndefined(this.horizontalCenter)) return false;
			let [t, v] = Utils.parseValueSpecs(this.horizontalCenter);
			if (Utils.isNullOrUndefined(v)) return false;

			let c: number = t === ValueType.Percent ? this.parent.realWidth * v * 0.01 : v;
			this.realX = c + this.parent.realX + (this.parent.realWidth - this.realWidth) * 0.5;
			return true;
		}

		protected decideRealYByTop(): boolean {
			if (Utils.isNullOrUndefined(this.top)) return false;
			let [t, v] = Utils.parseValueSpecs(this.top);
			if (Utils.isNullOrUndefined(v)) return false;

			let top: number = t === ValueType.Percent ? this.parent.realHeight * v * 0.01 : v;
			this.realY = this.parent.realY + top;
			return true;
		}

		protected decideRealYByBottom(): boolean {
			if (Utils.isNullOrUndefined(this.bottom)) return false;
			let [t, v] = Utils.parseValueSpecs(this.bottom);
			if (Utils.isNullOrUndefined(v)) return false;

			let bottom: number = t === ValueType.Percent ? this.parent.realHeight * v * 0.01 : v;
			this.realY = this.parent.realHeight - this.realHeight - bottom + this.parent.realY;
			return true;
		}

		protected decideRealYByCenter(): boolean {
			if (Utils.isNullOrUndefined(this.verticalCenter)) return false;
			let [t, v] = Utils.parseValueSpecs(this.verticalCenter);
			if (Utils.isNullOrUndefined(v)) return false;

			let c: number = t === ValueType.Percent ? this.realHeight * v * 0.01 : v;
			this.realY = c + this.parent.realY + (this.parent.realHeight - this.realHeight) * 0.5;
			return true;
		}


		protected applyRealSize(): void {
			let oldWidth: number = this.rectangle.width / this.mScaleX;
			let oldHeight: number = this.rectangle.height / this.mScaleY;
			
			let scaleX: number; 
			let scaleY: number;
			if(Utils.isNullOrUndefined(this.realWidth)) {
				scaleX = scaleY = this.realHeight / oldHeight;	
				this.realWidth = oldWidth * scaleX;
			}
			else if(Utils.isNullOrUndefined(this.realHeight)){
				scaleX = scaleY = this.realWidth / oldWidth;
				this.realHeight = oldHeight * scaleY;
			}
			else{
				scaleX = this.realWidth / oldWidth;
				scaleY = this.realHeight / oldHeight;
			}
			this.setScale(scaleX, scaleY);
		}

		protected applyRealPos(): void {
			this.setPos(this.realX, this.realY);
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

			let [widthType, widthValue] = Utils.parseValueSpecs(this.width);
			if (Utils.isNullOrUndefined(widthValue)) {
				this.realWidth = Utils.isNullOrUndefined(this.height) ? this.rectangle.width : null;				
				return;
			}

			this.realWidth = widthType === ValueType.Static ? widthValue : this.parent.realWidth * widthValue * 0.01
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

			let [heightType, heightValue] = Utils.parseValueSpecs(this.height);
			if (Utils.isNullOrUndefined(heightValue)) {
				this.realHeight = Utils.isNullOrUndefined(this.width) ? this.rectangle.height : null;																
				return;
			}

			this.realHeight = heightType === ValueType.Static ? heightValue : this.parent.realHeight * heightValue * 0.01
		}

		private decideHeightByTopAndBottom(): boolean {
			if (Utils.isNullOrUndefined(this.top) || Utils.isNullOrUndefined(this.bottom)) return false;

			let [topType, topValue] = Utils.parseValueSpecs(this.top);
			if (Utils.isNullOrUndefined(topValue)) return false;

			let [bottomType, bottomValue] = Utils.parseValueSpecs(this.bottom);
			if (Utils.isNullOrUndefined(bottomValue)) return false;

			let realTop: number = topType === ValueType.Static ? topValue : this.parent.realHeight * topValue * 0.01;
			let realBottom: number = bottomType === ValueType.Static ? bottomValue : this.parent.realHeight * bottomValue * 0.01;

			this.realHeight = this.parent.realHeight - realTop - realBottom;

			return true;
		}

		private decideWidthByLeftAndRight(): boolean {
			if (Utils.isNullOrUndefined(this.left) || Utils.isNullOrUndefined(this.right)) return false;

			let [leftType, leftValue] = Utils.parseValueSpecs(this.left);
			if (Utils.isNullOrUndefined(leftValue)) return false;

			let [rightType, rightValue] = Utils.parseValueSpecs(this.right);
			if (Utils.isNullOrUndefined(rightValue)) return false;

			let realLeft: number = leftType === ValueType.Static ? leftValue : this.parent.realWidth * leftValue * 0.01;
			let realRight: number = rightType === ValueType.Static ? rightValue : this.parent.realWidth * rightValue * 0.01;

			this.realWidth = this.parent.realWidth - realLeft - realRight;

			return true;
		}
	}
}