import {Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {VMenuResp} from '../../../helpers/vo/resp/v-menu-resp';
import {Constants} from '../../../helpers/constants';

// https://blog.csdn.net/qq_28004379/article/details/80801378 // 动态获取dom，操作dom样式等
@Component({
  selector: 'app-aside',
  templateUrl: './app-aside.component.html',
  styleUrls: ['./app-aside.component.less']
})
export class AppAsideComponent implements OnInit {

  constructor() {}

  @Input() collapsed: boolean;

  // menus = APP_MENUS;
  menus: VMenuResp[];
  menusExtendAll: VMenuResp[] = [];

  theme  = environment.asideTheme === 'dark' ? true : false;  // 主题

  openMap: { [name: string]: boolean } = {};  // 类似hashMap

  path: any;
  menuParentTop1: any; // 最顶级菜单
  menuParentTop2: any; // 2 level

  ngOnInit() {
    this.menus = JSON.parse(localStorage.getItem(Constants.localStorageKey.menus));
    this.menusExtend(this.menus);
    this.initOpenMap();
  }

  /**
   * 把树形结构菜单全部伸展成一级，平级放在数组里面。
   */
  menusExtend(m: VMenuResp[]) {
    m.forEach(v => {
      this.menusExtendAll.push(v);
      if (v.children && v.children.length > 0) {
        this.menusExtend(v.children);
      }
    });
  }

  /**
   * 用key-value对象，记录每个菜单展开状态，收缩是false（默认），展开是true。
   */
  initOpenMap() {
    if (this.menusExtendAll && this.menusExtendAll.length > 0) {
      for (const i of this.menusExtendAll) {
        this.openMap[i.title] = false;
      }
    }
  }

  /**
   * 菜单展开时回调该方法。然后修改其余一级菜单的展开状态。
   * @param value 一级菜单名称。
   */
  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
    }
  }

  selectedMenuOnClickTabMenu(tabMenu: any) {
    const currentMenu = this.menusExtendAll.find(i => i.link === tabMenu.url);
    if (!currentMenu) {
      this.ngOnInit();
      this.path = null;
      return;
    }

    this.ngOnInit();
    this.path = tabMenu.url;

    if (currentMenu.parentId.toString() === '0') {
      this.openMap[currentMenu.title] = true;
    } else {
      // leve 2
      const parent1 = this.menusExtendAll.find(i => i.id === currentMenu.parentId);
      this.openMap[parent1.title] = true;
      if (parent1.parentId.toString() !== '0') {
        const parent0 = this.menusExtendAll.find(i => i.id === parent1.parentId);
        this.openMap[parent0.title] = true;
      }
    }
  }

  getMenuTop1(m: any): void {
    if (m && m.parentId.toString() === '0') {
      this.menuParentTop1 = m;
    } else {
      const parent = this.menusExtendAll.find(v => v.id === m.parentId);
      if (parent) {
        this.menuParentTop2 = parent;
      }
      this.getMenuTop1(parent);
    }
  }

  /**
   * 更改菜单主题
   */
  changeAsideMenuTheme(theme: boolean) {
    this.theme  = theme;
  }
}
