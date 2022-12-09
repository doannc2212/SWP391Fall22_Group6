import { Container } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { PATH_DASHBOARD } from 'src/routes/paths';
import SubjectNewEditForm from 'src/sections/subject/form/SubjectNewEditForm';
import axiosInstance from 'src/utils/axios';

export default function SubjectEdit() {
  const { themeStretch } = useSettings();

  const { id = '' } = useParams();

  const navigate = useNavigate();

  const [data, setData] = useState<any>(null);

  const fetch = useCallback(async (id: string) => {
    try {
      const response: any = await axiosInstance.get('/subject', {
        params: { id },
      });
      if (response.error) {
        throw Error(response.error);
      }
      setData(response);
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetch(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const title = data?.name || 'Subject';

  if (!data) {
    return <div />;
  }

  return (
    <Page title="Subject: Edit">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={title}
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Subject',
              href: PATH_DASHBOARD.subject.root,
            },
            { name: title },
          ]}
        />
       <SubjectNewEditForm currentSubject={data} isEdit={true} />
      </Container>
    </Page>
  );
}
