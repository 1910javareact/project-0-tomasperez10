import { ReimbursementDTO } from '../dtos/reimbursement-dto';
import { Reimbursement } from '../models/reimbursement';

export function reimbursementDTOtoReimbursement(rD: ReimbursementDTO[]): Reimbursement {
    const status = [];
    for (const r of rD) {
        status.push(
            r.status_id,
            r.status_decision);
    }

    const typestring = [];
    for (const r of rD) {
        typestring.push(
            r.type_id,
            r.type_name
        );
    }
    return new Reimbursement(
        rD[0].reimbursement_id,
        rD[0].author,
        rD[0].amount,
        rD[0].date_submitted,
        rD[0].date_resolved,
        rD[0].description,
        rD[0].resolver,
        rD[0].status_id,
        rD[0].type_id,
        );
    }

    export function multiReimbursementDTOConverter(rD: ReimbursementDTO[]): Reimbursement[] {
        let currentReimbursement: ReimbursementDTO[] = [];
        const result: Reimbursement[] = [];
        for (const r of rD) {
            if (currentReimbursement.length === 0) {
                currentReimbursement.push(r);
            } else if (currentReimbursement[0].reimbursement_id === r.reimbursement_id) {
                currentReimbursement.push(r);
            } else {
                result.push(reimbursementDTOtoReimbursement(currentReimbursement));
                currentReimbursement = [];
                currentReimbursement.push(r);
            }
        }
        result.push(reimbursementDTOtoReimbursement(currentReimbursement));
        return result;
    }
