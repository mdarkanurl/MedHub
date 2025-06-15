import AppError from "../utils/errors/app-error";

export class CrudRepo<T extends { id: string }> {
    private model: any;

    constructor(model: any) {
        this.model = model;
    }

    async create(data: any) {
        try {
            const emails = await this.model.create({
                data: {
                    subject: data.subject,
                    body: data.body,
                    to: data.to,
                    from: data.from || process.env.EMAIL_FROM || "MedHub <onboarding@resend.dev>",
                }
            });
            return emails;
        } catch (error) {
            // throw new AppError("Failed to create email", 500);
            console.error("Error creating email:", error);
        }
    }

    async destroy(id: string) {
        return await this.model.delete({
            where: { id },
        });
    }

    async get(id: string) {
        return await this.model.findUnique({
            where: { id },
        });
    }

    async getAll() {
        return await this.model.findMany();
    }

    async getById(id: string) {
        return await this.model.findUnique({
            where: { id },
        });
    }

    async getByEmail(email: string) {
        return await this.model.findUnique({
            where: { email },
        });
    }

    async update(id: string, data: Partial<T>){
        return await this.model.update({
            where: { id },
            data,
        });
    }
}
