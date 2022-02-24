import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {Durationtime} from './Duration';
export type Props = {};

const Calculate: React.FC<Props> = ({}) => {
  const [result, setResult] = React.useState(Number);
  const [selectSleep, setSelectSleep] = React.useState(null);
  const [selectBed, setSelectBed] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  /**
     * 
     Calculate the percentage of duration sleep of a bed
     */
  const calculateFunction = () => {
    if (selectSleep != null && selectBed) {
      if (selectSleep > selectBed) {
        Alert.alert('Sleep time could not be greater than bed time.');
      } else {
        setIsLoading(true);
        setTimeout(() => {
          let value = (100 * selectSleep) / selectBed;
          setResult(value);
          setIsLoading(false);
        }, 2000); // two seconds
      }
    }
  };

  const resetEverything = () => {
    setSelectBed(null);
    setSelectSleep(null);
    setResult(0);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headerComtainer}>
          <Text style={styles.headerText}>Take Home Task</Text>
        </View>
        <View style={styles.dropView}>
          <Text style={styles.labelText}>{'Duration in bed'}</Text>
          {/* List shows 30 min time interval which spent Duration in bed */}
          <SelectDropdown
            data={Durationtime} //time duation list using array of object
            onSelect={(selectedItem, index) => {
              setSelectBed(selectedItem.value);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.label;
            }}
            rowTextForSelection={(item, index) => {
              return item.label;
            }}
            defaultButtonText={'Select'}
          />
        </View>

        {/* List shows 30 min time interval which spent Duration in bed */}
        <View style={styles.dropView}>
          <Text style={styles.labelText}>{'Duration asleep'}</Text>
          <SelectDropdown
            data={Durationtime} //time duation list using array of object
            onSelect={(selectedItem, index) => {
              setSelectSleep(selectedItem.value);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.label;
            }}
            rowTextForSelection={(item, index) => {
              return item.label;
            }}
            defaultButtonText={'Select'}
          />
        </View>
        <View>
          {/* after both the picker value selected by user then the TouchableOpacity(button) is enabled(Clickable) */}
          <TouchableOpacity
            onPress={() => calculateFunction()}
            disabled={selectBed == null || selectSleep == null}
            style={[
              styles.button,
              selectBed == null || selectSleep == null
                ? {backgroundColor: '#f8f8f8'}
                : {backgroundColor: '#D3D3D3'},
            ]}>
            <Text style={styles.textButton}>
              {isLoading ? 'Loading' : 'Calculate'}
            </Text>
          </TouchableOpacity>

          {result > 0 && (
            <TouchableOpacity
              onPress={() => resetEverything()}
              disabled={selectBed == null || selectSleep == null}
              style={styles.buttonReset}>
              <Text style={styles.textButton}>Reset</Text>
            </TouchableOpacity>
          )}
        </View>
        {/* Result show in a percentage to calculate using calculateFunction */}
        {result > 0 && (
          <Text style={styles.textResult}>Result: {result.toFixed(2)}%</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  headerComtainer: {
    height: 60,
    width: '100%',
    backgroundColor: '#ddd',
    justifyContent: 'center',
  },
  dropView: {
    marginTop: 56,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    marginTop: 100,
  },
  buttonReset: {
    width: 200,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#D3D3D3',
  },
  headerText: {
    fontSize: 30,
    alignSelf: 'center',
    color: '#000',
  },
  labelText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
  },
  textResult: {
    alignSelf: 'center',
    marginTop: 50,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Calculate;
