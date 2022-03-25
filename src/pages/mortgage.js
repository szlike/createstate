import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import  App  from '../components/mortgage/App';
import { SettingsPassword } from '../components/settings/settings-password';
const Settings = () => (
  <>
    <Head>
      <title>
        Settings | Material Kit
      </title>
    </Head>
    <Box>
      {/* <Container maxWidth="lg"> */}
        {/* <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
        </Typography> */}
        <App/>
      {/* </Container> */}
    </Box>
  </>
);

Settings.getLayout = (page) => (
  // <DashboardLayout>
    page
  // </DashboardLayout>

);

export default Settings;
