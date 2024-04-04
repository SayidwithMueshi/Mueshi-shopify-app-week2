import { FormLayout, Card, Text } from '@shopify/polaris'

type Charity = {
  id: string
  name: string
}

type Product = {
  id: string
  title: string
  image: any
}

interface DonePageProps {
  selectedProducts: Product[]
  selectedCharityNames: Charity[] // Array of selected charity names
  donationPercentage: string
  handleSubmitDoneForm: () => void
}

function DonePage({
  selectedProducts,
  selectedCharityNames,
  donationPercentage,
  handleSubmitDoneForm,
}: DonePageProps) {
  console.log(selectedCharityNames)
  console.log(selectedProducts)
  console.log(donationPercentage)

  return (
    <FormLayout>
      <Card>
        <div
          style={{
            textAlign: 'center',
            backgroundColor: 'antiquewhite',
            padding: '46px',
            maxWidth: '400px',
            margin: '0 auto',
          }}
        >
          <Text variant="heading3xl" as="h2">
            Congratulations
          </Text>
          <h3>Your Product has been successfully Integrated</h3>
          <div>
            <h4>Selected Products:</h4>
            <ul>
              {selectedProducts &&
                selectedProducts.map((product: Product, index: number) => (
                  <li key={index}>{product.title}</li>
                ))}
            </ul>
            <h4>Selected Charities:</h4>
            <ul>
              {selectedCharityNames &&
                selectedCharityNames.map((charity, index) => (
                  <li key={index}>{charity.name}</li>
                ))}
            </ul>
            <h4>Donation Percentage:</h4>
            <p>{donationPercentage}% of your purchase will be donated.</p>
          </div>
        </div>
        <button onClick={handleSubmitDoneForm}>Finish</button>
      </Card>
    </FormLayout>
  )
}

export default DonePage
