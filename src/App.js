import { Box, Loader } from '@mantine/core';
import { HomePage } from "./pages/home.page";
import { useEffect, useState } from 'react';

function App() {
  const [commandConfig, setCommandConfig] = useState(undefined);

  useEffect(() => {
    fetch('./command.config.json').then((res) => res.json()).then(config => setCommandConfig(config));
  }, [])

  return (
    <Box style={{ display: 'flex' }}>
      {
        !commandConfig ?
          <Loader m='auto' mt='47vh' />
          :
          <HomePage commandConfig={commandConfig} />
      }

    </Box>
  );
}

export default App;
