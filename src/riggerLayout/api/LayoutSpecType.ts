/**
* 布局规范的类型
*/
module riggerLayout {
	export enum LayoutSpecType {
		None = 0,
		// 以屏幕尺寸为条件
		ScreenSize,
		// 自定义条件
		Custom
	}
}