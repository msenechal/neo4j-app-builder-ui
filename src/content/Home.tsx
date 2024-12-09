import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  DataGrid,
  Dropzone,
  Flex,
  IconButton,
  Radio,
  StatusIndicator,
  Switch,
  Tabs,
  TextInput,
  Tip,
  Typography,
  Widget,
  Wizard,
} from '@neo4j-ndl/react';
import {
  MagnifyingGlassIconOutline,
  InformationCircleIconOutline,
  PlusCircleIconOutline,
} from '@neo4j-ndl/react/icons';
import Header from '../shared/components/Header';

import './AppBuilder.css';

const backendOptions = [
  {
    id: 1,
    name: 'Node.js',
    description: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
    img: './assets/nodejsLogo.png',
  },
  {
    id: 2,
    name: 'Python',
    description: 'Python is an interpreted high-level general-purpose programming language.',
    img: './assets/pythonLogo.png',
  },
  {
    id: 3,
    name: '.NET',
    description: '.NET is a free, cross-platform, open-source developer platform.',
    img: './assets/dotnetLogo.png',
  },
  {
    id: 4,
    name: 'Java',
    description: 'Java is a class-based, object-oriented programming language.',
    img: './assets/javaLogo.png',
  },
  {
    id: 5,
    name: 'Go',
    description:
      'Go is an open-source programming language that makes it easy to build simple, reliable, and efficient software.',
    img: './assets/goLogo.png',
  },
];
const frameworkOptions = [
  { id: 1, name: 'Vanilla', img: './assets/nodejs-vanilla.png', backendLanguage: 1 },
  { id: 2, name: 'AdonisJS', img: './assets/nodejs-adonisjs.png', backendLanguage: 1 },
  { id: 3, name: 'NextJS', img: './assets/nodejs-nextjs.png', backendLanguage: 1 },
  { id: 4, name: 'ExpressJS', img: './assets/nodejs-expressjs.png', backendLanguage: 1 },
  { id: 5, name: 'Flask', img: './assets/python-flask.png', backendLanguage: 2 },
  { id: 6, name: 'Django', img: './assets/python-django.png', backendLanguage: 2 },
  { id: 7, name: 'FastAPI', img: './assets/python-fastapi.png', backendLanguage: 2 },
  { id: 8, name: 'ASP.NET', img: './assets/dotnet-aspnet.png', backendLanguage: 3 },
  { id: 9, name: 'Spring', img: './assets/java-spring.png', backendLanguage: 4 },
  { id: 10, name: 'GoFiber', img: './assets/go-gofiber.png', backendLanguage: 5 },
  { id: 11, name: 'Gin', img: './assets/go-gin.png', backendLanguage: 5 },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchInitiated, setIsSearchInitiated] = useState(false);
  const [languageSelected, setLanguageSelected] = useState<number | null>(null);
  const [frameworkSelected, setFrameworkSelected] = useState<number | null>(null);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSearchInitiated(true);
  };

  const displayResult = () => {
    if (isSearchInitiated) {
      const searchResultElement = document.getElementById('search-result');
      if (searchResultElement) {
        searchResultElement.classList.add('search-result-visible');
      }
    }
  };

  const filteredFrameworkOptions = frameworkOptions.filter((option) => option.backendLanguage === languageSelected);

  return (
    <>
      <Header title='App builder' navItems={[]} useNeo4jConnect={false} userHeader={false} />

      <div className='landing-page n-bg-palette-neutral-bg-default'>
        <form className={`search-bar ${isSearchInitiated ? 'top' : 'center'}`} onSubmit={handleSearch}>
          <div
            onTransitionEnd={displayResult}
            className={`text-input-container ${isSearchInitiated ? 'search-initiated' : ''}`}
          >
            <TextInput
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Application name...'
              helpText='The name of the application you are building.'
              fluid={true}
              rightIcon={
                <IconButton aria-label='Search Icon' clean size='small' className='-mt-1' type='submit'>
                  <MagnifyingGlassIconOutline className={isSearchInitiated ? 'n-w-4 n-h-4' : 'n-w-6 n-h-6'} />
                </IconButton>
              }
            />
          </div>
        </form>
        <Widget
          className='n-bg-palette-neutral-bg-default min-h-[80%] min-w-[80%] flex flex-col search-result'
          header=''
          isElevated={true}
          id='search-result'
        >
          <Flex flexDirection='column' justifyContent='space-between'>
            <div className='p-4'>
              <div className='n-rounded-5xl n-bg-neutral n-px-token-9 n-py-token-9'>
                <Wizard
                  activeStep={1}
                  steps={[
                    'Backend',
                    'Frontend',
                    'Analytics',
                    'genAI',
                    <b key='custom-step' className='n-whitespace-nowrap'>
                      Summary
                    </b>,
                  ]}
                  type='horizontal'
                />
              </div>
              <Flex className='pt-6'>
                <div className='ml-[40%]'>
                  <Switch labelBefore checked label='Use a backend' />
                </div>
                <Typography variant='h2'>Language</Typography>
                <div className='flex flex-col items-start md:flex-row gap-2.5 py-2.5'>
                  {backendOptions.map((option, index) => (
                    <>
                      <Widget
                        className={`md:max-w-[30%] w-[20%] ${
                          languageSelected === index + 1
                            ? 'n-bg-palette-primary-bg-status'
                            : 'n-bg-palette-neutral-bg-status'
                        }`}
                        header=''
                        isElevated={true}
                        key={index}
                        onClick={() => setLanguageSelected(index + 1)}
                      >
                        <div className='flex flex-row gap-2.5 md:flex-row'>
                          <img src={option.img} alt='Product 1' className='max-w-[30%]' />
                          <Typography className='n-text-palette-neutral-text-inverse self-center' variant='h4'>
                            {option.name}
                          </Typography>
                        </div>
                      </Widget>
                    </>
                  ))}
                </div>
                {languageSelected && (
                  <>
                    <Typography variant='h2'>Framework</Typography>
                    <div className='flex flex-col items-start md:flex-row gap-2.5 py-2.5'>
                      {filteredFrameworkOptions.map((option, index) => (
                        <Widget
                        className={`md:max-w-[30%] w-[15%] ${
                          frameworkSelected === index + 1
                            ? 'n-bg-palette-primary-bg-status'
                            : 'n-bg-palette-neutral-bg-status'
                        }`}
                          header=''
                          isElevated={true}
                          key={index}
                          onClick={() => setFrameworkSelected(index + 1)}
                        >
                          <div className='flex flex-row gap-2.5 md:flex-row'>
                            
                            <Typography className='n-text-palette-neutral-text-inverse self-center' variant='h4'>
                              {option.name}
                            </Typography>
                          </div>
                        </Widget>
                      ))}
                    </div>
                    <div>
                      <Typography variant='h1' className="pb-6">Additional settings</Typography>

                      <div className='flex gap-12 pb-6'>
                        <div className='flex flex-col'>
                        <Typography variant='h4' className="pb-2">
                          Async | Sync
                        </Typography> 
                          <Radio label='Sync' />
                          <Radio label='Async' />
                        </div>
                        <div className='flex flex-col'>
                        <Typography variant='h4' className="pb-2">
                          SSO | Native
                        </Typography> 
                        <Radio label='Native' />
                        <Radio label='SSO' />
                        </div>
                        <div className='n-flex max-h-24 h-24 w-[40%]'>
                        <Dropzone
                          isTesting={false}
                          customTitle={<>Drop your env file here</>}
                          className='n-p-6 end-0 top-0 w-full h-full'
                          acceptedFileExtensions={['.txt', '.env']}
                          dropZoneOptions={{
                            onDrop: (f: Partial<globalThis.File>[]) => {
                              null;
                            },
                            maxSize: 500,
                            onDropRejected: (e) => {
                              if (e.length) {
                                // eslint-disable-next-line no-console
                                console.log(`Failed To Upload, File is larger than 500 bytes`);
                              }
                            },
                          }}
                        />
                      </div>
                      </div>

                      
                    </div>
                  </>
                )}
              </Flex>
              <div className='text-center'>
                <>
                  <Button className=''>Next</Button>
                </>
              </div>
            </div>
          </Flex>
        </Widget>
      </div>
    </>
  );
}
