import prisma from "../prisma";
import { CrudRepo } from "./CrudRepo";

class DoctorCrudRepo extends CrudRepo<{ id: string }> {
    constructor() {
        super(prisma.doctor);
    }
}

export default DoctorCrudRepo;