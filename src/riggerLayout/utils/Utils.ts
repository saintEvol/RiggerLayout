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

        /**
         * 分析用户填写的值规范
         * @param v 
         */
        public static parseValueSpecs(v: number | string): [ValueType, number] {
            if (Utils.isNullOrUndefined(v)) return [null, null];
            if (Utils.isString(v)) {
                if (Utils.isNullOrEmpty(v)) return [null, null];
                let idx: number = v.indexOf("%");
                let type: ValueType;
                if (idx >= 0) {
                    type = ValueType.Percent;
                }
                else {
                    type = ValueType.Static;
                }

                let num: number;                
                num = parseFloat(v);
                if (num === NaN) return [null, null];
                return [type, num];
            }
            else {
                return [ValueType.Static, v];
            }
        }
    }
}