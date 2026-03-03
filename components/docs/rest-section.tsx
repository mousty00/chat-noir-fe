import { SectionHeader } from "./shared/section-header";
import { EndpointCard } from "./shared/endpoint-card";

export const RestSection = () => {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
            <div id="rest-auth">
                <SectionHeader
                    title="Security"
                    description="Standard protocols for identity verification."
                />
                <div className="space-y-4">
                    <EndpointCard
                        method="POST"
                        path="/auth/login"
                        description="Authenticate and retrieve a bearer token."
                        payload={{ username: "string", pass: "string" }}
                        response={{ status: 200, success: true, data: { token: "eyJhbGci...", username: "user" } }}
                    />
                    <EndpointCard
                        method="POST"
                        path="/auth/register"
                        description="Register a new user in the system."
                        payload={{ username: "string", email: "string", pass: "string" }}
                    />
                </div>
            </div>

            <div id="rest-cats">
                <SectionHeader
                    title="Cats"
                    description="Primary endpoints for managing cat records."
                />
                <div className="space-y-4">
                    <EndpointCard
                        method="GET"
                        path="/cats"
                        description="Retrieve a list of cats from the database."
                    />
                    <EndpointCard
                        method="GET"
                        path="/cats/:id"
                        description="Fetch a specific cat by its ID."
                    />
                    <EndpointCard
                        method="POST"
                        path="/cats"
                        description="Add a new cat entry to the collection."
                        payload={{ name: "string", color: "string", categoryId: "string", sourceName: "string" }}
                    />
                    <EndpointCard
                        method="PUT"
                        path="/cats/:id"
                        description="Update core parameters for an existing record."
                        payload={{ name: "string", color: "string", categoryId: "string" }}
                    />
                    <EndpointCard
                        method="DELETE"
                        path="/cats/:id"
                        description="Remove a specific cat from the system."
                    />
                </div>
            </div>

            <div id="rest-categories">
                <SectionHeader
                    title="Categories"
                    description="Endpoints for managing cat categories."
                />
                <div className="space-y-4">
                    <EndpointCard
                        method="GET"
                        path="/categories"
                        description="List all active categories."
                    />
                    <EndpointCard
                        method="POST"
                        path="/categories"
                        description="Create a new category."
                        payload={{ name: "string", mediaTypeHint: "string" }}
                    />
                </div>
            </div>
        </div>
    );
};
