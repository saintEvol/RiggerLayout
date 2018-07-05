/**
* 布局规范类，用于设置布局参数 
*/
module riggerLayout {
	export class LayoutSpec {
		/**
		 * 相对设计值进行缩放的标签
		 */
		public static readonly RelativeDesign = "d%";

		/**
		 * 布局规范类型
		 */
		private specType: LayoutSpecType = LayoutSpecType.ScreenSize;

		/**
		 * 调用域，只有在LayoutSpecType.Custom下才有效
		 */
		private thisObj: any;

		/**
		 * 最小屏幕比 LayoutSpecType.ScreenSize下，此字段表示最小宽高比,否则表示判断函数
		 */
		private minRatioOrFunction: Function | number;

		/**
		 * 最大屏幕比， LayoutSpecType.ScreenSize下，此字段表示最大宽高比,否则表示判断函数的参数列表
		 */
		private maxRatioOrArgs: number | any[];

		/**
		 * 符合条件后，需要应用的布局参数
		 */
		private value: [ValueType, number];

		/**
		 * 最大值
		 */
		max: [ValueType, number];

		/**
		 * 最小值
		 */
		min: [ValueType, number];

		/**
         * 解析用户填写的值规范
         * @param v 
         */
		public static parseValueSpecs(v: number | string): [ValueType, number] {
			if (Utils.isNullOrUndefined(v)) return [null, null];
			if (Utils.isString(v)) {
				if (Utils.isNullOrEmpty(v)) return [null, null];
				if (LayoutSpec.RelativeDesign === v) {
					return [ValueType.RelativeDesign, null];
				}

				let idx: number = v.indexOf("%");
				let type: ValueType;
				if (idx >= 0) {
					type = ValueType.Relative;
				}
				else {
					type = ValueType.Absolute;
				}

				let num: number;
				num = parseFloat(v);
				if (num === NaN) return [null, null];
				return [type, num];
			}
			else {
				return [ValueType.Absolute, v];
			}
		}

		/**
		 * 计算真实的布局设置值
		 * 
		 * @param specOrSpecArray 布局规范或规范数组
		 * @param realWidth 真实屏幕宽 
		 * @param realHeight 真实屏幕高
		 * @param realRatio 真实屏幕宽高比
		 */
		public static calculateRealValue(specOrSpecArray: LayoutSpec | LayoutSpec[], realWidth: number, realHeight: number): LayoutValue {
			if (specOrSpecArray instanceof LayoutSpec) {
				return specOrSpecArray.calculateRealValue(realWidth, realHeight);
			}
			else {
				let len: number = specOrSpecArray.length;
				let value: LayoutValue = null;
				for (var i: number = 0; i < len; ++i) {
					value = specOrSpecArray[i].calculateRealValue(realWidth, realHeight);
					if (Utils.isNullOrUndefined(value)) {
						continue;
					}
					return value;
				}

				return value;
			}
		}

		constructor() {

		}

		dispose(): void {
			this.thisObj && (this.thisObj = null);
			if (!Utils.isNullOrUndefined(this.minRatioOrFunction)) this.minRatioOrFunction = null;
			if (!Utils.isNullOrUndefined(this.maxRatioOrArgs)) this.maxRatioOrArgs = null;
			if (!Utils.isNullOrUndefined(this.value)) this.value = null;
			this.min = this.max = null;
		}

		/**
		 * @param thisObj 自定义的条件判断函数的调用域		 
		 * @param fun 自定义的条件判断函数
		 * @param args 传入的参数值，同时框架会将判断发生时的真实屏幕宽，并附加在用户的参数列表尾部
		 * @param limit 此条件下的限定值
		 * @param min 最小值
		 * @param max 最大值
		 */
		public static createByCustom(thisObj: any, fun: Function, args: any[], value: string | number, min: string | number = null, max: string | number = null): LayoutSpec {
			return this.createInstWithCustom(thisObj, fun, args, LayoutSpec.parseValueSpecs(value), LayoutSpec.parseValueSpecs(min), LayoutSpec.parseValueSpecs(max));
		}

