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
* name 
*/
module riggerLayout {
	export class LayoutBase {
		/**
		 * 此布局将测量其元素、调整其元素的大小并定位其元素的 Group 容器 
		 */
		target: Group;

		/**
		 * 若要配置容器使用虚拟布局，请为与容器关联的布局的 useVirtualLayout 属性设置为 true 
		 */
		useVirtualLayout: boolean;

		/**
		 * 如果 useVirtualLayout 为 true，则当布局目标改变时，布局目标可以使用此方法来清除已缓存布局信息
		 */
		clearVirtualLayoutCache(): void {
			throw new Error(ErrorStrings.NotImplemented);
		}

		/**
		 * 在已添加布局元素之后且在验证目标的大小和显示列表之前，由目标调用 
		 */
		elementAdded(index: number): void {
			throw new Error(ErrorStrings.NotImplemented);
		}

		/**
		 * 返回此 Group 中可见的元素的索引 
		 */
		getElementIndicesInView(): number[] {
			throw new Error(ErrorStrings.NotImplemented);
		}

		/**
		 * 设置一个典型元素的大小 
		 * @param width 
		 * @param height 
		 */
		setTypicalSize(width: number, height: number): void {
			throw new Error(ErrorStrings.NotImplemented);
		}

		/**
		 * 调整目标的元素的大小并定位这些元素
		 * @param width 
		 * @param height 
		 */
		updateDisplayList(unscaledWidth: number, unScaledHeight: number): void {
			//基础布局是静态布局，不需要做任何操作，保持原位即可
			// throw new Error(ErrorStrings.NotImplemented);
		}



		/**
		 * 基于目标的内容测量其默认大小 
		 */
		measure(ifChild: boolean = true): void {
			let len: number = this.target.numElements;
			let temp: Rectangle;
			// let initRectangle: Rectangle = this.target.rectangle ? this.target.rectangle : Rectangle.createInstance();
			let initRectangle: Rectangle = Rectangle.createInstance();
			if (this.target.numElements > 0) {
				initRectangle.copyFrom(this.target.getElementAt(0).rectangle);
			}
			else {
				initRectangle.setEmpty();
				this.target.rectangle.copyFrom(initRectangle);
				return;
			}

			let item: LayoutItem<any>;
			// 测量目标组中所有元素
			for (var i: number = 0; i < len; ++i) {
				item = this.target.getElementAt(i);
				if (ifChild) {
					item.measure();
				}

				if (!(item instanceof Group)) {
					temp = initRectangle.union(item.rectangle);
					initRectangle.copyFrom(temp);
					temp.recover();					
				}

			}

			// 更新目标组的Rectangle
			this.target.rectangle.copyFrom(initRectangle);
			initRectangle.setEmpty();
			initRectangle.recover();

		}



		constructor() {

		}

		dispose() {
			if (this.target) this.target = null;
		}
	}
}