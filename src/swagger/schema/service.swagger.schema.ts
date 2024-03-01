
export const serviceDtoSchema = {
    type: "object",
    properties: {
        title: {
            type: "string",
        },

        banner: {
            type: 'file'
        },
        featured_image: {
            type: 'file'
        },
        content: {
            type: "string",
        },
    },
    required: ["title"]
}



export const routeTags = {
    ServiceRoutes: {
        name: "Service Routes",
        description: "This is for API service",
    },
};

export const serviceRouteAnnotations = {

    post: {
        summary: "This is post request for creating data",
        tags: [routeTags.ServiceRoutes.name],
        requestBody: {
            content: {
                "multipart/form-data": {
                    schema: serviceDtoSchema
                }
            }
        }
        ,
        responses: {
            "200": {
                description: "This is successful response",
            },
        },
    },
    get: {
        summary: "This is get request for all data",
        tags: [routeTags.ServiceRoutes.name],
        responses: {
            "200": {
                description: "This is successful response",
            },
        },
    },
    getById: {
        tags: [routeTags.ServiceRoutes.name],
        summary: "Get service by ID",
        description: "Returns a single service",
        parameters: [
            {
                in: "path",
                name: "id",
                required: true,
                description: "ID of the service",
            }
        ],
        responses: {
            200: { description: "successful operation" },
        },

    },
    patchById: {
        tags: [routeTags.ServiceRoutes.name],
        summary: "Patch service by ID",
        description: "For updating service",
        parameters: [
            {
                in: "path",
                name: "id",
                required: true,
                description: "ID of the service",
            }
        ],
        requestBody: {
            description: "Update an existing service",
            content: {
                "multipart/form-data": {
                    schema: serviceDtoSchema
                }
            }
        },
        responses: {
            200: { description: "successful operation" },

        }
    }


};