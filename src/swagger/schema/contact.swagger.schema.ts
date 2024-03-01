
export const contactDtoSchema = {

    type: "object",
    properties: {
        title: {
            type: "string",
        },
        tel: {
            type: 'string'
        },
        phone: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        alternate_email: {
            type: 'string'
        },
        address: {
            type: "string",
        },
    },

};



export const routeTags = {
    ContactRoutes: {
        name: "Contact Routes",
        description: "This is for API contact",
    },
};

export const contactRouteAnnotations = {

    post: {
        summary: "This is post request for creating data",
        tags: [routeTags.ContactRoutes.name],
        requestBody: {
            content: {
                "application/json": {
                    schema: contactDtoSchema
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
        tags: [routeTags.ContactRoutes.name],
        responses: {
            "200": {
                description: "This is successful response",
            },
        },
    },

    patch: {
        summary: "This is get request for all data",
        tags: [routeTags.ContactRoutes.name],
        responses: {
            "200": {
                description: "This is successful response",
            },
        },
    },


};