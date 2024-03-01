export const courseDtoSchema = {
    type:"object",
    properties:{
        title:{
            type:"string"
        },
        description:{
            type:"string"
        },
        startDate:{
            type:"string"
        },
        endDate:{
            type:"string"
        },
        duration:{
            type:"string"
        },
        image:{
            type:"file"
        }
    }
}
export const routeTags={
    courseRoutes:{
        name:"course routes",
        description:"this is api route of course"
    }
}
export const courseRouteAnnotations = {
    get:{
        summary:"this is get route of course",
        tags:[routeTags.courseRoutes.name],
        responses:{200:{description:"get all data"}}
    },
    post:{
        summary:"this is post route of course",
        tags:[routeTags.courseRoutes.name],
        requestBody:{
            content:{
                "multipart/form-data":{
                    schema:courseDtoSchema
                }
            }
        },
        responses:{
            200:{description:"post sucessfully"}
        }
    },
    patch:{
        summary:"this is patch route for courses",
        tags:[routeTags.courseRoutes.name],
        parameters:[{
                in:"path",
                name:"id",
                description:"id of a course"      
        }],
        requestBody:{
            content:{
                "multipart/form-data":{
                    schema:courseDtoSchema
                }
            }
        },
        responses:{200:{description:"updated sucessfully"}}
    },
    softDelete:{
        summary:"this is delete rotue for courses",
        tags:[routeTags.courseRoutes.name],
        requestBody:{
            content:{
                "application/json":{
                    schema:[]
                }
            }
        },
        responses:{200:{description:"deleted successfully"}}
    },
    getDelData:{
        summary:"get deleted data route",
        tags:[routeTags.courseRoutes.name],
        responses:{200:{description:"get sucessfully"}}
    },
    restoreData:{
        summary:"restore Deleted Data",
        tags:[routeTags.courseRoutes.name],
        requestBody:{
            content:{
                "application/json":{
                    schema:[]
                }
            }
        },
        responses:{200:{discription:"restore successfully"}}
    }
}