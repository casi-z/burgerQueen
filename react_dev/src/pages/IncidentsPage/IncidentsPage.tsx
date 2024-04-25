import {FC, ReactChild} from 'react'
import {Box, useTheme} from '@mui/material'
import Page from "../../components/Page/Page";


interface IncidentsPageProps {

    children?: ReactChild,

}

const IncidentsPage: FC<IncidentsPageProps> = ({children}) => {
    const theme = useTheme()


    return (
        <Box className="IncidentsPage">
            <Page>

            </Page>
        </Box>
    )
}
export default IncidentsPage