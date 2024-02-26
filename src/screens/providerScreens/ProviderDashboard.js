import { StyleSheet, Text, View ,SafeAreaView} from 'react-native'
import React from 'react'
import HomeHeader from "../../components/common/HomeHeader";
import { COLOR } from "../../utils/commonstyles/Color";

const ProviderDashboard = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.New_Primary }}>
       <HomeHeader />
    </SafeAreaView>
  )
}

export default ProviderDashboard

const styles = StyleSheet.create({})