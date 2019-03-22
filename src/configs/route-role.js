// mapped route according to the role
export default {
  // specified role

  // do not match anyone above, use default
  default: {
    routes: ['login', 'home'],
    initial: 'home'
  },
  // all routes
  whole: {
    routes: ['login', 'home'],
    initial: 'home'
  }
};
