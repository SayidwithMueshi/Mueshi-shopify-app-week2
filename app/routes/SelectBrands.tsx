import React, { useState } from "react";
import {
  Text,
  ResourceList,
  Avatar,
  ResourceItem,
  Card,
  Button,
  TextField,
} from "@shopify/polaris";

import type { ResourceListProps } from "@shopify/polaris";

import DonePage from "./done";

function SelectBrands() {
  // This state is now correctly placed inside the component

  const [selectedItems, setSelectedItems] = useState<
    ResourceListProps["selectedItems"]
  >([]);
  const [donationPercentage, setDonationPercentage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedCharityNames, setSelectedCharityNames] = useState<string[]>(
    []
  );

  const handleSubmit = () => {
    const selectedItemsArray = Array.isArray(selectedItems)
      ? selectedItems
      : [];
    const selectedNames = selectedItemsArray.map((selectedId) => {
      const charity = items.find((item) => item.id === selectedId);
      return charity ? charity.CharityName : "Unknown Charity";
    });

    setSelectedCharityNames(selectedNames); // Update the selectedCharityNames state
    console.log("Selected Charity Name(s):", selectedNames);
    console.log("Donation Percentage:", donationPercentage);
    setFormSubmitted(true);
  };

  if (formSubmitted) {
    // This recursive call will cause an infinite loop.
    // Consider redirecting to another component or resetting form state instead.
    return (
      <DonePage
        selectedCharityNames={selectedCharityNames}
        donationPercentage={donationPercentage}
      />
    );
  }

  const resourceName = {
    singular: "charity",
    plural: "charities",
  };

  const items = [
    {
      id: "101",
      url: "#",
      CharityName: "Red Cross Society",
    },
    {
      id: "102",
      url: "#",
      CharityName: "Shubham Sable Foundation",
    },
    {
      id: "103",
      url: "#",
      CharityName: "Blue Cross Foundation",
    },
    {
      id: "104",
      url: "#",
      CharityName: "Hero for life",
    },
  ];

  function renderItem(item: (typeof items)[number]) {
    const { id, url, CharityName } = item;
    const media = <Avatar customer size="md" initials={CharityName[0]} />;

    return (
      <ResourceItem
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${CharityName}`}
      >
        <h3>
          <Text variant="bodyMd" fontWeight="bold" as="h3">
            {CharityName}
          </Text>
        </h3>
      </ResourceItem>
    );
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
        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <Button onClick={handleSubmit} variant="primary">
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default SelectBrands;
