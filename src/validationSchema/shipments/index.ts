import * as yup from 'yup';

export const shipmentValidationSchema = yup.object().shape({
  shipment_status: yup.string().required(),
  dispatch_date: yup.date().nullable(),
  arrival_date: yup.date().nullable(),
  inventory_id: yup.string().nullable().required(),
  company_id: yup.string().nullable().required(),
});
