/*
* name;
*/
class LayaTopContainer implements riggerLayout.ITopContainer {
    protected item:Laya.Stage;
    setItem(item: any): void{
        this.item = item;
    }

    getDesignWidth(): number{
        return this.item.designWidth;
    }

    getDesignHeight(): number{
        return this.item.designHeight;
    }

    getRealWidth(): number{
        return Laya.Browser.clientWidth;
    }
    getRealHeight(): number{
        return Laya.Browser.clientHeight;        
    }

    onResize(caller: any, method: Function, args: any[]): void{
        this.item.on(Laya.Event.RESIZE, caller, method, args);
    }
    offResize(caller:any, method:Function):void{
        this.item.off(Laya.Event.RESIZE, caller, method);
    }

    constructor(item:Laya.Stage) {
        this.item = item;
    }

    dispose():void{
        this.item = null;
    }
}