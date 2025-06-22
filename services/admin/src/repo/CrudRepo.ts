import AppError from "../utils/errors/app-error";


export class CrudRepo<T extends { id: string }> {
    private model: any;

    constructor(model: any) {
        this.model = model;
    }

    async create(data: Partial<T>) {
        try {
            const users = await this.model.create({
                data,
            });
            return users
        } catch (error) {
            throw new AppError("Failed to create records", 500);
        }
    }

    async destroy(id: string) {
        try {
            return await this.model.delete(
                {
            where: { id },
        });
        } catch (error) {
            throw new AppError("Failed to delete records", 500);
        }
    }

    async get(id: string) {
        try {
            return await this.model.findUnique({
            where: { id },
        });
        } catch (error) {
            throw new AppError("Failed to get record", 500);
        }
    }

    async getAll() {
        try {
            return await this.model.findMany();
        } catch (error) {
            throw new AppError("Failed to get records", 500);
        }
    }

    async getById(id: string) {
       try {
         return await this.model.findUnique({
            where: { id },
        });
       } catch (error) {
            throw new AppError("Failed to get record", 500);
       }
    }

    async getByEmail(email: string) {
        try {
            const users = await this.model.findUnique({
            where: { email },
        });
        
        return users;
        } catch (error) {
            throw new AppError("Failed to get record", 500);
        }
    }

    async update(id: string, data: any) {
        try {
            return await this.model.update({
                where: { id },
                data: { ...data },
            });
        } catch (error) {
            throw new AppError("Failed to update record from CrudRepo", 500);
        }
    }
}
