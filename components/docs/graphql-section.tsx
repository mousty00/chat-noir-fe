import { SectionHeader } from "./shared/section-header";
import { OperationCard } from "./shared/operation-card";

export const GraphQlSection = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-2 duration-400 pb-20">
      <div id="gql-queries">
        <SectionHeader
          title="GraphQL Queries"
          description="Fetch deeply related data with a single request."
        />
        <div className="space-y-4">
          <OperationCard
            type="QUERY"
            name="catById"
            description="Fetch a specific cat and its category details."
            query={`query GetCat($id: ID!) {
  catById(id: $id) {
    status
    success
    data {
      id
      name
      color
      image
      sourceName
      category {
        id
        name
        mediaTypeHint
      }
    }
  }
}`}
            variables={{ id: "uuid-v4-string" }}
          />
          <OperationCard
            type="QUERY"
            name="cats"
            description="Search for cats using pagination and filters."
            query={`query GetCats($page: Int, $size: Int, $category: String, $color: String, $name: String, $source: String) {
  cats(page: $page, size: $size, category: $category, color: $color, name: $name, source: $source) {
    data {
      currentPage
      totalPages
      totalItems
      result {
        id
        name
        image
        category {
          name
        }
      }
    }
  }
}`}
            variables={{ page: 0, size: 24, category: "cyber" }}
          />
          <OperationCard
            type="QUERY"
            name="catMediaDownloadInfo"
            description="Get media download links and file information."
            query={`query GetDownloadLink($id: ID!) {
  catMediaDownloadInfo(id: $id) {
    data {
      streamUrl
      filename
      contentType
      viewable
    }
  }
}`}
            variables={{ id: "feline-media-id" }}
          />
          <OperationCard
            type="QUERY"
            name="categories"
            description="Fetch all available cat categories."
            query={`query GetCategories {
  categories {
    data {
      id
      name
      mediaTypeHint
    }
  }
}`}
          />
        </div>
      </div>

      <div id="gql-mutations">
        <SectionHeader
          title="GraphQL Mutations"
          description="Create, update, or delete data in the system."
        />
        <div className="space-y-4">
          <OperationCard
            type="MUTATION"
            name="createCat"
            description="Create a new cat entry."
            query={`mutation CreateCat($cat: CatRequest) {
  createCat(cat: $cat) {
    status
    message
    data {
      id
      name
    }
  }
}`}
            variables={{
              cat: {
                name: "Void",
                color: "Black",
                categoryId: "cyber-01",
                sourceName: "Neo_Archive"
              }
            }}
          />
          <OperationCard
            type="MUTATION"
            name="updateCat"
            description="Update an existing cat record."
            query={`mutation UpdateCat($id: ID, $cat: CatRequest) {
  updateCat(id: $id, cat: $cat) {
    success
    data {
      id
      name
    }
  }
}`}
            variables={{ id: "cat-123", cat: { name: "Void_Refined" } }}
          />
          <OperationCard
            type="MUTATION"
            name="login"
            description="Authenticate and receive a login token."
            query={`mutation Login($request: LoginRequest!) {
  login(request: $request) {
    success
    data {
      token
      username
      isAdmin
    }
  }
}`}
            variables={{ request: { username: "operative_noir", password: "••••••••" } }}
          />
          <OperationCard
            type="MUTATION"
            name="deleteCat"
            description="Permanently delete a cat from the system."
            query={`mutation Purge($id: ID!) {
  deleteCat(id: $id) {
    success
    message
  }
}`}
          />
        </div>
      </div>
    </div>
  );
};
