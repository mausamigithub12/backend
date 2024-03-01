export const categoryDtoSchema = {
    type: "object",
    properties: {
        name: {
            type: "string",
        }
    }
}
export const routeTags = {
    categoryRoutes: {
        name: "category routes",
        description: "this is Api of category"
    }
}
export const categoryRouteAnnotations = {
    post: {
        summary: "This is post route for cateogry",
        tags: [routeTags.categoryRoutes.name],
        requestBody: {
            content: {
                "application/json": {
                    schema: categoryDtoSchema
                }
            }
        },
        responses: { 200: { description: "This is successful response" } }
    },
    get: {
        summary: "This is get request for all data of category",
        tags: [routeTags.categoryRoutes.name],
        responses: { 200: { description: "this is successful response" } },
    },
    delete:{
        summary:"this is delete",
        tags:[routeTags.categoryRoutes.name],
        requestBody:{
            content:{
                "application/json":{
                    schema:[],
                }
            }
        },
        responses:{200:{description:"successfully deleted"}}
    },
    patch:{
        summary:"this is update request for category",
        tags:[routeTags.categoryRoutes.name],
        parameters:[{
            in:"path",
            name:"id",
            description:"id of category"
        }],
        requestBody:{
            content:{
                "application/json":{
                    schema:categoryDtoSchema,
                }
            }
        },
        responses:{200:{description:"successfully updated"}}
    },
    getDeleted:{
        summary:"this is get deleted data route",
        tags:[routeTags.categoryRoutes.name],
        responses:{200:{description:"successfully get data"}}
    },
    restoreDelData:{
        summary:"this is restore data",
        tags:[routeTags.categoryRoutes.name],
        requestBody:{
            content:{
                "application/json":{
                    schema:[],
                },
            }
        },
        responses:{200:{description:"successfully restore"}}
    },
    delPermanent:{
        summary:"this is delete permanent route",
        tags:[routeTags.categoryRoutes.name],
        requestBody:{
            content:{
                "application/json":{
                    schema:[],
                }
            }
        },
        responses:{
            200:{
                description:"deleted permanently"
            }
        }
    }
}