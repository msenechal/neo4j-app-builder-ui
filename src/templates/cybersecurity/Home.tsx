import React, { useState } from 'react';
import {
  DataGrid,
  Flex,
  IconButton,
  StatusIndicator,
  Tabs,
  TextInput,
  Tip,
  Typography,
  Widget,
} from '@neo4j-ndl/react';
import { MagnifyingGlassIconOutline, InformationCircleIconOutline } from '@neo4j-ndl/react/icons';
import { createColumnHelper, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';

import productsData from './assets/networkimpact.json';
import NoGraphImg from '../shared/assets/NoData.png';
import Header from '../shared/components/Header';
import ConnectionModal from '../shared/components/ConnectionModal';

import './CyberSecurity.css';

type NetworkImpact = {
  Type: string;
  Name: string;
  Version: string;
  Status: string;
};

const columnHelper = createColumnHelper<NetworkImpact>();

const columns = [
  columnHelper.accessor('Type', {
    header: () => <b>Type</b>,
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('Name', {
    header: () => <b>Name</b>,
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('Version', {
    header: () => <b>Version</b>,
    cell: (info) => <i>{info.renderValue()}</i>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('Status', {
    header: () => <b>Status</b>,
    cell: (info) => (
      <>
        <StatusIndicator type={info.getValue() != 'Up' ? 'danger' : 'success'} />
        {info.getValue().startsWith('CVE') ? (
          <div className='flex flex-column'>
            CVE Detected
            <Tip>
              <Tip.Trigger>
                <InformationCircleIconOutline className='n-w-4 n-h-4 ml-2' />
              </Tip.Trigger>
              <Tip.Content>
                <Tip.Body>{info.renderValue()}</Tip.Body>
              </Tip.Content>
            </Tip>
          </div>
        ) : (
          <>{info.renderValue()}</>
        )}
      </>
    ),
    footer: (info) => info.column.id,
  }),
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchInitiated, setIsSearchInitiated] = useState(false);
  const [isSearchCompleted, setIsSearchCompleted] = useState(true);
  const network = productsData.ListItems;
  const defaultData: NetworkImpact[] = network as NetworkImpact[];
  const [data] = React.useState(() => [...defaultData]);

  const [activeTab, setActiveTab] = useState<number>(0);
  const [connectNeo4j, setConnectNeo4j] = useState(false);
  const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    isSearchInitiated ? null : setIsSearchCompleted(false);
    setIsSearchInitiated(true);
  };

  const table = useReactTable({
    data,
    columns,
    enableSorting: true,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Header
        title='NeoCyberSecurity'
        navItems={[]}
        useNeo4jConnect={true}
        connectNeo4j={connectNeo4j}
        setConnectNeo4j={setConnectNeo4j}
        openConnectionModal={() => setIsConnectionModalOpen(true)}
      />

      <div className='landing-page n-bg-palette-neutral-bg-default'>
        <form
          className={`search-bar ${isSearchInitiated ? 'top' : 'center'}`}
          onSubmit={handleSearch}
          onTransitionEnd={() => {
            setIsSearchCompleted(true);
          }}
        >
          <div className={`text-input-container ${isSearchInitiated ? 'search-initiated' : ''}`}>
            <TextInput
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search...'
              helpText='Search for server, IP, domain, etc.'
              fluid={true}
              rightIcon={
                <IconButton aria-label='Search Icon' clean size='small' className='-mt-1' type='submit'>
                  <MagnifyingGlassIconOutline className={isSearchInitiated ? 'n-w-4 n-h-4' : 'n-w-6 n-h-6'} />
                </IconButton>
              }
            />
          </div>
        </form>
        {isSearchInitiated && isSearchCompleted && (
          <Widget
            className='n-bg-palette-neutral-bg-weak min-h-[60%] min-w-[60%] flex flex-col'
            header=''
            isElevated={true}
          >
            <Flex flexDirection='column' justifyContent='space-between'>
              <div>
                <Tabs size='large' fill='underline' onChange={(e) => setActiveTab(e)} value={activeTab}>
                  <Tabs.Tab tabId={0}>Table</Tabs.Tab>
                  <Tabs.Tab tabId={1}>Graph</Tabs.Tab>
                </Tabs>
                <Flex className='p-8'>
                  {activeTab === 0 ? (
                    <DataGrid
                      isResizable={false}
                      tableInstance={table}
                      isKeyboardNavigable={false}
                      styling={{
                        zebraStriping: true,
                        borderStyle: 'none',
                        headerStyle: 'filled',
                      }}
                      components={{
                        Navigation: null,
                      }}
                    />
                  ) : (
                    <Flex flexDirection='row'>
                      <img src={NoGraphImg} className='p-12' />
                      <Flex gap='8'>
                        <Typography variant='h1'>WIP Screen</Typography>
                        <Typography variant='body-medium'>
                          <p>Ideally this would display a graph of the network/search result</p>
                          <p>
                            This would be interactive and allow user to explore the network to make a proper impact
                            analysis
                          </p>
                        </Typography>
                      </Flex>
                    </Flex>
                  )}
                </Flex>
              </div>
              <div className='text-center'>
                <>Results for "{searchQuery}"</>
              </div>
            </Flex>
          </Widget>
        )}
      </div>

      <div id='footer' className='n-bg-palette-neutral-bg-default h-[100px]' />
      <ConnectionModal
        open={isConnectionModalOpen}
        setOpenConnection={setIsConnectionModalOpen}
        setConnectionStatus={setConnectNeo4j}
        message={{
          type: 'danger',
          content:
            'The connection for this template is WIP. This will not work for now. for a working example, check the Movie template.',
        }}
      />
    </>
  );
}