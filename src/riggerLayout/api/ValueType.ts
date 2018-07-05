/**
* name 
*/
module riggerLayout{
	export enum ValueType{
		// 未检测到有效类型
		None = 0,

		/**
		 * 绝对值
		 */
		Absolute = 1,

		/**
		 * 相对值
		 */
		Relative = 2,

		/**
		 * 相对设计值
		 */
		RelativeDesign = 3,
	}
}