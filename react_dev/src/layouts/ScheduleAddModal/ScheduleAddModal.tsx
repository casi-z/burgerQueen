import {FC, ReactChild, useEffect, useState} from 'react'
import {Button, Grid, Paper, TextField} from '@mui/material'
import {useDispatch, useSelector} from "react-redux";
import {IState} from "../../types/types";
import {addScheduleAction, editScheduleAction, selectScheduleAction} from "../../store/schedulesReducer";
import {setModalNameAction} from "../../store/modalReducer";
import Modal from "../../components/Modal/Modal";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import findMaxId from "../../utils/findMaxId";
import {SCHEDULE_ADD_MODAL_NAME} from "../../data/modalNames";


interface ScheduleAddModalProps {

    children?: ReactChild,

}

interface ITextFieldData {
    label: string,
    name: string,
    required: boolean,
    defaultValue?: string,
}

const ScheduleAddModal: FC<ScheduleAddModalProps> = ({children}) => {

    const selectedSchedule = useSelector((state: IState) => state.schedules.selected)
    const schedules = useSelector((state: IState) => state.schedules.schedules)
    const isEdit = selectedSchedule !== null
    const dispatch = useDispatch()

    const [textFieldsData, setTextFieldsData] = useState<ITextFieldData[]>([
        {
            label: 'Название',
            name: 'name',
            required: true
        },

    ]);

    function setInputDefaultValues() {

        const newTextFieldsData = textFieldsData.map(input => (
            //@ts-ignore
            {...input, defaultValue: selectedSchedule[input.name]}
        ))
        setTextFieldsData(newTextFieldsData)


    }

    function handleSubmit(event: any) {

        //Здесь будет отправка на сервер введённых в форму данных

        event.preventDefault()

        const formData = new FormData(event.target);
        if (isEdit) {
            dispatch(editScheduleAction({

                id: selectedSchedule.id,
                //@ts-ignore
                name: formData.get('name')

            }))
        } else {
            dispatch(addScheduleAction({

                id: findMaxId(schedules) + 1,
                //@ts-ignore
                name: formData.get('name')

            }))
        }


        //Закрываем модалку
        dispatch(setModalNameAction(''))

        if (isEdit) {
            dispatch(selectScheduleAction(null))
        }
    }

    function handleClose() {

        //Очищаем selectedSchedule при редактировании
        if (isEdit) {
            dispatch(selectScheduleAction(null))
        }

    }

    useEffect(() => {
        if (isEdit) {
            setInputDefaultValues()
        }
    }, [selectedSchedule]);


    return (
        <Modal onClose={handleClose} onSubmit={event => handleSubmit(event)} component={'form'} width={50}
               name={SCHEDULE_ADD_MODAL_NAME}>
            <Paper>
                <SectionTitle>
                    {isEdit ? 'Редактирование' : 'Создание'} расписания
                </SectionTitle>
            </Paper>
            <Paper elevation={0} sx={{height: '100%', overflowY: 'auto'}}>

                <Grid pt={4} pl={3} pr={3} rowSpacing={3} container>
                    <Grid container rowSpacing={5} columnSpacing={4}>

                        {textFieldsData.map((element, index) => (
                            <Grid key={index} item xs={12} md={6}>

                                <TextField
                                    fullWidth
                                    {...element}
                                    variant="outlined"
                                />

                            </Grid>

                        ))}
                    </Grid>
                </Grid>

            </Paper>
            <Paper elevation={0}>

                <Grid pl={3} pt={3} pb={3} item xs={12}>

                    <Button type={"submit"} size={'large'} variant={'contained'}>
                        {isEdit ? 'Изменить' : 'Создать'}
                    </Button>
                </Grid>

            </Paper>


        </Modal>
    )
}
export default ScheduleAddModal