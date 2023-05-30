import React, { FC } from 'react';
import { Form } from 'src/components/Form/Form';
import { Input, InputType } from 'src/components/Input/Input';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { updateProfile } from 'src/store/thunks/profile/UpdateProfile';

import styles from '../Profile.module.scss';
import { Card } from 'src/components/Card/Card';
import { UserInfo } from 'src/entities/Forms';
import { Skeleton } from 'src/components/Skeleton/Skeleton';
import { Breadcrumbs } from 'src/components/Breadcrumbs/Breadcrumbs';
import { RoutePaths } from 'src/entities/Routes';
import { disabledFields } from '../Profile';

const RepresentativeProfile: FC = () => {
  const dispatch = useAppDispatch();

  const { profile, isLoading } = useAppSelector(
    (state) => state.profileReducer
  );
  const { user } = profile;

  const handleSubmit = (formData: any) => {
    const formKeys = Object.keys(formData);
    const userData: any = {};
    formKeys.forEach((key) => {
      if (key.indexOf('user_') === 0) {
        return (userData[key] = formData[key]);
      }
    });
    dispatch(
      updateProfile({
        ...profile,
        user: userData,
      })
    );
  };

  return (
    <div className={styles.Profile}>
      {isLoading ? (
        <>
          <Skeleton rows={5} withTitle />
        </>
      ) : (
        <Form defaultValues={user} onSubmit={handleSubmit} isDisabledOriginally>
          <Card>
            <Breadcrumbs
              withArrowBack
              breadcrumbList={[
                {
                  title: 'Назад к профилю компании',
                  path: RoutePaths.PROFILE,
                },
              ]}
            />
            <div className={styles.ProfileTitle}>Данные представителя</div>
            {Object.keys(user)
              .filter((key) => key !== 'user_id')
              .map((key) => (
                <Input
                  key={key}
                  name={key}
                  label={UserInfo[key as keyof typeof UserInfo]}
                  type={
                    key.includes('phone') ? InputType.Phone : InputType.Text
                  }
                  disabled={disabledFields.includes(key)}
                />
              ))}
          </Card>
        </Form>
      )}
    </div>
  );
};

export default RepresentativeProfile;
