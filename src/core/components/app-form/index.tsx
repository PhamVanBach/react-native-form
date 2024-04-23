import * as React from 'react';
import {useEffect} from 'react';
import {TextInput} from 'react-native';

interface Props {
  children: JSX.Element | JSX.Element[];
  register: any;
  errors: any;
  setValue: any;
}

const AppForm = ({register, errors, setValue, children}: Props) => {
  const Inputs = React.useRef<Array<TextInput>>([]);

  useEffect(() => {
    (Array.isArray(children) ? [...children] : [children]).forEach(child => {
      if (child.props?.name) {
        register(child.props.name);
      }
    });
  }, [children, register]);

  return (
    <>
      {(Array.isArray(children) ? [...children] : [children]).map(
        (child, i) => {
          return child.props.name
            ? React.createElement(child.type, {
                ...{
                  ...child.props,
                  ref: (e: TextInput) => {
                    Inputs.current[i] = e;
                  },
                  onChangeText: (v: string) =>
                    setValue(child.props.name, v, true),
                  onSubmitEditing: () => {
                    Inputs.current[i + 1]
                      ? Inputs.current[i + 1].focus()
                      : Inputs.current[i].blur();
                  },
                  //onBlur: () => triggerValidation(child.props.name),
                  blurOnSubmit: false,
                  name: child.props.name,
                  error: errors[child.props.name],
                  key: i,
                },
              })
            : child;
        },
      )}
    </>
  );
};

export default AppForm;
