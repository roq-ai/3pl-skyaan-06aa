import * as yup from 'yup';

export const warehouseValidationSchema = yup.object().shape({
  name: yup.string().required(),
  location: yup.string().required(),
  capacity: yup.number().integer().required(),
  current_inventory: yup.number().integer().required(),
  company_id: yup.string().nullable().required(),
});