		/**
		 * 根据指定参数创建一个LayoutSpec实例 
		 * @param minRatio 最小屏幕宽高比, 如果是 -1 表示忽略
		 * @param maxRatio 最大屏幕宽高比, 如果是 -1 表示忽略
		 * @param limit 此条件下的限定值
		 * @param min 最小值
		 * @param max 最大值
		 * 
		 */
		public static create(minRatio: number, maxRatio: number, value: string | number, min: string | number = null, max: string | number = null): LayoutSpec {
			return this.createInstWithSizeCondition(minRatio, maxRatio, LayoutSpec.parseValueSpecs(value), LayoutSpec.parseValueSpecs(min), LayoutSpec.parseValueSpecs(max));
		}

		/**
		 * 计算真实的布局参数
		 * @param realWidth 真实屏幕宽 
		 * @param realHeight 真实屏幕高
		 */
		calculateRealValue(realWidth: number, realHeight: number): LayoutValue {
			switch (this.specType) {
				case LayoutSpecType.ScreenSize:
					return this.calculateRealValueByScreenSize(realWidth, realHeight);
				case LayoutSpecType.Custom:
					return this.calculateRealValueByCustom(realWidth, realHeight);
				case LayoutSpecType.None:
					return null;
				default:
					return null;
			}
		}

		private calculateRealValueByScreenSize(realWidth: number, realHeight: number): LayoutValue {
			// 无限制条件
			if (this.isIgnored(this.maxRatioOrArgs) && this.isIgnored(this.minRatioOrFunction)) return new LayoutValue(this.value, this.min, this.max);
			let realRatio: number = realWidth / realHeight;
			// 忽略最小宽高比
			if (this.isIgnored(this.minRatioOrFunction) && realRatio <= this.maxRatioOrArgs) return new LayoutValue(this.value, this.min, this.max);
			// 忽略最大宽高比
			if (this.isIgnored(this.maxRatioOrArgs) && realRatio >= this.minRatioOrFunction) return new LayoutValue(this.value, this.min, this.max);
			// 刚好在区间内
			if (realRatio >= this.minRatioOrFunction && realRatio <= this.maxRatioOrArgs) return new LayoutValue(this.value, this.min, this.max);

			// 不满足
			return null;
		}

		private calculateRealValueByCustom(realWidth: number, realHeight: number): LayoutValue {
			let args: any[] = (Array<any>(this.maxRatioOrArgs)).concat([realWidth, realHeight]);
			if ((<Function>this.minRatioOrFunction).apply(this.thisObj, args)) {
				return new LayoutValue(this.value, this.min, this.max);
			}
			return null;

		}

		/**
		 * 是否需要忽略
		 * @param v 
		 */
		private isIgnored(v: any): boolean {
			return Utils.isNullOrUndefined(v) || v < 0;
		}

		/**
		 * 根据最大与最小限制计算最终值
		 * @param parentWidth 
		 * @param parentHeight 
		 */
		// private calculateFinalValue(parentWidth:number, parentHeight:number): [ValueType, number] {

		// }

		/**
		 * 以屏幕尺寸为条件创建一个实例 
		 * @param minRatio 最小屏幕宽高比
		 * @param maxRatio 最大屏幕宽高比
		 * @param limit 此条件下的限定值
		 */
		private static createInstWithSizeCondition(minRatio: number, maxRatio: number, limit: [ValueType, number],
			min: [ValueType, number] = null, max: [ValueType, number] = null): LayoutSpec {
			let inst: LayoutSpec = new LayoutSpec();

			inst.specType = LayoutSpecType.ScreenSize;
			inst.minRatioOrFunction = minRatio;
			inst.maxRatioOrArgs = maxRatio;
			inst.value = limit;
			inst.min = min;
			inst.max = max;

			return inst;
		}

		/**
		 * 以自定义条件创建一个实例
		 * @param fun 
		 * @param args 
		 * @param limit 
		 */
		private static createInstWithCustom(thisObj: any, fun: Function, args: any[], limit: [ValueType, number],
			min: [ValueType, number], max: [ValueType, number]): LayoutSpec {
			let inst: LayoutSpec = new LayoutSpec();

			inst.thisObj = thisObj;
			inst.specType = LayoutSpecType.Custom;
			inst.minRatioOrFunction = fun;
			inst.maxRatioOrArgs = args || [];
			inst.value = limit;
			inst.min = min;
			inst.max = max;

			return inst;
		}
	}
}