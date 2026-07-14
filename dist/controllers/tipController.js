import { tipRepository } from '../repositories/tipRepository.js';
class TipController {
    list(_request, response) {
        response.json(tipRepository.findAll());
    }
}
export const tipController = new TipController();
