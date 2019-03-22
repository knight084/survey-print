import routeRole from '../configs/route-role';

/**
 * @desc authenticate route
 * @param {string} role
 * @param {string} routeName
 * @return {boolean} whether route valid
 */
export default (role, routeName) => {
  const routes = !role || !routeRole[role.toLowerCase()]
    ? routeRole.default.routes
    : routeRole[role.toLowerCase()].routes;

  return routes.includes(routeName);

};
