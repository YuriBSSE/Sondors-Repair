import React, { useEffect } from "react";
import { SafeAreaView, View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useTailwind } from "tailwind-rn";
import Button from "../common/Button";
import Divider from "components/common/Divider";
import Text from "../common/Text";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import Colors from "styles/Colors";
import { useAtom } from 'jotai';
import workingDays from "../../atoms/hours";
import moment from 'moment'

type CustomDateTimePickerProps = {
    value: string,
    marginRight?: number,
    marginLeft?: number,
    name: string,
    getHours?: (name: string, value: any) => void
    isEdit?: boolean,
    workingDaysFromDB?: any
}


type DaysProps = {
    getDays?: (value: any) => void
    isEdit?: boolean,
    workingDaysFromDB?: any
    daysValue?: any
}

type DaysTimePickerProps = {
    DaysTimePickerClasses?: string,
    setWorkingDaysHours?: (value: any) => void
    isEdit?: boolean,
    workingDaysFromDB?: any
    daysValue?: any
}

export const Days = ({ getDays, daysValue, isEdit }: DaysProps) => {
    const tailwind = useTailwind()
    const [days, setDays] = useState<any>([
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
      ])

      useEffect(() => {
          if(isEdit){
            setDays(daysValue)  
          }
      }, [])

    const onHandleDays = async (day: string) => {
        const isDay = await days.includes(day)
        if (!isDay) setDays([...days, day])
        const removeFromDays = await days.filter((d: string) => d !== day)
        if (isDay) setDays(removeFromDays)
    }

    useEffect(() => {
        getDays && getDays({
            days,
            startDay: days[0],
            endDay: days[days.length - 1],
        })
    }, [days])



    return (
        <View style={tailwind('flex flex-row justify-between')}>
            <Button containerPaddingVoid
                onPress={() => onHandleDays('sunday')}
                style={{ height: 36, width: 36, padding: 0, borderRadius: 36 }}
                md accent={!days.includes('sunday')} title="S"
            />
            <Button containerPaddingVoid
                onPress={() => onHandleDays('monday')}
                style={{ height: 36, width: 36, padding: 0, borderRadius: 36 }}
                md accent={!days.includes('monday')} title="M"
            />
            <Button containerPaddingVoid
                onPress={() => onHandleDays('tuesday')}
                style={{ height: 36, width: 36, padding: 0, borderRadius: 36 }}
                md accent={!days.includes('tuesday')} title="T"
            />
            <Button containerPaddingVoid
                onPress={() => onHandleDays('wednesday')}
                style={{ height: 36, width: 36, padding: 0, borderRadius: 36 }}
                md accent={!days.includes('wednesday')} title="W"
            />
            <Button containerPaddingVoid
                onPress={() => onHandleDays('thursday')}
                style={{ height: 36, width: 36, padding: 0, borderRadius: 36 }}
                md accent={!days.includes('thursday')} title="T"
            />
            <Button containerPaddingVoid
                onPress={() => onHandleDays('friday')}
                style={{ height: 36, width: 36, padding: 0, borderRadius: 36 }}
                md accent={!days.includes('friday')} title="F"
            />
            <Button containerPaddingVoid
                onPress={() => onHandleDays('saturday')}
                style={{ height: 36, width: 36, padding: 0, borderRadius: 36 }}
                md accent={!days.includes('saturday')} title="S"
            />
        </View>
    )
}

export const CustomDateTimePicker = ({ marginRight, marginLeft, getHours, name, value, isEdit }: CustomDateTimePickerProps) => {
    const tailwind = useTailwind()

    const [show, setShow] = useState<boolean>(false)

    const handelOnchangeTimePicker = (event: any) => {
        console.log('event', event)
        if (event.type === "dismissed") setShow(false)
        if (event.type === "set") {
            setShow(false)
            getHours && getHours(name, event.nativeEvent.timestamp)
        }
    }

    return (
        <SafeAreaView style={tailwind('flex flex-row')}>
            <TouchableOpacity onPress={() => setShow(true)} style={{ ...styles.timerBtn, marginRight, marginLeft }}>
                <Text md tertiary>{moment(value || '2022-05-06T00:00:00.448Z').format('LT')}</Text>
            </TouchableOpacity>
            {show && <DateTimePicker testID='timePicker' value={isEdit ? new Date(value) : new Date()} mode='time' onChange={handelOnchangeTimePicker} />}
        </SafeAreaView>
    )
}


export const DaysTimePicker = ({ DaysTimePickerClasses, setWorkingDaysHours, workingDaysFromDB, isEdit }: DaysTimePickerProps) => {
    const tailwind = useTailwind()

    

    const [hours, setHours] = useState({
            endHour: "2022-05-06T15:00:58.091Z",
            startHour: "2022-05-06T04:00:08.465Z",
        })

    const [checkEditedKey, setCheckEditedKey] = useState(false)

    const getHours = (name: string, value?: any): void => {
        setHours({ ...hours, [name]: value.toString() })
      
    }

    const getDays = (days?: any) => {
        setHours({
            ...hours,
            ...days,
        })
    }

    useEffect(() => {
        if(isEdit) return setHours({
            endHour: workingDaysFromDB?.endHour,
            startHour: workingDaysFromDB?.startHour
        })
    }, [])

    useEffect(() => {
        setWorkingDaysHours && setWorkingDaysHours(hours)
    }, [hours])

    return (
        <View style={tailwind(`${DaysTimePickerClasses}`)}>
            <Days getDays={getDays} isEdit={isEdit} daysValue={workingDaysFromDB?.days}  />
            <View style={{ ...tailwind('mt-4 flex flex-row items-center') }}>
                <CustomDateTimePicker isEdit={isEdit}  value={hours?.startHour} name={'startHour'} getHours={getHours} marginRight={8} />
                <Divider />
                <CustomDateTimePicker isEdit={isEdit} value={hours?.endHour} name={'endHour'} getHours={getHours} marginLeft={8} />
            </View>
        </View>
    )
}

CustomDateTimePicker.defaultProps = {
    marginRight: 0,
    marginLeft: 0
}

const styles = StyleSheet.create({
    timerBtn: {
        height: 44,
        width: 96,
        borderColor: Colors.inputBorder,
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 12,
        paddingTop: 12,
        borderRadius: 2,
    }
})