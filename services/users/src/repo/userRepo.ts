import prisma from "../prisma";
import { CrudRepo } from "./CrudRepo";

class UserCrudRepo extends CrudRepo<{ id: string }> {
    constructor() {
        super(prisma.user);
    }
}

export default UserCrudRepo;