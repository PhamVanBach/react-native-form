import * as React from 'react';
import {Alert, Button, StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useForm} from 'react-hook-form';
import AppForm from './core/components/app-form';
import AppTextInput from './core/components/app-text-input';
import validation from './core/common/validations';

export default () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: {errors},
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    Alert.alert('data', JSON.stringify(data));
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      style={{backgroundColor: '#181e34'}}>
      <View style={styles.formContainer}>
        <AppForm
          register={register}
          setValue={setValue}
          validation={validation}
          errors={errors}>
          <AppTextInput name="name" label="Name " />
          <AppTextInput name="email" label="Email" />
          <AppTextInput
            name="password"
            label="Password"
            secureTextEntry={true}
          />
          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </AppForm>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#181e34',
  },
  formContainer: {
    padding: 8,
    flex: 1,
  },
  button: {
    backgroundColor: 'red',
  },
});
