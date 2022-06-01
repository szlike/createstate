import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import crimeIndex from 'src/service/crime-index-formular';
import { CrimeIndex } from '../components/crimeIndex/crime-index';
import { CrimeIndexCard } from '../components/crimeIndex/crime-index-card';
import { DashboardLayout } from '../components/dashboard-layout';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Link from 'next/link'


const fetchData = async () => {
  const result1 = new Set()
  const result2= new Set()
  const response1 = await fetch("https://services.arcgis.com/S9th0jAJ7bqgIRjw/ArcGIS/rest/services/Major_Crime_Indicators/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=Neighbourhood&groupByFieldsForStatistics=Neighbourhood&outStatistics=%5B%0D%0A++%7B%0D%0A++++%22statisticType%22%3A+%22count%22%2C%0D%0A++++%22onStatisticField%22%3A+%22Neighbourhood%22%2C%0D%0A++++%22outStatisticFieldName%22%3A+%22NeighbourhoodCount%22%0D%0A++%7D%0D%0A%5D&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=");
  const response2 = await fetch("https://services.arcgis.com/S9th0jAJ7bqgIRjw/arcgis/rest/services/NeighbourhoodCrimeRates/FeatureServer/0/query?where=1%3D1&outFields=F2021_Population_Projection,HoodName&returnGeometry=false&outSR=4326&f=json")
  const data1 = await response1.json()
  const data2= await response2.json()
  data1 = data1.features
  data2 = data2.features
  data1.forEach((element) => {
    result1.add([String(element.attributes.Neighbourhood), String(element.attributes.NeighbourhoodCount)])
  })
  data2.forEach((element) => {
    result2.add([String(element.attributes.HoodName), String(element.attributes.F2021_Population_Projection)])
  })
  const i = 0
  const temp = new Array()
  for (let item1 of result1) {
    for (let item2 of result2){
      if(item1[0]===item2[0]){
        temp[i] = {
          id: uuid(),
          description:'Crime Index: '+crimeIndex(item1[1],item2[1]).toFixed(2),
          title: item1[0]
        }
        i = i + 1
        break
        
      }
   }
  }
  return temp
}

export default function CrimeIndexPage() {
  const [crimeIndex, setCrimeIndex] = useState([])
  const [keyword,setKeyword]=useState("")
  const getKeyword=(val)=>{
    setKeyword(val)
  }
  const getCrimeIndex=(val)=>{
    setCrimeIndex(val)
  }
  const handler=()=>{
    if(keyword!=''){
      crimeIndex.forEach((element)=>{
        if(keyword===element.title){
          const test=new Array()
          test.push(element)
          setCrimeIndex(test)
        }
      })

    }
  }
  useEffect(async () => {
    const data = await fetchData()
    setCrimeIndex(data)
    
    
  }, [keyword]);


  return (
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
          <CrimeIndex getKeyword={getKeyword} getCrimeIndex={getCrimeIndex} handler={handler}/>
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {crimeIndex.map((item) => (

              <Link href={"./crime-detail?title="+item.title}>
                <Grid
                  item
                  key={item.id}
                  lg={2}
                  md={3}
                  xs={6}
                >
                  <CrimeIndexCard crimeIndexData={item} />
                </Grid>
              </Link>

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

