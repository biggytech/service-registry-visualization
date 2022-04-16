import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from '../../utils/translate'

const useServiceRegistryForm = ({ onSubmit }) => {
  const { translate } = useTranslation();

  const serviceRegistrySchema = Yup.object().shape({
    serviceName: Yup.string()
      .min(1, translate('form.validation.minLength', { value: 1 }))
      .max(50, translate('form.validation.maxLength', { value: 50 }))
      .required(translate('form.validation.required')),
    serviceVersion: Yup.string()
      .min(1, translate('form.validation.minLength', { value: 1 }))
      .max(50, translate('form.validation.maxLength', { value: 50 }))
      .required(translate('form.validation.required'))
      .matches(/^[.0-9]*$/, translate('form.validation.onlyNumeric')),
    serviceIp: Yup.string()
      .min(7, translate('form.validation.minLength', { value: 7 }))
      .max(50, translate('form.validation.maxLength', { value: 50 }))
      .required(translate('form.validation.required'))
      .matches(/^[.0-9]*$/, translate('form.validation.onlyNumeric')),
    servicePort: Yup.number().min(0).max(9999).required(translate('form.validation.required')),
  });

  const formik = useFormik({
    initialValues: {
      serviceName: '',
      serviceVersion: '',
      serviceIp: '',
      servicePort: '',
    },
    onSubmit: (values, { resetForm }) => {
      onSubmit(values).then(resetForm);
    },
    validationSchema: serviceRegistrySchema
  });

  return {
    values: formik.values,
    errors: formik.errors,
    change: formik.handleChange,
    submit: formik.handleSubmit,
  }
};

export default useServiceRegistryForm;