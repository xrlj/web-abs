export interface VPdfShow {

  /**
   * 文件存储id。
   */
  id?: string;
  /**
   * pdf文件访问地址。
   */
  url: string;
  /**
   * 文件原始名称。(浏览器下载pdf的文件名)
   */
  oriName?: string;
  /**
   * 文件大小。B
   */
  fileSize?: number;
  /**
   * 文件扩展名。
   */
  suffix?: string;
}
