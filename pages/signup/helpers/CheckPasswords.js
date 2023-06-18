import { useMemo } from 'react';
import { useFormControl } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

const CheckPasswords = ( props ) => {
  const { filled } = useFormControl() || false;

  let text = ''
  if (props.errors.passwordConfirm) {
    text = props.errors.passwordConfirm.message;
  } else if(props.password1 !== props.password2){
    text = 'Passwords do not match!'
  }

  return <FormHelperText id='error-text'>{text}</FormHelperText>;
}

export default CheckPasswords;
