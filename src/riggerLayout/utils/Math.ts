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
* 数学工具箱
*/
module riggerLayout{
	export class Math{
		public static max(ele1:any, ele2:any, ...objs:any[]):any{
			let max = ele1 >= ele2 ? ele1 : ele2;
			if(objs.length <= 0) return max;
			for(var i:number = 0; i < objs.length; ++i){
				max = max >= objs[i] ? max : objs[i]
			}

			return max;
		}

		public static min(ele1:any, ele2:any, ...objs:any[]):any{
			let min = ele1 <= ele2 ? ele1 : ele2;
			if(objs.length <= 0) return min;
			for(var i:number = 0; i < objs.length; ++i){
				min = min <= objs[i] ? min : objs[i]
			}

			return min;
		}

		constructor(){

		}
	}
}