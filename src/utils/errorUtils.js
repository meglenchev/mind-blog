export function getErrorMessage(err) {
    switch (err.name) {
        case 'ValidationError': // Mongoose Error
            return Object.values(err.errors).at(0).message; 
        default:
            return err.message // Standart Error ( Throw new Error(.....))
    }
}