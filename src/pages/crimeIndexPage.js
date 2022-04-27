import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { CrimeIndex } from '../components/crimeIndex/crimeIndex';
import { CrimeIndexCard } from '../components/crimeIndex/crimeIndex-card';
import { DashboardLayout } from '../components/dashboard-layout';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
export default  function CrimeIndexPage (){
  const [crimeIndexData,setCrimeIndexData]=useState([
    {
      id: uuid(),
      media: '/static/images/products/product_1.png',
      title: 'Dropbox',
    },
    {
      id: uuid(),
      media: '/static/images/products/product_2.png',
      title: 'Medium Corporation',
    }
  ])
  // const result=new Set()
  // const fetchData =  async () => {
  //   const response =  await fetch("https://services.arcgis.com/S9th0jAJ7bqgIRjw/arcgis/rest/services/Major_Crime_Indicators/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson");
  //   const data =  await response.json()
  //   data=data.features
  //   data.forEach((element)=>{
  //     result.add(String(element.properties.Division))
  //   })
  //   const i=0
  //   for(let item of result){
  //     crimeIndexData[i].title=item
  //     i=i+1
  //   }
  //   console.log()
  // }
console.log(crimeIndexData)
  useEffect(() => {
    const result=new Set()
    const fetchData =  async () => {
      const response =  await fetch("https://services.arcgis.com/S9th0jAJ7bqgIRjw/arcgis/rest/services/Major_Crime_Indicators/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson");
      const data =  await response.json()
      data=data.features
      data.forEach((element)=>{
        result.add(String(element.properties.Division))
      })
      const i=0
      const temp=[...crimeIndexData]
      for(let item of result){
        temp[i].title=item
        i=i+1
      }
      // console.log(temp)
      await setCrimeIndexData(c=>temp)   

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
            {crimeIndexData.map((item) => (
            
              <Grid
                item
                key={item.id}
                lg={6}
                md={6}
                xs={12}
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

