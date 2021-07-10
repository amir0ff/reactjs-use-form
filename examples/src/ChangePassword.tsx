import { useEffect, useRef } from 'react';

import {
  Button,
  Container,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  TextField,
} from '@material-ui/core/';
import { Alert } from '@material-ui/lab';
import { useForm, ValuesType } from 'reactjs-use-form';
import './theme/styles.css';
import { formModel } from './formModel';


export function ChangePassword(): any {
  const passwordInputRef = useRef<any>(null);
  const { values, errors, handleOnChange, handleOnSubmit, isSubmitted, isDisabled } = useForm(formModel, handleSave);
  const { currentPassphrase, newPassphrase, verifyPassphrase }: ValuesType = values;

  useEffect(() => {
    if (passwordInputRef.current) passwordInputRef.current.focus();
  }, []);


  function handleSave() {
    // save changes
  }


  return (
    <Container maxWidth='xs'>
      <Grid className=''>
        <Container maxWidth='xs'>
          <h1>useForm</h1>
          <span className='banner'><span>(📋, ⚙️) ⇒ ⚛️</span></span>
        </Container>
        <form onSubmit={handleOnSubmit}>
          <FormLabel className='form-label'>🔐 Change your passphrase</FormLabel>
          <FormGroup>
            <FormControl>
              <TextField
                required={true}
                label='Current Passphrase'
                type='password'
                name='currentPassphrase'
                color='primary'
                size='small'
                variant='filled'
                error={errors.currentPassphrase.hasError}
                value={currentPassphrase}
                onChange={handleOnChange}
                ref={passwordInputRef} />
              <FormHelperText
                error={errors.currentPassphrase.hasError}>{errors.currentPassphrase.message}</FormHelperText>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormControl>
              <TextField
                required={true}
                label='New Passphrase'
                type='password'
                name='newPassphrase'
                color='primary'
                size='small'
                variant='filled'
                error={errors.newPassphrase.hasError}
                value={newPassphrase}
                onChange={handleOnChange} />
              <FormHelperText error={errors.newPassphrase.hasError}>{errors.newPassphrase.message}</FormHelperText>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormControl>
              <TextField
                required={true}
                label='Verify Passphrase'
                type='password'
                name='verifyPassphrase'
                color='primary'
                size='small'
                variant='filled'
                error={errors.verifyPassphrase.hasError}
                value={verifyPassphrase}
                onChange={handleOnChange} />
              <FormHelperText error={errors.verifyPassphrase.hasError}>
                {errors.verifyPassphrase.message}
              </FormHelperText>
            </FormControl>
          </FormGroup>
          {isSubmitted ? <Alert variant='standard' severity='success' action='Password changed!' /> : null}
          <Grid className='footer'>
            <Button
              variant='contained'
              size='large'
              color='secondary'
              type='submit'
              disabled={isDisabled}>
              <span>Save Changes</span>
            </Button>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
}
