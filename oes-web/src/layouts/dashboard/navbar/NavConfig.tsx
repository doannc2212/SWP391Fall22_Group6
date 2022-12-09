import { PATH_DASHBOARD } from '../../../routes/paths';
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const ICONS = {
  request: <Iconify icon="bx:git-pull-request" />,
};

const studentNavConfig = [
  {
    subheader: 'Application',
    items: [{ title: 'examination', path: PATH_DASHBOARD.examination.root, icon: ICONS.request }],
  },
];

const lectureNavConfig = [
  {
    subheader: 'Application',
    items: [
      { title: 'topic', path: PATH_DASHBOARD.subject.root, icon: ICONS.request },
      { title: 'subject', path: PATH_DASHBOARD.subject.root, icon: ICONS.request },
      { title: 'examination report', path: PATH_DASHBOARD.subject.root, icon: ICONS.request },
      { title: 'question', path: PATH_DASHBOARD.subject.root, icon: ICONS.request },
    ],
  },
];

const adminNavConfig = [
  {
    subheader: 'Management',
    items: [
      { title: 'topic', path: PATH_DASHBOARD.subject.root, icon: ICONS.request },
      { title: 'subject', path: PATH_DASHBOARD.subject.root, icon: ICONS.request },
      { title: 'question bank', path: PATH_DASHBOARD.subject.root, icon: ICONS.request },
    ],
  },
];


export { lectureNavConfig, studentNavConfig, adminNavConfig };
