import React, { useState } from "react";
import { Card, EmptyState, Layout, Page } from "@shopify/polaris";

import SelectBrands from "./SelectBrands";

function LandingPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = () => {
    setFormSubmitted(true);
  };

  if (formSubmitted) {
    return <SelectBrands />;
  }

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card>
            <EmptyState
              heading="Enhance Your Store with Partner Products"
              action={{
                content: "Start Integration",
                onAction: handleSubmit, // Use handleSubmit here
              }}
              secondaryAction={{
                content: "Learn more",
                url: "https://help.shopify.com/en/manual/products/details",
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
  );
}

export default LandingPage;
