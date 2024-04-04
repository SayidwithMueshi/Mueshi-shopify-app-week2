import React, { useState, useEffect } from 'react'
import {
  Text,
  ResourceList,
  Avatar,
  ResourceItem,
  Card,
  Button,
  TextField,
} from '@shopify/polaris'
import { useLoaderData } from '@remix-run/react'
import { MONTHLY_PLAN, authenticate } from '~/shopify.server'
import axios from 'axios'
import type { ResourceListProps } from '@shopify/polaris'
import DonePage from './done'
import useSubmitForm from '../../hooks/useSubmitForm'

type Charity = {
  id: string
  name: string
}

type Product = {
  id: string
  title: string
  image: any
}

type SelectBrandProps = {
  charities: Charity[]
  Product: Product[]
  handleSubmitDoneForm: () => void
}

const SelectBrands: React.FC<SelectBrandProps> = ({
  charities,
  Product,
  handleSubmitDoneForm,
}) => {
  console.log(Product)

  const {
    setSelectedCharityNames,
    setDonationPercentage,
    setSelectedProducts,
    donationPercentage,
    selectedCharityNames,
    selectedProducts,
  } = useSubmitForm()

  const [selectedItems, setSelectedItems] = useState<
    ResourceListProps['selectedItems']
  >([])

  const [selectedProductItems, setSelectedProductItems] = useState<
    ResourceListProps['selectedItems']
  >([])

  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = async () => {
    const selectedItemsArray = Array.isArray(selectedItems) ? selectedItems : []
    const selectedProductsArray = Array.isArray(selectedProductItems)
      ? selectedProductItems
      : []

    console.log('selectedProductsArray')
    console.log(selectedProductsArray)

    const selectedNames = selectedItemsArray.map((selectedId) => {
      const charity = items.find((item) => item.id === selectedId)
      return {
        name: charity?.name,
        id: selectedId,
      }
    })

    const selectedProducts = selectedProductsArray.map((selectedId) => {
      console.log(selectedId)
      console.log('Product')
      console.log(Product)

      const prod = Product.find((item) => item.id === selectedId)
      return {
        title: prod?.title,
        id: selectedId,
        image: prod?.image,
      }
    })

    setSelectedCharityNames(selectedNames as Charity[]) // Update the selectedCharityNames state
    setSelectedProducts(selectedProducts as Product[])
    setFormSubmitted(true)
  }

  if (formSubmitted) {
    // This recursive call will cause an infinite loop.
    // Consider redirecting to another component or resetting form state instead.

    return (
      <DonePage
        selectedCharityNames={selectedCharityNames}
        donationPercentage={donationPercentage}
        selectedProducts={selectedProducts}
        handleSubmitDoneForm={handleSubmitDoneForm}
      />
    )
  }

  const items = charities

  console.log(Product)

  const resourceName = {
    singular: 'charity',
    plural: 'charities',
  }

  const ProductresourceName = {
    singular: 'product',
    plural: 'products',
  }

  function renderItem(item: typeof items[number]) {
    const { id, name } = item
    console.log(item)

    const media = <Avatar customer size="md" initials={name} />

    return (
      <ResourceItem
        id={id}
        url={''}
        media={media}
        accessibilityLabel={`View details for ${name}`}
      >
        <Text variant="bodyMd" fontWeight="bold" as="h3">
          {name}
        </Text>
      </ResourceItem>
    )
  }

  function renderProductItem(item: typeof Product[number]) {
    const { id, title, image } = item

    const media = <Avatar customer size="md" initials={title} />

    return (
      <ResourceItem
        id={id}
        url={image.src}
        media={media}
        accessibilityLabel={`View details for ${title}`}
      >
        <Text variant="bodyMd" fontWeight="bold" as="h3">
          {title}
        </Text>
      </ResourceItem>
    )
  }

  return (
    <div>
      {/* There is no `ui-title-bar` component in Polaris. You might want to use a heading (`<h1>`, etc.) here. */}

      <Card>
        <ResourceList
          resourceName={resourceName}
          items={items}
          renderItem={renderItem}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          selectable
        />

        <ResourceList
          resourceName={resourceName}
          items={Product}
          renderItem={renderProductItem}
          selectedItems={selectedProductItems}
          onSelectionChange={setSelectedProductItems}
          selectable
        />
      </Card>
      <Card>
        <TextField
          label="Donation Percentage to Charity"
          type="number"
          value={donationPercentage}
          onChange={(newValue) => setDonationPercentage(newValue)}
          autoComplete="off"
          prefix="%"
          helpText="Specify the percentage of your purchase you wish to donate to charity."
        />
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Button onClick={handleSubmit} variant="primary">
            Next
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default SelectBrands
