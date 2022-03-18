import {
  Button,
  Container,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  TextField,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useForm, ValuesType } from 'reactjs-use-form';
import './theme/styles.css';
import { formModel } from './formModel';


export function ChangePassword(): any {
  const { values, errors, handleOnChange, handleOnSubmit, isSubmitted, isDisabled } = useForm(formModel, handleSubmit);
  const { currentPassphrase, newPassphrase, verifyPassphrase }: ValuesType = values;

  function handleSubmit() {
    // formSubmitCallback();
  }

  return (
    <Container maxWidth='xs'>
      <Grid className=''>
        <Container maxWidth='xs' className='header-container'>
          <h1>useForm</h1>
          <div className='social-links'>
            <a href='https://github.com/amir0ff/reactjs-use-form' target='_blank'>
              <img alt='GitHub Repo stars'
                   src='https://img.shields.io/github/stars/amir0ff/reactjs-use-form?label=GitHub&style=social' />
            </a>
            <a href='https://www.npmjs.com/package/reactjs-use-form' target='_blank'>
              <img alt='npm' src='https://img.shields.io/npm/v/reactjs-use-form?label=NPM&style=social' />
            </a>
          </div>
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
                onChange={handleOnChange} />
              <FormHelperText
                error={errors.currentPassphrase.hasError}>{errors.currentPassphrase.message}
              </FormHelperText>
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
          {isSubmitted ? <Alert variant='standard' severity='success' action='Passphrase has been changed!' /> : null}
          <Grid className='footer'>
            <Button
              variant='contained'
              size='large'
              color='secondary'
              type='submit'
              disabled={isDisabled}>
              Submit
            </Button>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
}
