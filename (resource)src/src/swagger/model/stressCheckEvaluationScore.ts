// @ts-ignore
import StressCondition from './stressCondition';
export default interface StressCheckEvaluationScore { 
  /**
   * 心理的な仕事の負担（量）
   */
  a01: number;
  /**
   * 心理的な仕事の負担（質）
   */
  a02: number;
  /**
   * 自覚的な身体的負担度
   */
  a03: number;
  /**
   * 職場の対人関係でのストレス
   */
  a04: number;
  /**
   * 職場環境によるストレス
   */
  a05: number;
  /**
   * 仕事のコントロール度
   */
  a06: number;
  /**
   * 技能の活用度
   */
  a07: number;
  /**
   * 仕事の適性度
   */
  a08: number;
  /**
   * 働きがい
   */
  a09: number;
  /**
   * 活気
   */
  b01: number;
  /**
   * イライラ感
   */
  b02: number;
  /**
   * 疲労感
   */
  b03: number;
  /**
   * 不安感
   */
  b04: number;
  /**
   * 抑うつ感
   */
  b05: number;
  /**
   * 身体愁訴
   */
  b06: number;
  /**
   * 上司からのサポート
   */
  c01: number;
  /**
   * 同僚からのサポート
   */
  c02: number;
  /**
   * 家族・友人からのサポート
   */
  c03: number;
  /**
   * 仕事や生活の満足度
   */
  c04: number;
  /**
   * 高ストレス
   */
  highStress: boolean;
  stressCondition: StressCondition;
  /**
   * ストレス反応
   */
  stressReaction: string;
  /**
   * ストレッサー
   */
  stresser: string;
}
