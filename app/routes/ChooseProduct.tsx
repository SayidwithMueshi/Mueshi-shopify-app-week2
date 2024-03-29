import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Card, Layout, List, Page, Text } from "@shopify/polaris";
import { apiVersion, authenticate } from "~/shopify.server";

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

function Products() {
  const products: any = useLoaderData();
  if (!products) {
    return <div>Loading...</div>; // or any other loading state representation
  }

  console.log(products, "products");

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card>
            <List type="number" gap="loose">
              {products.map((edge: any) => {
                const { node: products } = edge;
                return (
                  <List.Item key={products.id}>
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
                              id="selectProduct"
                              name="selectProduct"
                            />
                            <label htmlFor="selectProduct"></label>
                          </div>
                          <div style={{ flexGrow: 1, textAlign: "center" }}>
                            <h3>
                              <Text variant="heading2xl" as="h3">
                                {products.title}
                              </Text>
                            </h3>
                          </div>
                          <div>
                            <img
                              src={products.images.edges[0]?.node.url}
                              alt={products.title}
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
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default Products;
