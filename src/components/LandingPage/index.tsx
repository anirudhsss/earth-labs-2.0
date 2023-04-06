
import { Box } from '@mui/material';
import { Container } from 'components/shared/Container';
import { Header } from 'components/shared/Header';
import { useLocation } from 'react-router-dom';
import styles from './styles.module.css';

export interface LandingPageProps {

}

export const LandingPage = ({

}: LandingPageProps) => {
    const location = useLocation();
    const landingPageLocation = location?.state?.icon === '/';
    console.log('landing page', location)
    return (
        <Container>
            <Header
                landingPageLocation={landingPageLocation}
            />

            <Box className={styles.landingPageimage}>

            </Box>
        </Container>
    )
}