import {combineReducers, createStore} from "redux";
import personsReducer from "./personsReducer";
import programsReducer from "./programsReducer";
import statisticReducer from "./statisticReducer";
import modalReducer from "./modalReducer";
import departmentsReducer from "./departmentsReducer";
import jobsReducer from "./jobsReducer";
import schedulesReducer from "./schedulesReducer";
import programGroupsReducer from "./programGroupsReducer";
import themeReducer from "./themeReducer";


const rootReducer = combineReducers({
    persons: personsReducer,
    programs: programsReducer,
    departments: departmentsReducer,
    jobs: jobsReducer,
    programGroups: programGroupsReducer,
    schedules: schedulesReducer,
    statistic: statisticReducer,
    modal: modalReducer,
    theme: themeReducer,

})
export const store = createStore(rootReducer)