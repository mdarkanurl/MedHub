import { CrudRepo } from "../repo";
import { sendData } from "../utils/rabbitmq";
import AppError from "../utils/errors/app-error";
import prisma from "../prisma";
const userRepo = new CrudRepo();