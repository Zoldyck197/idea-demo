import * as React from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Navigate } from 'react-native';
import { Color, Border, FontFamily } from '../GlobalStyles';

export default function OtpVerification({ onNext, onBack }) {

  const handleVerifyPress = () => {
    console.log('Verify button pressed');
    onNext();
  };

  const handleBackPress = () => {
    onBack();
  };

  return (
    <View style={styles.verifyForgotPasswordEmai}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Image
          style={styles.backArrow}
          resizeMode="cover"
          source={require('../assets/Group39.png')} // Replace with your back arrow image
        />
      </TouchableOpacity>
      
      <View style={[styles.verifyForgotPasswordEmaiChild, styles.childPosition]} />
      
      <Text style={[styles.verifyYourEmail, styles.verifyFlexBox]}>
        Verify your email
      </Text>
      <Text style={[styles.pleaseEnterThe, styles.pleaseEnterTheFlexBox]}>
        Please Enter The 4 Digit Code Sent To lamaelmor@gmail.com
      </Text>
      
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputBox} keyboardType="numeric" maxLength={1} />
        <TextInput style={styles.inputBox} keyboardType="numeric" maxLength={1} />
        <TextInput style={styles.inputBox} keyboardType="numeric" maxLength={1} />
        <TextInput style={styles.inputBox} keyboardType="numeric" maxLength={1} />
      </View>
      
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyPress}>
        <View style={styles.verifyButtonContent}>
          <Text style={styles.verify}>Verify</Text>
        </View>
      </TouchableOpacity>
      
      <Text style={[styles.didntReceiveOtpContainer, styles.pleaseEnterTheFlexBox]}>
        <Text style={styles.didntReceiveOtpContainer1}>
          <Text style={styles.didntReceiveOtp}>{`Didn't receive OTP? `}</Text>
          <Text style={[styles.resendCode, styles.resendCodeTypo]}>
            Resend code
          </Text>
        </Text>
      </Text>
      
      <View style={[styles.vectorParent, styles.groupChildLayout]}>
        <Image
          style={[styles.groupChild, styles.groupChildLayout]}
          resizeMode="cover"
          source={require('../assets/Ellipse6.png')}
        />
        <Image
          style={styles.screenshot20240723At1055}
          resizeMode="cover"
          source={require('../assets/mobile.png')}
        />
      </View>
      
   
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
  },
  backArrow: {
    // width: 24,
    // height: 24,
    top: 35,
    left: 10,
    width: 44,
    height: 41,
    position: 'absolute',
  },
  childPosition: {
    left: 0,
    top: 0,
  },
  verifyFlexBox: {
    alignItems: 'center',
    display: 'flex',
    textAlign: 'center',
    color: Color.colorWhite,
    justifyContent: 'center',
    position: 'absolute',
  },
  pleaseEnterTheFlexBox: {
    height: 44,
    color: Color.colorBlack,
    alignItems: 'center',
    display: 'flex',
    textAlign: 'center',
    position: 'absolute',
  },
  verifyShadowBox: {
    height: 65,
    width: 50,
    backgroundColor: Color.colorWhitesmoke,
    borderRadius: Border.br_mini,
    top: 637,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    position: 'absolute',
  },
  verifyChildPosition: {
    top: 670,
    width: 17,
    maxHeight: '100%',
    position: 'absolute',
  },
  resendCodeTypo: {
    fontFamily: FontFamily.signikaBold,
    fontWeight: '700',
  },
  groupChildLayout: {
    height: 245,
    width: 253,
    position: 'absolute',
  },
  verifyForgotPasswordEmaiChild: {
    borderBottomRightRadius: Border.br_36xl,
    borderBottomLeftRadius: Border.br_36xl,
    backgroundColor: '#163696',
    width: 430,
    height: 220,
    position: 'absolute',
  },
  verifyYourEmail: {
    top: 102,
    left: 23,
    fontSize: 30,
    fontFamily: FontFamily.bitterBold,
    width: 303,
    height: 50,
    justifyContent: 'center',
    fontWeight: '700',
    display: 'flex',
    textAlign: 'center',
    color: Color.colorWhite,
  },
  pleaseEnterThe: {
    top: 550,
    left: 43,
    fontSize: 23,
    width: 345,
    fontFamily: FontFamily.signikaBold,
    fontWeight: '700',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
    width: '80%',
  },
  inputBox: {
    width: 50,
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    borderColor: '#dcdcdc',
    borderWidth: 1,
    top: 600,
    left: 40,
  },
  verifyForgotPasswordEmaiItem: {
    left: 54,
  },
  verifyForgotPasswordEmaiInner: {
    left: 142,
  },
  rectangleView: {
    left: 230,
  },
  verifyForgotPasswordEmaiChild1: {
    left: 318,
  },
  lineIcon: {
    top: 671,
    left: 115,
    width: 17,
    maxHeight: '100%',
    position: 'absolute',
  },
  verifyForgotPasswordEmaiChild2: {
    left: 291,
  },
  verifyForgotPasswordEmaiChild3: {
    left: 203,
  },
  verifyForgotPasswordEmaiChild4: {
    top: 755,
    left: 50,
    borderRadius: 35,
    backgroundColor: '#0029a4',
    borderStyle: 'solid',
    borderColor: Color.colorWhite,
    borderWidth: 1,
    width: 333,
    height: 55,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    position: 'absolute',
  },
  verifyButton: {
    top: 766,
    left: 45,
    width: 333,
    height: 55,
    borderRadius: 35,
    backgroundColor: '#0029a4',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    position: 'absolute',
  },
  verifyButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  verify: {
    fontSize: 25,
    fontWeight: '600',
    fontFamily: FontFamily.signikaSemiBold,
    color: Color.colorWhite,
  },
  didntReceiveOtp: {
    fontWeight: '300',
    fontFamily: FontFamily.signikaLight,
  },
  resendCode: {
    textDecoration: 'underline',
  },
  didntReceiveOtpContainer1: {
    width: '100%',
  },
  didntReceiveOtpContainer: {
    top: 870,
    left: 82,
    fontSize: 20,
    width: 277,
  },
  groupChild: {
    left: 0,
    top: 0,
  },
  screenshot20240723At1055: {
    top: 19,
    left: 35,
    width: 173,
    height: 207,
    position: 'absolute',
  },
  vectorParent: {
    top: 255,
    left: 89,
  },
 
  verifyForgotPasswordEmai: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    height: 932,
    overflow: 'hidden',
    width: '100%',
  },
});