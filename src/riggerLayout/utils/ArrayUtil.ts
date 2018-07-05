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
* 数组工具箱 
*/
module riggerLayout {
	export class ArrayUtil {

		/**
		 * 在数组中查找指定元素的索引，如果未找到，则返回-1
		 * @param arr 
		 * @param predFun 
		 */
		public static findIndex(arr: any[], predFun: (ele: any, arr?: any[], idx?: number) => boolean) {
			if (!arr || arr.length <= 0) return -1;
			let len: number = arr.length;
			for (var i: number = 0; i < len; ++i) {
				if (predFun(arr[i], arr, i)) {
					return i;
				}
			}

			return -1;
		}

		/**
		 * 从数组中移除一个符合条件的元素，如果移除成功返回被移除元素的索引
		 * 只移除第一个符合条件的元素
		 * @param arr 
		 * @param predFun 
		 */
		public static remove<T>(arr: T[], predFun: (ele: T, arr?: T[], idx?: number) => boolean): number {
			let idx: number = ArrayUtil.findIndex(arr, predFun);
			if (idx < 0) return idx;
			ArrayUtil.removeAt(arr, idx);
			return idx;

		}

		/**
		 * 从数组中移除指定索引的元素
		 * @param arr 
		 * @param idx 
		 */
		public static removeAt(arr:any[], idx: number): any[] {
			arr.splice(idx, 1);
			return arr;
		}

		constructor() {

		}
	}
}