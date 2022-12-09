// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  payment: '/payment',
  contact: '/contact-us',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  app: ROOTS_DASHBOARD + '/app',
  examination: {
    root: path(ROOTS_DASHBOARD, '/examination'),
    list: path(ROOTS_DASHBOARD, '/examination/list'),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/examination/edit/${id}`),
    view: (id: string) => path(ROOTS_DASHBOARD, `/examination/view/${id}`),
  },
  subject: {
    root: path(ROOTS_DASHBOARD, '/subject'),
    list: path(ROOTS_DASHBOARD, '/subject/list'),
    new: path(ROOTS_DASHBOARD, '/subject/new'),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/subject/edit/${id}`),
    view: (id: string) => path(ROOTS_DASHBOARD, `/subject/view/${id}`),
  },
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
};

export const PATH_DOCS = '';
