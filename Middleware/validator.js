const { validationResult } = require('express-validator')

const validate = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.handler.validationError(undefined, errors.array()[0]['msg']);
    };
};

// // validationMiddleware.js

// const { validationResult,check } = require('express-validator');
// // Validation functions

// const notUndefined = async (value) => value !== undefined;
// const notNull = async (value) => value !== null;
// const isString = async (value) => {
//     if(typeof value === 'string'){
//         return true;
//     }else{
//         return `must be string`
//     }
// }
    
// const isNumber = async (value) => {
//     if(typeof value === 'number'){
//         return true;
//     }else{
//         return `must be number`
//     }
// }
// const isArrayWithNumber = async (value) => Array.isArray(value) && value.every(item => typeof item === 'number');
// const isEmail = async (value) => {
//     // Using express-validator for email validation
//     await check('email').isEmail().run({ email: value });
//     const errors = validationResult({ email: value });
//     return errors.isEmpty();
// };
// const checkForeignKeyExist = (table) => async (value) => {
//     // Implement your async logic to check if the foreign key exists in the specified table
//     return true; // Replace with your actual implementation
// };

// // Function to evaluate validation based on type
// const evaluateValidation = async (validation, value, fieldName) => {
//     try {
//         let checkErrorOccured =  await validation(value);
//         if(checkErrorOccured!=true){
//             return `Validation Error: ${fieldName} ${checkErrorOccured}`
//         }else{
//             return true;
//         }
//     } catch (error) {
//         throw new Error(`Validation failed for ${fieldName}: ${error.message}`);
//     }
// };

// // Generate middleware functions based on dynamic fields
// const generateMiddlewareForField = (field) => {
//     const { fieldName, checkValidations, objectItems } = field;

//     // Generate middleware for the field
//     const fieldMiddleware = async (req, res, next) => {
//         const fieldValue = req.body[fieldName];

//         // Check validations for the field using Promise.all for parallel validation
//         try {
//             let checkError = await Promise.all(checkValidations.map(validation => evaluateValidation(validation, fieldValue, fieldName)));
            
//             await checkError?.filter(errorData => errorData!=true)?.map(data => {
//                 res.handler.validationError(undefined, data);
//                 return;
//             })
//         } catch (error) {
//             res.handler.validationError(undefined, { error: error.message });
//             return;
//         }

//         // Check validations for objectItems if present
//         if (objectItems && Array.isArray(fieldValue)) {
//             for (const item of objectItems) {
//                 const itemValue = fieldValue[item.id];

//                 // Check validations for the object item using Promise.all for parallel validation
//                 try {
//                     await Promise.all(item.checkValidations.map(validation => evaluateValidation(validation, itemValue, item.id)));
//                 } catch (error) {
//                     res.handler.validationError(undefined, { error: error.message });
//                     return;
//                 }
//             }
//         }

//         next();
//     };

//     return fieldMiddleware;
// };

// // Generate middleware array for dynamic fields
// const generateMiddlewareForFields = (fields) => {
//     return fields.map(generateMiddlewareForField);
// };

// module.exports = {
//     generateMiddlewareForFields,
//     notUndefined,
//     notNull,
//     isString,
//     isNumber,
//     isArrayWithNumber,
//     isEmail
// };
module.exports = {validate};