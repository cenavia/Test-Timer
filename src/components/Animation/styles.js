import styled from 'styled-components'

/*VIBRADOR*/
/*Efecto de vibración, jugando con el desplazamiento en X e Y*/

export const VibracionAnimation = styled.div`
    margin-top: 2em;
    animation: vibracion 1s infinite;
    @keyframes vibracion{
        10%, 30%, 50%, 70%, 90% {
        transform: translateX(-10px);
        }
        20%, 40%, 60%, 80%{
        transform: translateX(10px);
        }
        5%, 25%, 45%, 65%, 85% {
        transform: translateY(-10px);
        }
        15%, 35%, 55%, 75%{
        transform: translateY(10px);
        }    
    }
`;


