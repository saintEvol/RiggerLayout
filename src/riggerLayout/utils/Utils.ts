/**
* name 
*/
module riggerLayout {
    export class Utils {
        /**
         * 判断参数是否是一个字符串
         */
        public static isString(str): str is string {
            return typeof str === "string";
        }

        /**
         * 判断参数是否是一个数字
         * @param num 
         */
        public static isNumber(num):num is number{
            return typeof num === "number";
        }

        /**
         * 判断是否是函数
         * @param fun 
         */
        public static isFunction(fun):fun is Function{
            return typeof fun === "function";
        }

        /**
         * 检查是否为空或未定义
         */
        public static isNullOrUndefined(obj: any) {
            return obj === null || obj === undefined;
        }

        /**
         * 字符串是否为空或空串
         */
        public static isNullOrEmpty(str: string): boolean {
            return Utils.isNullOrUndefined(str) || str.length <= 0;
        }

    }
}