/**
* 适配值
*/
module riggerLayout {
	export class LayoutValue {
		/**
		 * 值
		 */
		value: [ValueType, number] = null;

		/**
		 * 最小值
		 */
		min: [ValueType, number] = null;

		/**
		 * 最大值
		 */
		max: [ValueType, number] = null;

		constructor(value: [ValueType, number], min: [ValueType, number] = null, max: [ValueType, number] = null) {
			this.value = value;
			this.min = min;
			this.max = max;
		}

		/**
		 * 是否相对设计尺寸
		 */
		public isRelativeDesign(): boolean {
			return this.value[0] === ValueType.RelativeDesign;
		}

		/**
		 * 计算最终值
		 * @param refValue 
		 */
		calculateValue(refValue: number): number {
			let [valueT, valueV] = this.value;
			let tempValue: number = valueT === ValueType.Absolute ? valueV : refValue * valueV * 0.01;
			// 根据最小和最大值算出结果
			tempValue = this.calculateWithMin(refValue, tempValue);
			return this.calculateWithMax(refValue, tempValue);
		}

		/**
		 * 
		 * @param refvalue 参考值
		 * @param value 当前值
		 */
		private calculateWithMin(refvalue: number, value: number): number {
			let min: [ValueType, number] = this.min;
			if (Utils.isNullOrUndefined(min) || Utils.isNullOrUndefined(min[0]) || Utils.isNullOrUndefined(min[1])) return value;
			let [minType, minValue] = min;
			let realMin: number = minType === ValueType.Absolute ? minValue : minValue * refvalue * 0.01;
			return value >= realMin ? value : realMin;
		}

		/**
		 * 根据最大值
		 * @param refValue 
		 * @param value 
		 */
		private calculateWithMax(refValue: number, value: number): number {
			let max: [ValueType, number] = this.max;
			if (Utils.isNullOrUndefined(max) || Utils.isNullOrUndefined(max[0]) || Utils.isNullOrUndefined(max[1])) return value;
			let [maxType, maxValue] = max;
			let realMax: number = maxType === ValueType.Absolute ? maxValue : maxValue * refValue * 0.01;
			return value <= realMax ? value : realMax;
		}
	}
}