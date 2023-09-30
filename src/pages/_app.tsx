import '@/styles/globals.css'
import React from 'react'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { client } from '@/services/api'
import { ApolloProvider } from '@apollo/client'
import styled from '@emotion/styled'

const NonSSRWrapper = (props: any) => <React.Fragment>{props.children}</React.Fragment>
const NoSSRWrapper = dynamic(() => Promise.resolve(NonSSRWrapper), {
  ssr: false,
})

export default function App({ Component, pageProps }: AppProps) {
  const Box = styled.div<JSX.IntrinsicElements['div']>`
    position: relative;
  `

  return (
    <NoSSRWrapper>
      <ApolloProvider client={client}>
        <Box>
          <Component {...pageProps} />
        </Box>
      </ApolloProvider>
    </NoSSRWrapper>
  )
}
