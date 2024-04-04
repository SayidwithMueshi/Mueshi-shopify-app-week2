import type { ActionFunction, LoaderFunctionArgs } from '@remix-run/node'
import {
  Form,
  json,
  useActionData,
  useLoaderData,
  useSubmit,
} from '@remix-run/react'
import { Layout, Page, Text } from '@shopify/polaris'
import React, { useCallback, useEffect, useState } from 'react'
import VercelInviteUserEmail from '~/emails/custom'
import { MONTHLY_PLAN, authenticate } from '~/shopify.server'
import { getAllCharities } from '../db.server'
import CancelBtn from './app.cancelBtn'

type Props = {}

export const action: ActionFunction = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request)

  return null
}

export const loader = async ({ request }: any) => {
  const { billing, admin, session } = await authenticate.admin(request)

  await billing.require({
    plans: [MONTHLY_PLAN],
    isTest: true,
    onFailure: async () =>
      billing.request({
        plan: MONTHLY_PLAN,
        isTest: true,
      }),
  })

  const products = await admin.rest.resources.Product.all({
    session: session,
  })

  let char = await getAllCharities()
  console.log(char)

  return {
    products: products.data,
  }
}

const AtomationsPage = (props: Props) => {
  const data: any = useLoaderData()
  console.log('Atomatic data')
  console.log(data)

  const [charities, setCharities] = useState('')

  return (
    <Page>
      <Layout>
        <Text as={'h1'}>Mueshi</Text>
        <CancelBtn />
      </Layout>
    </Page>
  )
}

export default AtomationsPage
