/**
* name 
*/
module riggerLayout{
	export interface ITopContainer{
		setItem(item:any):void;
		getDesignWidth():number;
		getDesignHeight():number;
		getRealWidth():number;
		getRealHeight():number;
		onResize(caller:any, method:Function, args?:any[]):void;
		offResize(caller:any, method:Function);

		dispose():void;
	}
}