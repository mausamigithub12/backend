
export const adminDtoSchema = {

    type: "object",
    properties: {
        username: {
            type: "string",
        },
        password: {
            type: 'string'
        },
    },
    required: ["username", "password"],
};



export const routeTags = {
    AdminRoutes: {
        name: "Admin Routes",
        description: "This is for API admin",
    },
};

export const adminRouteAnnotations = {
    post: {
        summary: "This is post request for creating data",
        tags: [routeTags.AdminRoutes.name],
        requestBody: {
            content: {
                "application/json": {
                    schema: adminDtoSchema
                },
            },
        },
        responses: {
            "200": {
                description: "This is a successful response",
            },
        },
    },
    get: {
        summary: "This is get request for all data",
        tags: [routeTags.AdminRoutes.name],
        responses: {
            "200": {
                description: "This is a successful response",
            },
        },
    },
};
