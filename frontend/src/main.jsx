import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.jsx'
import { Provider } from "@/components/ui/provider"

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
)