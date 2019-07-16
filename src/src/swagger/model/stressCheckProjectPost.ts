// @ts-ignore
import Period from './period';
export default interface StressCheckProjectPost { 
  /**
   * 開示について
   */
  aboutDisclosure: string;
  /**
   * 高ストレス者への面談勧奨
   */
  encouragement: string;
  /**
   * 対象者
   */
  examinee: string;
  /**
   * 名称（例：2018年度ストレスチェック）
   */
  name: string;
  /**
   * 実施者
   */
  operator: string;
  period: Period;
  /**
   * ①心身のストレス反応
   */
  pointOfConversionMethodB1: number;
  /**
   * ②心身のストレス反応
   */
  pointOfConversionMethodB2: number;
  /**
   * ②仕事のストレス要因＋周囲のサポート
   */
  pointOfConversionMethodC2: number;
  /**
   * ストレスチェックの目的
   */
  purpose: string;
  /**
   * 質問表id
   */
  questionnaireId: number;
  /**
   * データの取り扱い
   */
  regulations: string;
  /**
   * 年度
   */
  year: number;
}
