// 程序入口
class GameMain{
    public get x():number{
        return 1;
    }

    layoutLayer:riggerLayout.LayoutLayer;
    constructor()
    {
        Laya.init(600,400);
        this.layoutLayer = new riggerLayout.LayoutLayer(new LayaTopContainer(Laya.stage));
        this.layoutLayer.name = "top";
        // this.layoutLayer.layout
        riggerLayout.GlobalSettings.realLayoutItemClass = LayaLayoutItem;
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;

        let label:Laya.Label = new Laya.Label("test Layout");
        let label1:Laya.Label = new Laya.Label("test Layout should be longer");        
        label.pivotX = label.width;
        label.color = "white";
        label1.color = "white";
        label1.pivotX = label1.width;
        label1.y = 17;
        Laya.stage.addChild(label);
        Laya.stage.addChild(label1);

        let label3:Laya.Label = new Laya.Label("sub layout");
        label3.color = "red";
        Laya.stage.addChild(label3);

        let subGroup:riggerLayout.Group = new riggerLayout.Group(label3);
        subGroup.right = "0%";
        // subGroup.verticalCenter = 0;
        // 顶距
        subGroup.bottom="-50%"
        // 宽
        subGroup.width = "100%"
        // 高
        // subGroup.height = "30%"        
        // 布局类（用于实现子项的排列布局，如网格形排列，环形排列等）
        subGroup.layout = new riggerLayout.LayoutBase();
        
        let mainGroup = new riggerLayout.Group(label);
        // debug输出用
        mainGroup.name = "main";
        mainGroup.addChild(label1);
        mainGroup.layout = new riggerLayout.LayoutBase();
        mainGroup.addChild(subGroup);  
        mainGroup.right = "0%";
        mainGroup.width = "50%"
        // mainGroup.height = "50%"
        
        this.layoutLayer.addChild(mainGroup);
        let contentArr:string[] = ["I have an orange, and will share with you.", "Sample is beauty.", "Wow, just change!", "Yes", "Great Good", "这是一个跨引擎的通用适配与自动布局框架"]
        label3.text = contentArr[5];
        let i:number = 0;
        // Laya.timer.loop(1000, this, () => {
        //     label3.text = contentArr[i];
        //     ++i;
        //     if(i >= contentArr.length) i = 0; 
        //     Laya.timer.callLater(subGroup, subGroup.onChildRectangleChange);
        //     // subGroup.onChildRectangleChange()
        // })

    }
}
new GameMain();