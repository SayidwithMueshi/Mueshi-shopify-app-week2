import React, { useState } from 'react'
import { Card, EmptyState, Layout, Page } from '@shopify/polaris'
import { json, useLoaderData, useFetcher } from '@remix-run/react'
import type { ActionFunction } from '@remix-run/node'
import { authenticate } from '~/shopify.server'
import { getAllCharities, saveResult } from '../db.server'
import useSubmitForm from '../../hooks/useSubmitForm'

import SelectBrands from './SelectBrands'

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()

  console.log(formData)
  saveResult(formData)
  // Use formData with Prisma here

  return json({ message: 'Success' })
}

export const loader = async ({ request }: any) => {
  const { billing, admin, session } = await authenticate.admin(request)

  const products = await admin.rest.resources.Product.all({
    session: session,
  })

  console.log(products)

  let char = await getAllCharities()
  console.log(char)

  return {
    Charities: char,
    Products: products,
  }
}

function LandingPage() {
  const fetcher = useFetcher()
  const {
    selectedCharityNames,
    donationPercentage,
    selectedProducts,
  } = useSubmitForm()

  const handleSubmitDoneForm = async () => {
    console.log(selectedCharityNames)

    const Testdata = {
      name: selectedCharityNames,
      charity_id: 'fd7b30bf-90ec-42bf-872e-01949c3237c4',
      products: selectedProducts,
      percentage: donationPercentage,
    }

    fetcher.submit({ testData: JSON.stringify(Testdata) }, { method: 'post' })

    // saveResult()
  }

  const data: any = useLoaderData()
  // alert('Char')
  console.log(data)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = () => {
    setFormSubmitted(true)
  }

  if (formSubmitted) {
    return (
      <SelectBrands
        Product={data.Products.data}
        charities={data.Charities}
        handleSubmitDoneForm={handleSubmitDoneForm}
      />
    )
  }

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card>
            <EmptyState
              heading="Enhance Your Store with Partner Products"
              action={{
                content: 'Start Integration',
                onAction: handleSubmit, // Use handleSubmit here
              }}
              secondaryAction={{
                content: 'Learn more',
                url: 'https://help.shopify.com/en/manual/products/details',
              }}
              image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
            >
              <p>
                Seamlessly integrate partnered brands and products directly into
                your Shopify store. Enhance your product offerings and unlock
                new collaborative opportunities.
              </p>
            </EmptyState>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}

export default LandingPage
