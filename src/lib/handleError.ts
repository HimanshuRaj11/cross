
export const InternalServerError = (error: any) => {
    return ({ message: (error as Error).message, error: true })
}