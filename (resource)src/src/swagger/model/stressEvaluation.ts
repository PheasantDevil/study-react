export default interface StressEvaluation { 
  code: string;
  id: number;
  order: number;
  /**
   * 評価点の1,2,3,4,5はそれぞれ、Falseの場合は「低い・やや低い・普通・やや高い・高い」を意味し、Trueの場合は逆で「高い・やや高い・普通・やや低い・低い」を意味する。
   */
  reverse: boolean;
  text: string;
}
