import {ThemeEnum} from '../enum/theme-enum';
import {FinancingModelEnum} from '../enum/financing-model-enum';

/**
 * 系统设置信息。
 */
export interface VSettingInfo {

  /**
   * 整体主题样式
   */
  theme: ThemeEnum | string;
  /**
   * 侧滑菜单主体样式。dark or light
   */
  sliderMenuTheme: string;
  /**
   * 融资模式
   */
  financingMode: FinancingModelEnum;
}
