import {
  Box,
  Button,
  Card,
  Grid,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';

export const CrimeIndex = (props) => (
  
  <Box {...props}>
     <Typography
        sx={{ textAlign:'center'}}
        variant="h4"
      >
        CrimeIndex
      </Typography>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: -1
      }}
    >
    </Box>
    <Grid container spacing={2}>
      <Grid xs={8}>
      <Box sx={{ mt: 3 }}>
        <Card>
        <CardContent>
          <Box sx={{ maxWidth: 1000,height:55 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
      </Box>
      </Grid>
      <Grid xs={4}>
      <Box sx={{ mt: 3 }}>
        <Card>
        <CardContent>
          <Box sx={{ height:55 }}>
            <Button
              color="primary"
              variant="contained"
            >
              Search
            </Button>
          </Box>
        </CardContent>
      </Card>
      </Box>
        
      </Grid>
      
    </Grid>

  </Box>
);
