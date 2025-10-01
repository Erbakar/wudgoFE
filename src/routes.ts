const routes = {
  home: {
    route: () => `/`,
    isIndex: true,
    routeFormat: `/`
  },
  signUp: {
    route: () => `/sign-up`,
    routeFormat: `/sign-up`
  },
  signIn: {
    route: () => `/sign-in`,
    routeFormat: `/sign-in`
  },
  forgotPassword: {
    route: () => `/forgot-password`,
    routeFormat: `/forgot-password`
  },
  resetPassword: {
    route: () => `/user/reset-password`,
    routeFormat: `/user/reset-password`
  },
  emailConfirmation: {
    route: () => `/email-confirmation`,
    routeFormat: `/email-confirmation`
  },
  faq: {
    route: () => `/faq`,
    routeFormat: `/faq`
  },
  termsOfUse: {
    route: () => `/terms-of-use`,
    routeFormat: `/terms-of-use`
  },
  privacyPolicy: {
    route: () => `/privacy-policy`,
    routeFormat: `/privacy-policy`
  },
  siteMap: {
    route: () => `/site-map`,
    routeFormat: `/site-map`
  },
  myProfile:{
    route:()=>`/my-profile`,
    routeFormat:`/my-profile`
  }
};

export default routes;