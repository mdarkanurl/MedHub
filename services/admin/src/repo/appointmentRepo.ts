import prisma from "../prisma";
import { CrudRepo } from "./CrudRepo";

class AppointmentCrudRepo extends CrudRepo<{ id: string }> {
    constructor() {
        super(prisma.appointment);
    }
}

export default AppointmentCrudRepo;