import Head from 'next/head';
import { Box, Container, Grid} from '@mui/material';
import { CrimeIndex } from '../components/crimeIndex/crime-index';
import { CrimeIndexCard } from '../components/crimeIndex/crime-index-card';
import { DashboardLayout } from '../components/dashboard-layout';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
export default  function CrimeIndexPage (){
  const [crimeIndex,setCrimeIndex]=useState([])
console.log(crimeIndex)
  useEffect(() => {
    const result=new Set()
    const fetchData =  async () => {
      const response =  await fetch("https://services.arcgis.com/S9th0jAJ7bqgIRjw/ArcGIS/rest/services/Major_Crime_Indicators/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=Neighbourhood&groupByFieldsForStatistics=Neighbourhood&outStatistics=%5B%0D%0A++%7B%0D%0A++++%22statisticType%22%3A+%22count%22%2C%0D%0A++++%22onStatisticField%22%3A+%22Neighbourhood%22%2C%0D%0A++++%22outStatisticFieldName%22%3A+%22NeighbourhoodCount%22%0D%0A++%7D%0D%0A%5D&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=");
      const data =  await response.json()
      data=data.features
      data.forEach((element)=>{
        result.add([String(element.attributes.Neighbourhood),String(element.attributes.NeighbourhoodCount)])
      })
      const i=0
      const temp=new Array()
      console.log(result)
      for(let item of result){
        temp[i]={
          id: uuid(),
          description:item[1],
          title:item[0]   
        }
        i=i+1
      }
    
      await setCrimeIndex(c=>temp)   

    }
    fetchData()

  },[]);


return(
  <>
    <Head>
      <title>
      CrimeIndex | Material Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <CrimeIndex />
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            {crimeIndex.map((item) => (
            
              <Grid
                item
                key={item.id}
                lg={2}
                md={3}
                xs={6}
              >
                <CrimeIndexCard crimeIndexData={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
        </Box>
      </Container>
    </Box>
  </>)
};

CrimeIndexPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

