import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from '../utils/translate';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import HelpText from '../components/HelpText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const ServicesList = ({ services, unregisterService }) => {
  const { translate } = useTranslation();
  return <Box
    component="div"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' },
      mb: 2
    }}
  >
    <Typography variant="h2" gutterBottom component="div">
      {translate('servicesList.title')}
    </Typography>
    <HelpText text={translate('servicesList.help')} />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{translate('servicesList.cells.serviceName')}</TableCell>
            <TableCell>{translate('servicesList.cells.serviceVersion')}</TableCell>
            <TableCell>{translate('servicesList.cells.serviceIp')}</TableCell>
            <TableCell>{translate('servicesList.cells.servicePort')}</TableCell>
            <TableCell>{translate('servicesList.cells.timestamp')}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((service) => (
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
              <TableCell>
                <IconButton color="primary" component="span" onClick={() => {
                  unregisterService(service.name, service.version, service.port, service.ip);
                }}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
}

export default ServicesList;