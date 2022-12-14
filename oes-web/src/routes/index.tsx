import { ElementType, lazy, Suspense } from 'react';
import { Navigate, Outlet, useLocation, useRoutes } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import RoleBasedGuard from 'src/guards/RoleBasedGuard';
import LoadingScreen from '../components/LoadingScreen';
import { PATH_DASHBOARD } from './paths';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isAuthenticated } = useAuth();

  const isDashboard = pathname.includes('/dashboard') && isAuthenticated;

  return (
    <Suspense fallback={<LoadingScreen isDashboard={isDashboard} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'new-password', element: <NewPassword /> },
        { path: 'verify', element: <VerifyCode /> },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralApp /> },
        {
          element: (
            <RoleBasedGuard hasContent roles={['STUDENT']}>
              <Outlet />
            </RoleBasedGuard>
          ),
          children: [
            {
              path: 'examination',
              children: [
                {
                  element: <Navigate to={PATH_DASHBOARD.examination.list} replace />,
                  index: true,
                },
                { path: 'list', element: <ExaminationListPage /> },
              ],
            },
          ],
        },
        {
          element: (
            <RoleBasedGuard hasContent roles={['LECTURER']}>
              <Outlet />
            </RoleBasedGuard>
          ),
          children: [
            {
              path: 'subject',
              children: [
                {
                  element: <Navigate to={PATH_DASHBOARD.subject.list} replace />,
                  index: true,
                },
                { path: 'list', element: <SubjectListPage /> },
                { path: 'new', element: <SubjectNewPage /> },
                { path: 'edit/:id', element: <SubjectEditPage /> },
                { path: 'view/:id', element: <SubjectDetailPage /> },
              ],
            },
            {
              path: 'topic',
              children: [
                {
                  element: <Navigate to={PATH_DASHBOARD.topic.list} replace />,
                  index: true,
                },
                { path: 'list', element: <TopicListPage /> },
                { path: 'new', element: <TopicNewPage /> },
                { path: 'edit/:id', element: <TopicEditPage /> },
                { path: 'view/:id', element: <TopicDetailPage /> },
              ],
            },
            {
              path: 'examination_report',
              children: [
                {
                  element: <Navigate to={PATH_DASHBOARD.examination_report.list} replace />,
                  index: true,
                },
                { path: 'list', element: <ExaminationReportListPage /> },
                { path: 'new', element: <ExaminationReportNewPage /> },
                { path: 'edit/:id', element: <ExaminationReportEditPage /> },
                { path: 'view/:id', element: <ExaminationReportDetailPage /> },
              ],
            },
            {
              path: 'question',
              children: [
                {
                  element: <Navigate to={PATH_DASHBOARD.question.list} replace />,
                  index: true,
                },
                { path: 'list', element: <QuestionistPage /> },
                { path: 'new', element: <QuestionNewPage /> },
                { path: 'edit/:id', element: <QuestionEditPage /> },
                { path: 'view/:id', element: <QuestionDetailPage /> },
              ],
            },
          ],
        },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },

    { path: '/', element: <Navigate to="/dashboard" replace /> },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const NewPassword = Loadable(lazy(() => import('../pages/auth/NewPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));

const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));

const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const Page403 = Loadable(lazy(() => import('../pages/Page403')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));

const SubjectListPage = Loadable(lazy(() => import('../pages/subject/SubjectList')));
const SubjectDetailPage = Loadable(lazy(() => import('../pages/subject/SubjectDetail')));
const SubjectEditPage = Loadable(lazy(() => import('../pages/subject/SubjectEdit')));
const SubjectNewPage = Loadable(lazy(() => import('../pages/subject/SubjectNew')));

const TopicListPage = Loadable(lazy(() => import('../pages/topic/TopicList')));
const TopicDetailPage = Loadable(lazy(() => import('../pages/topic/TopicDetail')));
const TopicEditPage = Loadable(lazy(() => import('../pages/topic/TopicEdit')));
const TopicNewPage = Loadable(lazy(() => import('../pages/topic/TopicNew')));

const QuestionistPage = Loadable(lazy(() => import('../pages/question/QuestionList')));
const QuestionDetailPage = Loadable(lazy(() => import('../pages/question/QuestionDetail')));
const QuestionEditPage = Loadable(lazy(() => import('../pages/question/QuestionEdit')));
const QuestionNewPage = Loadable(lazy(() => import('../pages/question/QuestionNew')));

const ExaminationReportListPage = Loadable(
  lazy(() => import('../pages/examination_report/ExaminationReportList'))
);
const ExaminationReportDetailPage = Loadable(
  lazy(() => import('../pages/examination_report/ExaminationReportDetail'))
);
const ExaminationReportEditPage = Loadable(
  lazy(() => import('../pages/examination_report/ExaminationReportEdit'))
);
const ExaminationReportNewPage = Loadable(
  lazy(() => import('../pages/examination_report/ExaminationReportNew'))
);

const ExaminationListPage = Loadable(lazy(() => import('../pages/examination/ExaminationList')));
