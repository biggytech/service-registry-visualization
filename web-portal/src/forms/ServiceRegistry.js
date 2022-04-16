import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useServiceRegistryForm from '../hooks/forms/useServiceRegistryForm';
import { useTranslation } from '../utils/translate';
import HelpText from '../components/HelpText';

const ServiceRegistry = ({ registerService, showHelp }) => {
  const handleSubmit = useCallback((values) => {
    return registerService(values.serviceName, values.serviceVersion, values.servicePort, values.serviceIp);
  }, [registerService]);
  const form = useServiceRegistryForm({ onSubmit: handleSubmit });
  const { translate } = useTranslation();

  return <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' },
      mb: 2
    }}
    noValidate
    autoComplete="on"
    onSubmit={form.submit}
  >
    <Typography variant="h2" gutterBottom component="div">
      {translate('registerServiceForm.title')}
    </Typography>
    <div>
      <TextField
        required
        name="serviceName"
        label={translate('registerServiceForm.serviceName.label')}
        value={form.values.serviceName}
        onChange={form.change}
        error={!!form.errors.serviceName}
        helperText={form.errors.serviceName}
      />
      <TextField
        required
        name="serviceVersion"
        label={translate('registerServiceForm.serviceVersion.label')}
        value={form.values.serviceVersion}
        onChange={form.change}
        error={!!form.errors.serviceVersion}
        helperText={form.errors.serviceVersion}
      />
      <TextField
        required
        name="serviceIp"
        label={translate('registerServiceForm.serviceIp.label')}
        value={form.values.serviceIp}
        onChange={form.change}
        error={!!form.errors.serviceIp}
        helperText={form.errors.serviceIp}
      />
      <TextField
        required
        type="number"
        name="servicePort"
        label={translate('registerServiceForm.servicePort.label')}
        value={form.values.servicePort}
        onChange={form.change}
        error={!!form.errors.servicePort}
        helperText={form.errors.servicePort}
      />
    </div>
    {showHelp ? <HelpText text={translate('registerServiceForm.help')} /> : null}
    <Button variant="contained" type="submit" disabled={!!Object.keys(form.errors).length}>{translate('registerServiceForm.submitText')}</Button>
  </Box>
};

export default ServiceRegistry;