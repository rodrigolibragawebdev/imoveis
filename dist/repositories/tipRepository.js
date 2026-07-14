import { database } from '../database/connection.js';
import { mapTip } from '../utils/rowMappers.js';
class TipRepository {
    findAll() {
        return database
            .prepare('SELECT * FROM tips ORDER BY sort_order, id')
            .all()
            .map((row) => mapTip(row));
    }
}
export const tipRepository = new TipRepository();
