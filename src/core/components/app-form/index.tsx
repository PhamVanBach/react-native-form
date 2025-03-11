import * as React from 'react';
import {useEffect} from 'react';
import {TextInput, View, ViewProps} from 'react-native';
import {Controller} from 'react-hook-form';
interface AppFormProps extends ViewProps {
  children: React.JSX.Element | React.JSX.Element[];
  triggerValidation: any;
  register: any;
  errors: any;
  setCurrentRefs?: any;
  control: any;
  needToTrigger?: boolean;
}

const AppForm = ({
  register,
  triggerValidation,
  children,
  control,
  needToTrigger = true,
  ...props
}: AppFormProps) => {
  const Inputs = React.useRef<Array<TextInput>>([]);

  useEffect(() => {
    (Array.isArray(children) ? [...children] : [children]).forEach(child => {
      if (child.props?.name) {
        register(child.props.name);
      }
    });
  }, [children, register]);

  return (
    <View style={props.style}>
      {(Array.isArray(children) ? [...children] : [children]).map(
        (child, index) => {
          const isController =
            React.isValidElement(child) && child.type === Controller;
          return child.props.name && !isController ? (
            <Controller
              key={`${child.props.name}-${index}`}
              name={child.props.name}
              control={control}
              rules={{required: true}}
              render={({field: {onChange, value}}) =>
                React.createElement(child.type, {
                  ...{
                    ...child.props,
                    ref: (ref: any) => {
                      Inputs.current[index] = ref;
                    },
                    value: value?.toString() || '',
                    onChangeText: onChange,
                    onSubmitEditing: () => {
                      Inputs.current[index + 1]
                        ? Inputs.current[index + 1]?.focus?.()
                        : Inputs.current[index]?.blur?.();
                    },
                    onBlur: () => {
                      Inputs.current[index]?.blur?.();
                      if (needToTrigger) {
                        triggerValidation(child.props.name);
                      }
                    },
                    blurOnSubmit: false,
                    name: child.props.name,
                  },
                })
              }
            />
          ) : (
            child
          );
        },
      )}
    </View>
  );
};

export default AppForm;
