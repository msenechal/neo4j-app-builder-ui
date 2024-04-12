import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '@neo4j-ndl/base/lib/neo4j-ds-styles.css';

import ThemeWrapper from './context/ThemeWrapper';
import { FileContextProvider } from './context/connectionFile';

import PageNotFound from './shared/components/PageNotFound';
import Home from './content/Home';

import './ConnectionModal.css';

function App() {
  const [activeTab, setActiveTab] = useState<string>('Home');
  return (
    <BrowserRouter>
      <ThemeWrapper>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </ThemeWrapper>
    </BrowserRouter>
  );
}

export default App;
