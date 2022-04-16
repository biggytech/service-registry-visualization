import { useFormik } from "formik";
import * as Yup from 'yup';
import { useTranslation } from "../../utils/translate";
import UseFormInterface from "./lib/UseFormInterface";

const useGetServiceForm = ({ onSubmit }) => {
  const { translate } = useTranslation();

  const getServiceSchema = Yup.object().shape({
    serviceName: Yup.string()
      .min(1, translate('form.validation.minLength', { value: 1 }))
      .max(50, translate('form.validation.maxLength', { value: 50 }))
      .required(translate('form.validation.required')),
    serviceVersion: Yup.string()
      .min(1, translate('form.validation.minLength', { value: 1 }))
      .max(50, translate('form.validation.maxLength', { value: 50 }))
      .required(translate('form.validation.required'))
      .matches(/^[.0-9]*$/, translate('form.validation.onlyNumeric')),
  })

  const formik = useFormik({
    initialValues: {
      serviceName: '',
      serviceVersion: ''
    },
    onSubmit,
    validationSchema: getServiceSchema
  });

  return new UseFormInterface(formik).result;
};

export default useGetServiceForm;