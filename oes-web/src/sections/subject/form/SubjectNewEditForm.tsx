import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Card, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { PATH_DASHBOARD } from 'src/routes/paths';
import axiosInstance from 'src/utils/axios';
import * as Yup from 'yup';

type Props = {
  currentSubject: any;
  isEdit: boolean;
};

export default function SubjectNewEditForm({ currentSubject, isEdit }: Props) {
  const SubjectSchema = Yup.object().shape({
    code: Yup.string().required('Code is required').min(1, 'Code must not be empty'),
    name: Yup.string().required('Name is required').min(1, 'Code must not be empty'),
  });

  const defaultValues = {
    code: currentSubject?.code || '',
    name: currentSubject?.name || '',
  };

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    resolver: yupResolver(SubjectSchema),
    defaultValues,
  });

  const createSubject = useCallback(async (data: any) => {
    try {
      const response: any = await axiosInstance.post('/subject', data);
      if (response.error) {
        throw Error(response.message);
      }
      enqueueSnackbar('Create successful', { variant: 'success' });
      navigate(PATH_DASHBOARD.subject.root);
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
      console.log(error);
    }
  }, []);

  const deleteSubject = useCallback(async (id: string) => {
    try {
      const response: any = await axiosInstance.delete('/subject', {
        params: { id },
      });
      if (response.error) {
        throw Error(response.message);
      }
      enqueueSnackbar('Delete successful', { variant: 'success' });
      navigate(PATH_DASHBOARD.subject.root);
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
      console.log(error);
    }
  }, []);

  const updateSubject = useCallback(async (data: any) => {
    try {
      const response: any = await axiosInstance.put('/subject', data);
      if (response.error) {
        throw Error(response.message);
      }
      enqueueSnackbar('Update successful', { variant: 'success' });
      navigate(PATH_DASHBOARD.subject.root);
    } catch (error) {
      enqueueSnackbar(error, { variant: 'error' });
      console.log(error);
    }
  }, []);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleDelete = () => {
    deleteSubject(currentSubject!.id);
  };

  const onSubmit = (data: any) => {
    if (!currentSubject) {
      const params = {
        code: data.code,
        name: data.name,
      };
      createSubject(params);
    } else {
      const params = {
        id: currentSubject.id,
        name: data.name,
      };
      updateSubject(params);
    }
  };

  const disable = currentSubject;

  return (
    <>
      <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={3}>
            <RHFTextField name="code" label="Code" disabled={disable} />
            <RHFTextField name="name" label="Name" />
          </Stack>
          <Stack mt={3} direction="row" justifyContent="end" textAlign="end" spacing={2}>
            <LoadingButton loading={isSubmitting} variant="contained" type="submit">
              {currentSubject && isEdit ? 'Save' : 'Create'}
            </LoadingButton>
            {currentSubject && (
              <Button variant="contained" onClick={handleDelete}>
                Delete
              </Button>
            )}
          </Stack>
        </Card>
      </FormProvider>
    </>
  );
}
