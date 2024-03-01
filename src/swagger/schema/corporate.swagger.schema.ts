
export const corporateDtoSchema = {

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

};



export const routeTags = {
    CorporateRoutes: {
        name: "Corporate Routes",
        description: "This is for API corporate",
    },
};

export const corporateRouteAnnotations = {

    post: {
        summary: "This is post request for creating data",
        tags: [routeTags.CorporateRoutes.name],
        requestBody: {
            content: {
                "multipart/form-data": {
                    schema: corporateDtoSchema
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
        tags: [routeTags.CorporateRoutes.name],
        responses: {
            "200": {
                description: "This is successful response",
            },
        },
    },


};