import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid2";
import Lottie from "react-lottie-player";
import lottiejson from '/public/mainpage.json'
import styles from './mainpage.module.css'
import { useRouter } from 'next/router';

export default function Mainpage(){
    const router = useRouter();
    const handleClick = () => {
        router.push('/about-me');
    };
    return(
        <>
            
            <Grid container spacing={10}>
                <Grid size={4}>
                    <div className={styles.introduce}>
                        <h2 style={{fontSize:35}}>안녕하세요</h2>
                        <p>
                            제 이름은 허보영입니다. 현재 충주 상업고등학교에 재학 중이다 
                            미래에 부자가 되는 것을 목표로 하고 있습니다.
                            저는 새로운 것들을 배우고 성장하는 것을 중요하게 생각합니다. 
                            앞으로도 역량을 키우기 위해 노력할 것입니다.
                        </p>
                        <Button variant="contained" onClick={handleClick}>프로젝트 보러가기</Button>
                    </div>
                </Grid>
                <Grid size={7}>
                    <div>
                        <Lottie
                            loop
                            animationData={lottiejson}
                            play
                        />
                    </div>
                </Grid>
            </Grid>
        </>
    )
}