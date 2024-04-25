import {HashRouter, Navigate, Route, Routes} from 'react-router-dom'
import mainMenuItems from "./data/MainMenuItems";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {persons as fakePersons,} from "./data/fake/persons";
import programs from "./data/fake/programs";
import {setPersonsAction} from "./store/personsReducer";
import {setStatisticAction} from "./store/statisticReducer";
import {setProgramsAction} from "./store/programsReducer";
import {setDepartmentsAction} from "./store/departmentsReducer";
import departments from "./data/fake/department";
import {setJobsAction} from "./store/jobsReducer";
import jobs from "./data/fake/jobs";
import {setSchedulesAction} from "./store/schedulesReducer";
import schedules from "./data/fake/schedules";
import Person from "./ux/Person";
import Statistic from "./ux/Statistic";
import Program from "./ux/Program";
import programGroups from "./data/fake/programGroups";
import {setProgramGroupsAction} from "./store/programGroupsReducer";
import {useTheme} from '@mui/material'


function App() {

    const theme = useTheme()
    const dispatch = useDispatch()

    function fakeFetching() {
        const persons = fakePersons.map(personData => new Person(personData))

        dispatch(setPersonsAction(persons))

        dispatch(setProgramsAction(programs.map(program => new Program(program))))

        dispatch(setProgramGroupsAction(programGroups))

        dispatch(setDepartmentsAction(departments))

        dispatch(setJobsAction(jobs))

        dispatch(setSchedulesAction(schedules))

        dispatch(setStatisticAction(new Statistic(persons)))
    }

    useEffect(() => {

        fakeFetching()

    }, []);


    return (
        <HashRouter>
            <Routes>

                <Route index element={<Navigate to="/statistic/main"/>}/>

                <Route path="statistic">
                    {mainMenuItems.statistic.map((item, index) =>
                        <Route key={index} path={item.href} element={item.page}/>
                    )}
                </Route>

                <Route path="settings">
                    {mainMenuItems.settings.map((item, index) =>
                        <Route key={index} path={item.href} element={item.page}/>
                    )}
                </Route>

                {/* Перекидываю на ошибку 404 при неправильном url */}
                {/*<Route path="*" element={<Navigate to="/error?code=404"/>}/>*/}

            </Routes>
        </HashRouter>
    )
}

export default App