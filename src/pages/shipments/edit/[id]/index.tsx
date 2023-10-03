import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getShipmentById, updateShipmentById } from 'apiSdk/shipments';
import { shipmentValidationSchema } from 'validationSchema/shipments';
import { ShipmentInterface } from 'interfaces/shipment';
import { InventoryInterface } from 'interfaces/inventory';
import { CompanyInterface } from 'interfaces/company';
import { getInventories } from 'apiSdk/inventories';
import { getCompanies } from 'apiSdk/companies';

function ShipmentEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<ShipmentInterface>(
    () => (id ? `/shipments/${id}` : null),
    () => getShipmentById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ShipmentInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateShipmentById(id, values);
      mutate(updated);
      resetForm();
      router.push('/shipments');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<ShipmentInterface>({
    initialValues: data,
    validationSchema: shipmentValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Shipments',
              link: '/shipments',
            },
            {
              label: 'Update Shipment',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Shipment
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.shipment_status}
            label={'Shipment Status'}
            props={{
              name: 'shipment_status',
              placeholder: 'Shipment Status',
              value: formik.values?.shipment_status,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="dispatch_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Dispatch Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.dispatch_date ? new Date(formik.values?.dispatch_date) : null}
              onChange={(value: Date) => formik.setFieldValue('dispatch_date', value)}
            />
          </FormControl>
          <FormControl id="arrival_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Arrival Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.arrival_date ? new Date(formik.values?.arrival_date) : null}
              onChange={(value: Date) => formik.setFieldValue('arrival_date', value)}
            />
          </FormControl>
          <AsyncSelect<InventoryInterface>
            formik={formik}
            name={'inventory_id'}
            label={'Select Inventory'}
            placeholder={'Select Inventory'}
            fetcher={getInventories}
            labelField={'product_name'}
          />
          <AsyncSelect<CompanyInterface>
            formik={formik}
            name={'company_id'}
            label={'Select Company'}
            placeholder={'Select Company'}
            fetcher={getCompanies}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/shipments')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'shipment',
    operation: AccessOperationEnum.UPDATE,
  }),
)(ShipmentEditPage);
