import { FormLayout, Card, Text } from "@shopify/polaris";

// Define an interface for the component props
interface DonePageProps {
  selectedProducts: string[];
  selectedCharityNames: string[]; // Array of selected charity names
  donationPercentage: string;
}

function DonePage({
  selectedProducts,
  selectedCharityNames,
  donationPercentage,
}: DonePageProps) {
  return (
    <FormLayout>
      <Card>
        <div
          style={{
            textAlign: "center",
            backgroundColor: "antiquewhite",
            padding: "46px",
            maxWidth: "400px",
            margin: "0 auto",
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
                selectedProducts.map((product: string, index: number) => (
                  <li key={index}>{product}</li>
                ))}
            </ul>
            <h4>Selected Charities:</h4>
            <ul>
              {selectedCharityNames &&
                selectedCharityNames.map((charity, index) => (
                  <li key={index}>{charity}</li>
                ))}
            </ul>
            <h4>Donation Percentage:</h4>
            <p>{donationPercentage}% of your purchase will be donated.</p>
          </div>
        </div>
      </Card>
    </FormLayout>
  );
}

export default DonePage;
