class AppError extends Error {
    private explanation: string;
    
    constructor(message: string, public statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.explanation = message;
    }
}

export default AppError;