import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Card, Layout, List, Page, Text } from "@shopify/polaris";
import { apiVersion, authenticate } from "~/shopify.server";
import React, { useState, ChangeEvent } from "react";

import DonePage from "./done";

type Product = {
  id: string;
  title: string;
  images: {
    edges: Array<{
      node: {
        url: string;
      };
    }>;
  };
};

type ProductEdge = {
  node: Product;
};

export const query = `
{
  products(first: 5){
      edges{
          node{
              id
              handle
              title
              description
              images(first: 1) {
                edges {
                  node {
                    url
                  }
                }
              }
          }
      }
      pageInfo {
          hasNextPage
      }
  }
}

`;

export const loader: LoaderFunction = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const { shop, accessToken } = session;

  try {
    const response = await fetch(
      `https://${shop}/admin/api/${apiVersion}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/graphql",
          "X-Shopify-Access-Token": accessToken!,
        },
        body: query,
      }
    );

    if (response.ok) {
      const data = await response.json();

      const {
        data: {
          products: { edges },
        },
      } = data;
      return edges;
    }

    return null;
  } catch (err) {
    console.log(err);
  }
};

const Products = () => {
  // Specify the type of data expected from useLoaderData
  const products: ProductEdge[] = useLoaderData<ProductEdge[]>();
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleProductSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const productId = event.target.value;
    const isChecked = event.target.checked;

    setSelectedProducts((prevSelectedProducts) => {
      if (isChecked) {
        return [...prevSelectedProducts, productId];
      } else {
        return prevSelectedProducts.filter((id) => id !== productId);
      }
    });
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault(); // This line may need to be adjusted based on your actual form submission logic

    // Log selected products' details
    selectedProducts.forEach((productId) => {
      const product = products.find((product) => product.node.id === productId);
      if (product) {
        console.log(
          `Selected Product: ${product.node.title}, URL: ${product.node.images.edges[0]?.node.url}`
        );
      }
    });

    setFormSubmitted(true);
  };

  if (formSubmitted) {
    const selectedProductsInfo = selectedProducts.map((productId) => {
      const product = products.find((product) => product.node.id === productId);
      return product ? product.node.title : "Unknown Product";
    });

    // Then, in your render or return statement, instead of returning <DonePage /> alone:
    return <DonePage selectedProducts={selectedProductsInfo} />;
  }

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card>
            <List type="number" gap="loose">
              {products.map((edge) => {
                const { node: product } = edge;
                return (
                  <List.Item key={product.id}>
                    <div
                      style={{
                        transition: "box-shadow 0.3s ease",
                        cursor: "pointer",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.boxShadow =
                          "0 4px 8px rgba(0,0,0,0.2)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.boxShadow = "none")
                      }
                    >
                      <Card>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div style={{ marginRight: "20px" }}>
                            <input
                              type="checkbox"
                              id={`selectProduct-${product.id}`}
                              name="selectProduct"
                              value={product.id}
                              onChange={handleProductSelection}
                            />
                            <label
                              htmlFor={`selectProduct-${product.id}`}
                            ></label>
                          </div>
                          <div style={{ flexGrow: 1, textAlign: "center" }}>
                            <h3>
                              <Text variant="heading2xl" as="h3">
                                {product.title}
                              </Text>
                            </h3>
                          </div>
                          <div>
                            <img
                              src={product.images.edges[0]?.node.url}
                              alt={product.title}
                              style={{ width: "125px", height: "125px" }}
                            />
                          </div>
                        </div>
                      </Card>
                    </div>
                  </List.Item>
                );
              })}
            </List>
            <button onClick={handleSubmit}>Integrate</button>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Products;
