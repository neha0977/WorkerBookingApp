import {Text, View,SafeAreaView,ScrollView } from 'react-native'
import React from 'react'
import CommonHeader from '../components/common/CommonHeader'
import { STYLES } from '../utils/commonstyles/Style'

const ServiceDetailScreen = () => {
  return (
    <SafeAreaView style={STYLES.containerForgotpass}>
    <CommonHeader title="Detail"/>
     <ScrollView >
         <View >

         </View>
     </ScrollView>
    </SafeAreaView>
  )
}

export default ServiceDetailScreen
