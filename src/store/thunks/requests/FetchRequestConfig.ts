import { apiClient } from 'src/api/client/ApiClient';
import { FormFieldParameters } from 'src/entities/Forms';
import { requestSlice } from 'src/pages/Requests/Request/RequestSlice';
import { AppThunk } from '../../store';

export const fetchRequestConfig =
  (serviceId: string | undefined): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(requestSlice.actions.requestLoad());
      const response = await apiClient.get<any>(
        `/requests/params?guid=${serviceId}`
      );
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
