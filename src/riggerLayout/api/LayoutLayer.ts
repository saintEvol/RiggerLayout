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
	export class LayoutLayer extends Group {
		protected topContainer: ITopContainer;
		constructor(container: ITopContainer) {
			super();
			this.topContainer = container;
			this.initRectangle();
			this.topContainer.onResize(this, this.onResize, null);
			this.layout = new LayoutBase();
		}

		public measure(ifChild: boolean = true): void {
			super.measure(ifChild);
			this.initRectangle();
		}

		protected initRectangle(): void {
			if (!this.rectangle) this.rectangle = Rectangle.createInstance();
			this.rectangle.x = 0;
			this.rectangle.y = 0;
			this.rectangle.width = this.topContainer.getRealWidth();
			this.rectangle.height = this.topContainer.getRealHeight();
		}

		protected decideRealSize():void{
			this.realWidth = this.topContainer.getRealWidth();
			this.realHeight = this.topContainer.getRealHeight();	
			super.decideRealSize();
					
		}

		protected decideRealPos():void{
			this.realX = 0;
			this.realY = 0;
			super.decideRealPos();
			
		}

		public draw(){
			// this.graphic.alpha = 0.5;
			// this.graphic.graphics.clear();
			// console.log(`group ${this.name} draw,x:${this.rectangle.x}, y:${this.rectangle.y}, width:${this.rectangle.width}, height:${this.rectangle.height}`);
			// this.graphic.graphics.drawRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height, "red");
		}


		protected onResize() {
			this.updateLayout();
		}
	}
}