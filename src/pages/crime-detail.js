import { useEffect, useState } from 'react';
import { DashboardLayout } from 'src/components/dashboard-layout';
import {cloneDeep} from 'lodash';
import { AgChartsReact } from 'ag-charts-react';

export default function CrimeDetail(){
    var stateData=new Array()
    stateData=[['0','0'],['0','0'],['0','0'],['0','0'],['0','0']]
    var str=location.search
    const index=str.indexOf('=')+1
    str=str.substring(index)
    str=str.replace(/%20/g,'+')
    var result=new Set()
    var resultArray=new Array()
    const fetchData = async () => {
        var searchUrl="https://services.arcgis.com/S9th0jAJ7bqgIRjw/arcgis/rest/services/Major_Crime_Indicators/FeatureServer/0/query?where=Neighbourhood%3D%27"+str+"%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=standard&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=Neighbourhood&groupByFieldsForStatistics=Neighbourhood%2Coccurrenceyear&outStatistics=%5B%0D%0A++%7B%0D%0A++++%22statisticType%22%3A+%22count%22%2C%0D%0A++++%22onStatisticField%22%3A+%22Neighbourhood%22%2C+%0D%0A++++%22outStatisticFieldName%22%3A+%22count%22%0D%0A++%7D+%0D%0A%5D&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token="
        const response = await fetch(searchUrl);
        const data = await response.json()
        data = data.features
        data.forEach((element) => {
          if(parseInt(element.attributes.occurrenceyear)>=2017){
             result.add([String(element.attributes.count),String(element.attributes.occurrenceyear)])
          }
        })
        resultArray=Array.from(result)

      
        return resultArray
    
      }
    const [state,setState]=useState(stateData)

    useEffect(async () => {
      const data = await fetchData()
      setState(data) 
   
    }, []);
    stateData = {
      options: {
        autoSize: true,
        title: {
          text:'Neighbourhood Crime Trend',
        },
        data: [
          {
            year: '2017',
            count: parseInt(state[0][0]),
          },
          {
            year: '2018',
            count: parseInt(state[1][0]),
          },
          {
            year: '2019',
            count: parseInt(state[2][0]),
          },
          {
            year: '2020',
            count: parseInt(state[3][0]),
          },
          {
            year: '2021',
            count: parseInt(state[4][0]),
          }
        ],
       
        series: [
          {
            xKey: 'year',
            yKey: 'count',
            label: {
              fontWeight: 'bold',
            },
          },
        ],
      },
    }


 return(
   

    <AgChartsReact options={stateData.options}/>
 )

}

CrimeDetail.getLayout=(page)=>(
  <DashboardLayout>
    {page}
  </DashboardLayout>
)


