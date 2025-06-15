import prisma from "../prisma";
import { CrudRepo } from "./CrudRepo";

class EmailCrudRepo extends CrudRepo<{ id: string }> {
    constructor() {
        super(prisma.email);
    }
}

export default EmailCrudRepo;