import React, { FC } from 'react'
import Head from 'next/head'

interface CustomHeadProps {
  title: string
  description?: string
  children: React.ReactNode
}

const CustomHead: FC<CustomHeadProps> = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{`${title} | Phone Book App`}</title>

        {description && (
          <meta
            name='description'
            content={description}
          />
        )}
      </Head>
      {children}
    </>
  )
}

export default CustomHead
