import Head from 'next/head';
import { Box, Button, Card, Grid, Stack} from '@mui/material';
import { DashboardLayout } from 'src/components/sidebar/layout';

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { gqlQuery } from 'src/graphql/query';

import { Toast } from 'src/lib/toast';
import { Waveform } from 'src/components/sample/waveform';


const View = () => {

  const [snackBarState, setSnackBarState] = useState(false);
  const [snackBarText, setSnackBarText] = useState('No data found');
  const [snackBarSeverity, setSnackBarSeverity] = useState('success');
  const handleClose = useCallback((_event, reason) => { if (reason === 'clickaway') return; setSnackBarState(false); }, []);
  const popupToast = useCallback((msg, severity) => {
    setSnackBarState(true);
    setSnackBarText(msg);
    setSnackBarSeverity(severity);
  }, []);

  const [data, setData] = useState([]);

  //gql
  const [exeGqlGetSamples, resGqlGetSamples] = useLazyQuery(gqlQuery.samples.operation, { fetchPolicy: "network-only" });
  useEffect(() => {
    if(resGqlGetSamples.loading == 0 && resGqlGetSamples.data != undefined){
      const x = resGqlGetSamples.data[gqlQuery.samples.key];
      setData(x);
      popupToast('Generate data on server.', 'success');
    }
  }, [resGqlGetSamples.loading]);

  const generateData_onClient = useCallback(() => {
    let t = 0;
    const ts = 1e-3;
    const x = [];
    const amplitude = [];
    const frequency = [];
    const phase = [];
    for(let i = 0; i < 4; i++){
      x[i] = [];
      amplitude[i] = 2.0 * Math.random();
      frequency[i] = 4.0 * Math.random() + 1.0;
      phase[i] = 2.0 * Math.PI * Math.random();
    }
    for (let i = 0; i < 1000; i++) {
      x[0].push(t);
      for (let j = 1; j < 4; j++) {
        x[j].push(amplitude[j] * Math.sin(2.0 * Math.PI * frequency[j] * (t + phase[j])));
      }
      t += ts;
    }
    setData(x);
    popupToast('Generate data on client.', 'success');
  });

  const generateData_onServer = () => {
    exeGqlGetSamples({ notifyOnNetworkStatusChange: true });
  };
  return (
    <>

      <Toast state={snackBarState} closeFunction={handleClose} text={snackBarText} severity={snackBarSeverity} />

      <Card sx={{mx:1, my: 1, px: 2, py: 4}}>
        <Stack direction="row" spacing={2} sx={{mb: 5}}>
          <Button variant='outlined' onClick={() => generateData_onClient()}> Client side generation </Button>
          <Button variant='outlined'　onClick={() => generateData_onServer()}> Server side generation </Button>
        </Stack>
        <Waveform data={data} />
      </Card>
    </>
  )
};

const WacohTechGUI = () => {
  const client = new ApolloClient({uri: `/graphql`, cache: new InMemoryCache()});
  return (
    <>
      <Head>
        <title>
          Sample
        </title>
      </Head>

      <ApolloProvider client={client}>
        <View />
      </ApolloProvider>
    </>
  )
};

WacohTechGUI.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default WacohTechGUI;
