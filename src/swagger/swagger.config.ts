import { hackathonSchema } from './../schemavalidation';
import { adminDtoSchema, adminRouteAnnotations } from "./schema/admin.swagger.schema";
import { categoryRouteAnnotations,categoryDtoSchema } from "./schema/category.swagger.schema";
import { contactDtoSchema, contactRouteAnnotations } from "./schema/contact.swagger.schema";
import { corporateDtoSchema, corporateRouteAnnotations } from "./schema/corporate.swagger.schema";
import { courseRouteAnnotations,courseDtoSchema } from "./schema/course.swagger.schema";
import { hackathonRouteAnnotations,hackathonDtoSchema } from './schema/hackathon.swagger.schema';
import { serviceDtoSchema, serviceRouteAnnotations } from "./schema/service.swagger.schema";

export const apiDocumentation = {
    openapi: "3.0.3",


    info: {
        title: "HUBT IT CMS BACKEND",
        description: "This is Backend API documentation for HUBIT.",
        termsOfService: "http://example.com/terms/",
        contact: {
            name: "API Support",
            url: "http://www.example.com/support",
            email: "support@example.com"
        },
        license: {
            name: "Apache 2.0",
            url: "https://www.apache.org/licenses/LICENSE-2.0.html"
        },
        version: "1.0.1",

    },

    paths: {
        //category
        "/category":{
            post:categoryRouteAnnotations.post,
            get:categoryRouteAnnotations.get,
        },
        "/category/{id}":{
            patch:categoryRouteAnnotations.patch  
        },
        "/category/delete":{
            get:categoryRouteAnnotations.getDeleted,
            patch:categoryRouteAnnotations.restoreDelData,
            delete:categoryRouteAnnotations.delPermanent
        },
        "/category/deleteMany":{
            post:categoryRouteAnnotations.delete
        },
        //for courses
        "/courses":{
            get:courseRouteAnnotations.get,
            post:courseRouteAnnotations.post
        },
        "/courses/{id}":{
            patch:courseRouteAnnotations.patch,
        },
        "/courses/deleteMany":{
            delete:courseRouteAnnotations.softDelete,
            get:courseRouteAnnotations.getDelData,
            patch:courseRouteAnnotations.restoreData
        },
        "/courses/getinstructor/{id}":{},
        // For Corporates
        "/corporate/": {
            get: corporateRouteAnnotations.get,
            post: corporateRouteAnnotations.post,
        },
        "/admin/login": {
            post: adminRouteAnnotations.post
        },

        // Services
        "/services/": {
            post: serviceRouteAnnotations.post,
            get: serviceRouteAnnotations.get
        },
        "/services/{id}": {
            get: serviceRouteAnnotations.getById,
            patch: serviceRouteAnnotations.patchById
        },

        // contact
        "/contact/": {
            post: contactRouteAnnotations.post,
            get: contactRouteAnnotations.get,
            patch: contactRouteAnnotations.patch,
        },
        "/hackathon/":{
            post:hackathonRouteAnnotations.postData,
            get:hackathonRouteAnnotations.getData,
        },
        "/hackathon/delete":{
            get:hackathonRouteAnnotations.getDeletedData
        },
        "/hackathon/{id}":{
            patch:hackathonRouteAnnotations.updateData,
            post:hackathonRouteAnnotations.restoreData,
            delete:hackathonRouteAnnotations.deleteData
        },
        "/hackathon/delPer/{id}":{
            delete:hackathonRouteAnnotations.delPermanently
        },
        
    },

    components: {
        schemas: {
            categoryDtoSchema,
            corporateDtoSchema,
            adminDtoSchema,
            serviceDtoSchema,
            contactDtoSchema,
            courseDtoSchema,
            hackathonDtoSchema
        },
    },
};