import routeRole from '../configs/route-role';

/**
 * @desc get the initial route name according to the role
 * @param role
 * @return {string} initial route name
 */
export default role => {
  const mappedConfig = !role || !routeRole[role.toLowerCase()]
    ? routeRole.default
    : routeRole[role.toLowerCase()];

  return mappedConfig.initial;

};
