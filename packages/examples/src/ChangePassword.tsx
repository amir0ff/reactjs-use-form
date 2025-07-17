import {
  Alert,
  Button,
  Container,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  TextField,
  Typography,
  Box,
  CircularProgress,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'reactjs-use-form';
import type { ValuesType } from 'reactjs-use-form';
import './theme/styles.css';
import { formModel } from './formModel';

export function ChangePassword(): any {
  const [submitMessage, setSubmitMessage] = useState<string>('');
  
  const form = useForm(formModel, handleSubmit);

  async function handleSubmit(formValues: ValuesType) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitMessage(`Password changed successfully!`);
    console.log('Form submitted:', formValues);
  }

  const handleFormReset = () => {
    form.resetForm();
    setSubmitMessage('');
  };

  return (
    <Container maxWidth="sm">
      <Grid className="">
        <Container maxWidth="sm" className="header-container">
          <h1>useForm</h1>
          <div className="social-links">
            <a href="https://github.com/amir0ff/reactjs-use-form" target="_blank" rel="noopener noreferrer">
              <img
                alt="GitHub Repo stars"
                src="https://img.shields.io/github/stars/amir0ff/reactjs-use-form?label=GitHub&style=social"
              />
            </a>
            <a href="https://www.npmjs.com/package/reactjs-use-form" target="_blank" rel="noopener noreferrer">
              <img alt="npm" src="https://img.shields.io/npm/v/reactjs-use-form?label=NPM&style=social" />
            </a>
          </div>
          <span className="banner">
            <span>(📋, ⚙️) ⇒ ⚛️</span>
          </span>
        </Container>

        <form onSubmit={form.handleOnSubmit}>
          <FormLabel className="form-label">
            🔐 Change Your Passphrase
          </FormLabel>
          
          <FormGroup>
            <FormControl>
              <TextField
                required={true}
                label="Current Passphrase"
                type="password"
                name="currentPassphrase"
                color="primary"
                size="small"
                variant="filled"
                error={form.errors.currentPassphrase?.hasError}
                value={form.values.currentPassphrase || ''}
                onChange={form.handleOnChange}
              />
              <FormHelperText error={form.errors.currentPassphrase?.hasError}>
                {form.errors.currentPassphrase?.message}
              </FormHelperText>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormControl>
              <TextField
                required={true}
                label="New Passphrase"
                type="password"
                name="newPassphrase"
                color="primary"
                size="small"
                variant="filled"
                error={form.errors.newPassphrase?.hasError}
                value={form.values.newPassphrase || ''}
                onChange={form.handleOnChange}
              />
              <FormHelperText error={form.errors.newPassphrase?.hasError}>
                {form.errors.newPassphrase?.message}
              </FormHelperText>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormControl>
              <TextField
                required={true}
                label="Verify Passphrase"
                type="password"
                name="verifyPassphrase"
                color="primary"
                size="small"
                variant="filled"
                error={form.errors.verifyPassphrase?.hasError}
                value={form.values.verifyPassphrase || ''}
                onChange={form.handleOnChange}
              />
              <FormHelperText error={form.errors.verifyPassphrase?.hasError}>
                {form.errors.verifyPassphrase?.message}
              </FormHelperText>
            </FormControl>
          </FormGroup>
          
          {/* Form state indicators */}
          <Box sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Form State: {form.isDirty ? 'Modified' : 'Clean'} | 
              {form.isSubmitting ? ' Submitting...' : form.isSubmitted ? ' Submitted' : ' Ready'}
            </Typography>
          </Box>

          {/* Success message */}
          {(form.isSubmitted || submitMessage) && (
            <Alert variant="standard" severity="success" sx={{ my: 2 }}>
              {submitMessage || 'Form submitted successfully!'}
            </Alert>
          )}

          {/* Action buttons */}
          <Grid className="footer">
            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
              <Button 
                variant="contained" 
                size="large" 
                color="primary" 
                type="submit" 
                disabled={form.isDisabled || form.isSubmitting}
                startIcon={form.isSubmitting && <CircularProgress size={20} />}
              >
                {form.isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
              
              <Button 
                variant="outlined" 
                size="large" 
                color="secondary" 
                onClick={handleFormReset}
                disabled={form.isSubmitting}
              >
                Reset
              </Button>
            </Stack>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
}
