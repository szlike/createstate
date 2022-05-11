import { Box, Card, CardContent, Typography } from '@mui/material';


export const CrimeIndexCard = ({ crimeIndexData, ...rest }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
  >
    <CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 3
        }}
      >
      </Box>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h5"
      >
        {crimeIndexData.title}
      </Typography>
      <Typography
        align="center"
        color="red"
        variant="body1"
      >
        {crimeIndexData.description}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
  </Card>
);


