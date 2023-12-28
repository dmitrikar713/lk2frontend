import { apiClient } from 'src/api/client/ApiClient';
import { FormFieldParameters } from 'src/entities/Forms';
import { requestSlice } from 'src/pages/Requests/Request/RequestSlice';
import { AppThunk } from '../../store';
import { servicesSlice } from 'src/pages/Services/ServicesSlice';

export const fetchServiceConfig =
  (serviceId: string | undefined, services: any): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(requestSlice.actions.requestLoad());
      const response = await apiClient.get<any>(
        `/requests/params?guid=${serviceId}`
      );

      const service = services.find(
        (serv) => serv.IDUslugiIsRpp[0] == serviceId
      );
      const fieldIds = service.isrppFieldslDs.map((obj) => obj.IdIsRpp); // айдишники полей услуги, полученные из конфига админки

      // РАСКОМЕНТИТЬ
      const fields = await response.data.records.filter((field) =>
        fieldIds.includes(field.parameterInApi)
      );

      fields.forEach((f) => {
        f.crmTable = service.isrppFieldslDs.find(
          (fid) => fid.IdIsRpp == f.parameterInApi
        ).Table;
      });

      // const fields = response.data.records;

      const dictionary = await fields.reduce(
        (
          accumulator: { [name: string]: any },
          currentValue: FormFieldParameters
        ) => ({
          ...accumulator,
          [currentValue.parameterInApi]: currentValue.fieldType.dictionaries
            .length
            ? {
                name: currentValue.name,
                dictionaries: currentValue.fieldType.dictionaries.reduce(
                  (accumulator, currentValue2) => ({
                    ...accumulator,
                    [currentValue2.id]: currentValue2.name,
                  }),
                  {}
                ),
              }
            : currentValue.name,
        }),
        {}
      );
      console.log('fetchserviceconfig');
      dispatch(requestSlice.actions.setFormConfig({ fields, dictionary }));
    } catch (error: any) {
      dispatch(requestSlice.actions.requestLoadError(error.message));
    }
  };
