// @ts-ignore
import BigDecimal from './bigDecimal';
export default interface StressCheckSummaryScore { 
  /**
   * ストレスの原因となる因子の平均値または中央値
   */
  a?: BigDecimal;
  /**
   * 心理的な仕事の負担（量）の平均値または中央値
   */
  a01?: BigDecimal;
  /**
   * 心理的な仕事の負担（質）の平均値または中央値
   */
  a02?: BigDecimal;
  /**
   * 自覚的な身体的負担度の平均値または中央値
   */
  a03?: BigDecimal;
  /**
   * 職場の対人関係でのストレスの平均値または中央値
   */
  a04?: BigDecimal;
  /**
   * 職場環境によるストレスの平均値または中央値
   */
  a05?: BigDecimal;
  /**
   * 仕事のコントロール度の平均値または中央値
   */
  a06?: BigDecimal;
  /**
   * 技能の活用度の平均値または中央値
   */
  a07?: BigDecimal;
  /**
   * 仕事の適性度の平均値または中央値
   */
  a08?: BigDecimal;
  /**
   * 働きがいの平均値または中央値
   */
  a09?: BigDecimal;
  /**
   * ストレスによっておこる心身の反応の平均値または中央値
   */
  b?: BigDecimal;
  /**
   * 活気の平均値または中央値
   */
  b01?: BigDecimal;
  /**
   * イライラ感の平均値または中央値
   */
  b02?: BigDecimal;
  /**
   * 疲労感の平均値または中央値
   */
  b03?: BigDecimal;
  /**
   * 不安感の平均値または中央値
   */
  b04?: BigDecimal;
  /**
   * 抑うつ感の平均値または中央値
   */
  b05?: BigDecimal;
  /**
   * 身体愁訴の平均値または中央値
   */
  b06?: BigDecimal;
  /**
   * ストレス反応に影響を与える他の因子の平均値または中央値
   */
  c?: BigDecimal;
  /**
   * 上司からのサポートの平均値または中央値
   */
  c01?: BigDecimal;
  /**
   * 同僚からのサポートの平均値または中央値
   */
  c02?: BigDecimal;
  /**
   * 家族・友人からのサポートの平均値または中央値
   */
  c03?: BigDecimal;
  /**
   * 仕事や生活の満足度の平均値または中央値
   */
  c04?: BigDecimal;
  /**
   * sex_id、unit_id（未所属の場合はundifined）、age（2,3,4,5）、project_id、undifined（allの場合）のいずれか
   */
  key?: number;
  mask: boolean;
  /**
   * 回答数
   */
  numberOfAnswers: number;
}
