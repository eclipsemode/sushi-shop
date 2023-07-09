"use client"
import React from 'react';
import {Skeleton, Stack} from "@mui/material";
import {DeviceType, selectAdaptiveServiceSlice} from "@store/features/adaptive";
import {useAppSelector} from "@store/hooks";

const Loading = () => {
    const {deviceType} = useAppSelector(selectAdaptiveServiceSlice);

    return (
        <Stack>
            <Skeleton animation='wave' sx={{
                width: '100%',
                transform: 'none',
                position: 'relative',
                aspectRatio: '10/4',
                borderRadius: '15px',
                marginBottom: '50px'
            }}/>
            <Stack direction='row' columnGap='5px' sx={{overflowX: 'hidden', paddingBottom: '5px'}}>
                {
                    [...new Array(10)].map((_, i) => (
                        <span key={i}>
                        <Skeleton variant="rectangular"
                                  animation="wave"
                                  width={130}
                                  height={69}
                                  sx={{borderRadius: '12px', transform: 'none'}}/>
                            </span>
                    ))
                }
            </Stack>
            <Stack direction={deviceType === DeviceType.MOBILE ? 'column' : 'row'} sx={{justifyContent: 'space-between', height: '150px', alignItems: 'center', margin: deviceType === DeviceType.MOBILE ? '20px 0' : '0'}}>
                <Skeleton animation="wave" width={150} height={40} sx={{transform: 'none'}}/>
                <Skeleton animation="wave" width={150} height={40} sx={{transform: 'none'}}/>
            </Stack>
            <section className="content__items">
                {[...new Array(4)].map((_, index) => (
                    <Skeleton
                        variant="rectangular"
                        width={306}
                        height={386.83}
                        animation="wave"
                        sx={{ borderRadius: '12px' }}
                        key={index}
                    />
                ))}
            </section>
        </Stack>
    )
};

export default Loading;