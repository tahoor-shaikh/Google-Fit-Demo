import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import GoogleFit, {BucketUnit, Scopes} from 'react-native-google-fit';

const GoogleFitDemo = () => {
  useEffect(() => {
    getUserData();
  }, []);

  const getGoogleFitAuthorize = async () => {
    try {
      await GoogleFit.checkIsAuthorized();
      console.log('Is authorized :>> ', GoogleFit.isAuthorized);

      if (!GoogleFit.isAuthorized) {
        // The list of available scopes inside of src/scopes.js file
        const options = {
          scopes: [
            Scopes.FITNESS_ACTIVITY_READ,
            Scopes.FITNESS_ACTIVITY_WRITE,
            Scopes.FITNESS_BODY_READ,
            Scopes.FITNESS_BODY_WRITE,
          ],
        };
        const authResult = await GoogleFit.authorize(options);
        console.log('authResult :>> ', authResult);

        // ...
        // Call when authorized
        GoogleFit.startRecording(callback => {
          console.log('callback :>> ', callback);
          // Process data from Google Fit Recording API (no google fit app needed)
        });
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  const getUserData = async () => {
    try {
      await getGoogleFitAuthorize();
      const opt = {
        startDate: '2017-01-01T00:00:17.971Z', // required ISO8601Timestamp
        endDate: new Date().toISOString(), // required ISO8601Timestamp
        bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
        bucketInterval: 1, // optional - default 1.
      };

      console.log('opt :>> ', opt);

      const res = await GoogleFit.getDailySteps(new Date().toISOString());
      console.log('Daily steps >>> ', res);

      // shortcut functions,
      // return weekly or daily steps of given date
      // all params are optional, using new Date() without given date,
      // adjustment is 0 by default, determine the first day of week, 0 == Sunday, 1==Monday, etc.
      //   GoogleFit.getDailySteps(date).then().catch();
      //   GoogleFit.getWeeklySteps(date, adjustment).then().catch();
    } catch (error) {
      console.log('error in user data :>> ', error);
    }
  };

  return (
    <View>
      <Text>GoogleFitDemo</Text>
    </View>
  );
};

export default GoogleFitDemo;
