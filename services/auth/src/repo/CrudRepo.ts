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
            throw new AppError("Failed to create user", 500);
        }
    }

    async destroy(id: string): Promise<T> {
        return await this.model.delete({
            where: { id },
        });
    }

    async get(id: string): Promise<T | null> {
        return await this.model.findUnique({
            where: { id },
        });
    }

    async getAll(): Promise<T[]> {
        return await this.model.findMany();
    }

    async getById(id: string) {
        return await this.model.findUnique({
            where: { id },
        });
    }

    async getByEmail(email: string) {
        const users = await this.model.findUnique({
            where: { email },
        });

        return users;
    }

    async update(id: string, data: Partial<T>): Promise<T> {
        return await this.model.update({
            where: { id },
            data,
        });
    }
}
