import { handleWorkshop, type WorkshopEnv } from '../../../server/workshop-api';
export const onRequest = ({ request, env }: { request: Request; env: WorkshopEnv }) => handleWorkshop(request, env);
