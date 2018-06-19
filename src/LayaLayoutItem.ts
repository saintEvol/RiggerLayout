/*
* name;
*/
class LayaLayoutItem extends riggerLayout.LayoutItem<Laya.Sprite>{
    public get itemX(): number {
        return this.item.x;
    }
    public set itemX(v: number) {
        this.item.x = v;
    }

    public get itemY(): number {
        return this.item.y;
    }
    public set itemY(v: number) {
        this.item.y = v;
    }

    public get itemWidth(): number {
        return this.item.width;
    }
    public set itemWidth(v: number) {
        this.item.width = v;
    }

    public get itemHeight(): number {
        return this.item.height;
    }
    public set itemHeight(v: number) {
        this.item.height = v;
    }

    public get itemScaleX(): number {
        return this.item.scaleX
    }
    public set itemScaleX(v: number) {
        this.item.scaleX = v;
    }

    public get itemScaleY(): number {
        return this.item.scaleY;
    }
    public set itemScaleY(v: number) {
        this.item.scaleY = v;
    }

    public get itemPivotX(): number {
        return this.item.pivotX;
    }
    public set itemPivotX(v: number) {
        this.item.pivotX = v;
    }

    public get itemPivotY(): number{
        return this.item.pivotY;
    }
    public set itemPivotY(v: number)
    {
        this.item.pivotY = v;
    }

    constructor(item: Laya.Sprite) {
        super(item);
    }
}