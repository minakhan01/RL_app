import { PastTypes } from "../types";

export const addMinute = () => ({
    type: PastTypes.ADD_MINUTE,
    payload: {},
});

export const addIntervalBreak = () => ({
    type: PastTypes.ADD_INTERVAL_BREAK,
    payload: {},
});


export const backupAWData = (dat) => ({
    type: PastTypes.BACKUP_AW_DATA,
    payload: dat,
});

export const saveBreakData = (dat) => ({
    type: PastTypes.SAVE_BREAK_DATA,
    payload: dat,
});