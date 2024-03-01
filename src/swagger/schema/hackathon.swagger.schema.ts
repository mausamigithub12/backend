export const hackathonDtoSchema = {
    type:"object",
    properties:{
        title:{
            type:"string"
        },
        description:{
            type:"string"
        },
        dateAndTime:{
            type:"string"
        },
        location:{
            type:"string"
        },
        organizers:{
            type:"string"
        },
        image:{
            type:"file"
        },
        status:{
            type:"string"
        },
        hours:{
            type:"string"
        }

    }
}
export const routeTags={
    hackathonRoutes:{
        name:"hackathon routes",
        description:"this is api route for hackathon"
    }
}
export const hackathonRouteAnnotations={
    getData:{
        summary:"this is get route for hackathon",
        tags:[routeTags.hackathonRoutes.name],
        responses:{200:{description:"successfully get data"}}
    },
    postData:{
        summary:"this is post route for hacakthon",
        tags:[routeTags.hackathonRoutes.name],
        requestBody:{
            content:{
                "multipart/form-data":{
                    schema:hackathonDtoSchema
                }
            }
        },
        responses:{200:{description:"sucessfully save data"}}
    },
    updateData:{
        summary:"this is update route for hackathon",
        tags:[routeTags.hackathonRoutes.name],
        parameters:[{
            in:"path",
            name:"id",
            description:"id of a hackathon post"      
        }],
        requestBody:{
            content:{
                "multipart/form-data":{
                    schema:hackathonDtoSchema
                }
            }
        },
        responses:{200:{description:"sucessfully updated"}}
    },
    deleteData:{
        summary:"this delete route",
        tags:[routeTags.hackathonRoutes.name],
        parameters:[{
            in:"path",
            name:"id",
            description:"id of a hackathon post"      
        }],
        responses:{200:{description:"delete sucessfull"}}

    },
    getDeletedData:{
        summary:"get deleted data",
        tags:[routeTags.hackathonRoutes.name],
        responses:{200:{description:"get deleted data"}}
    },
    restoreData:{
        summary:"this is restore route",
        tags:[routeTags.hackathonRoutes.name],
        parameters:[{
            in:"path",
            name:"id",
            description:"id of a hackathon post"      
        }],
        responses:{200:{description:"sucessfully restore"}}
    },
    delPermanently:{
        summary:"delete data permanently",
        tags:[routeTags.hackathonRoutes.name],
        parameters:[{
            in:"path",
            name:"id",
            description:"id of a hackathon post"      
        }],
        responses:{200:{description:"delete pernmently"}}
    }
}