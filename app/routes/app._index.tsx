import { Button, ButtonGroup, Card, Layout, Page, Text } from '@shopify/polaris'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { MONTHLY_PLAN, authenticate } from '~/shopify.server'

type Props = {}

// Styled option component (optional, for further customization)
const Option = styled.option`
  padding: 10px;
`

const Index = (props: Props) => {
  return (
    <Page>
      <Layout>
        <Text as={'h1'}>Mueshi</Text>
      </Layout>
    </Page>
  )
}

export default Index
