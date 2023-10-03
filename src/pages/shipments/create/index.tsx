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
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createShipment } from 'apiSdk/shipments';
import { shipmentValidationSchema } from 'validationSchema/shipments';
import { InventoryInterface } from 'interfaces/inventory';
import { CompanyInterface } from 'interfaces/company';
import { getInventories } from 'apiSdk/inventories';
import { getCompanies } from 'apiSdk/companies';
import { ShipmentInterface } from 'interfaces/shipment';

function ShipmentCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ShipmentInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createShipment(values);
      resetForm();
      router.push('/shipments');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ShipmentInterface>({
    initialValues: {
      shipment_status: '',
      dispatch_date: new Date(new Date().toDateString()),
      arrival_date: new Date(new Date().toDateString()),
      inventory_id: (router.query.inventory_id as string) ?? null,
      company_id: (router.query.company_id as string) ?? null,
    },
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
              label: 'Create Shipment',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Shipment
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
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
    operation: AccessOperationEnum.CREATE,
  }),
)(ShipmentCreatePage);
