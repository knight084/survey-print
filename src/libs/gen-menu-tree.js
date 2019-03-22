import menuList from '../configs/menu-list';
import menuRole from '../configs/menu-role';

// generate menu according to role
export default role => {
  const menuTree = [],
    menuItemIds = !role || !menuRole[role.toLowerCase()]
      ? menuRole.default
      : menuRole[role.toLowerCase()];

  menuItemIds.forEach(menuItemId => {
    // find the menuItem by id
    const menuItem = menuList.find(menuItem => menuItem.id === menuItemId);

    if (!menuItem) {
      throw new Error(`the menu-item's id:${menuItemId} defined for role:${role} in the role-menu-map.js module is not a valid menu-item in menu-list.js module`);
    }

    const pId = menuItem.pid;

    // if the pid field of this menu-item equals null, means it is a top-level menu-item
    if (!pId) {
      menuTree.push(menuItem);
      return;
    }

    // is not a top-level menu-item, find it's parent menu-item
    const pMenu = menuList.find(menuItem => menuItem.id === pId);

    if (!pMenu) {
      throw new Error(`menu-item ${menuItemId}'s parent-menu's id:${pId} doesn't match anyone if the menu-list.js module`);
    }

    // attach a private property '_children' to the parent-menu object to store the children menu-item
    pMenu._children = pMenu._children || [];

    // do not add current menu-item to it's parent-menu if the parent-menu has contained it
    if (pMenu._children.find(menuItem => menuItem.id === menuItemId)) {
      return;
    }

    pMenu._children.push(menuItem);
  });

  return menuTree;
}


