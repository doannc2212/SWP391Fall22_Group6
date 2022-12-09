import { Container } from '@mui/material';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { PATH_DASHBOARD } from 'src/routes/paths';

export default function QuestionNew() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Topic: New">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Create Topic"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Topic',
              href: PATH_DASHBOARD.subject.root,
            },
            { name: 'New' },
          ]}
        />
        {/* <AccountNewEditForm isEdit={false} currentAccount={null} /> */}
      </Container>
    </Page>
  );
}
