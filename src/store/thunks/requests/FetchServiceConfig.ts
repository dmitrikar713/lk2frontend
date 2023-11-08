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
      console.log('/requests/params?guid=... response:');
      console.log(response.data);

      const fieldIds = services
        .find((serv) => serv.IDUslugiIsRpp == serviceId)
        .isrppFieldslDs.map((obj) => obj.IdIsRpp); // айдишники полей услуги, полученные из конфига админки

      // РАСКОМЕНТИТЬ
      // const fields = response.data.records.filter((field) =>
      //   fieldIds.includes(field.parameterInApi)
      // );
      const fields = response.data.records;
      const dictionary = fields.reduce(
        (acc: { [name: string]: any }, next: FormFieldParameters) => ({
          ...acc,
          [next.parameterInApi]: next.fieldType.dictionaries.length
            ? {
                name: next.name,
                dictionaries: next.fieldType.dictionaries.reduce(
                  (acc, next) => ({ ...acc, [next.id]: next.name }),
                  {}
                ),
              }
            : next.name,
        }),
        {}
      );
      dispatch(requestSlice.actions.setFormConfig({ fields, dictionary }));
    } catch (error: any) {
      dispatch(requestSlice.actions.requestLoadError(error.message));
    }
  };
