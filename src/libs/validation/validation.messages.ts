export const DefaultValidationMessages = {
    minLength: (field: string, value: number) => `${field}, should be min length: ${value}`,
    maxLength: (field: string, value: number) => `${field}, should be max length: ${value}`,
    isNotEmpty: (field: string) => `${field} should'd is not empty`,
    isNumber: (field: string) => `${field} should be type a Number`,
    isUUID: (field: string) => `${field} should be a UUID type`,
    isArrayString: (field: string) => `${field} should be a ['string']`
}