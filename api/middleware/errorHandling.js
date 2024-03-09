export const errorHandling =(err ,req , res , next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "internal server ERROR";
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
}