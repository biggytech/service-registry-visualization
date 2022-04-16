import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useGetServiceForm from '../hooks/forms/useGetServiceForm';
import { useTranslation } from '../utils/translate';
import HelpText from '../components/HelpText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const GetService = ({ getService }) => {
  const [service, setService] = useState();

  const handleSubmit = useCallback((values) => {
    return getService(values.serviceName, values.serviceVersion).then(setService);
  }, [getService]);
  const form = useGetServiceForm({ onSubmit: handleSubmit });
  const { translate } = useTranslation();

  return <Box component="div" sx={{
    '& .MuiTextField-root': { m: 1, width: '25ch' },
    mb: 2
  }}><Box
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
        {translate('getServiceForm.title')}
      </Typography>
      <HelpText text={translate('getServiceForm.help')} />
      <div>
        <TextField
          required
          name="serviceName"
          label={translate('getServiceForm.serviceName.label')}
          value={form.values.serviceName}
          onChange={form.change}
          error={!!form.errors.serviceName}
          helperText={form.errors.serviceName}
        />
        <TextField
          required
          name="serviceVersion"
          label={translate('getServiceForm.serviceVersion.label')}
          value={form.values.serviceVersion}
          onChange={form.change}
          error={!!form.errors.serviceVersion}
          helperText={form.errors.serviceVersion}
        />
      </div>
      <Button variant="contained" type="submit" disabled={!!Object.keys(form.errors).length}>{translate('getServiceForm.submitText')}</Button>
    </Box>
    {service ? <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{translate('getServiceForm.cells.serviceName')}</TableCell>
            <TableCell>{translate('getServiceForm.cells.serviceVersion')}</TableCell>
            <TableCell>{translate('getServiceForm.cells.serviceIp')}</TableCell>
            <TableCell>{translate('getServiceForm.cells.servicePort')}</TableCell>
            <TableCell>{translate('getServiceForm.cells.timestamp')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key={service.name + service.version}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {service.name}
            </TableCell>
            <TableCell>{service.version}</TableCell>
            <TableCell>{service.ip}</TableCell>
            <TableCell>{service.port}</TableCell>
            <TableCell>{new Date(service.timestamp * 1000).toLocaleTimeString()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer> : null}
    {service === null ? <Typography variant="subtitle1" gutterBottom component="div">
      {translate('getServiceForm.notFound')}
    </Typography> : null}
  </Box>
};

export default GetService;