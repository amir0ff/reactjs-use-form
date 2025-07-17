import { useState } from 'react';
import { useForm } from 'reactjs-use-form';
import type { ValuesType } from 'reactjs-use-form';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Alert, AlertDescription } from './components/ui/alert';
import { ModeToggle } from './components/mode-toggle';
import { Loader2, CheckCircle, RotateCcw } from 'lucide-react';
import './theme/styles.css';
import { formModel } from './formModel';

export function ChangePassword(): any {
  const [submitMessage, setSubmitMessage] = useState<string>('');
  
  const form = useForm(formModel, handleSubmit);

  async function handleSubmit(formValues: ValuesType) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitMessage(`Your passphrase has been updated successfully!`);
    console.log('Form submitted:', formValues);
  }

  const handleFormReset = () => {
    form.resetForm();
    setSubmitMessage('');
    // You could add a brief reset confirmation message here if desired
    // setSubmitMessage('Form has been reset to initial values');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <div className="relative">
          <div className="header-container">
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
          </div>

          {/* Theme Toggle */}
          <div className="absolute top-0 right-0">
            <ModeToggle />
          </div>

          <div className="mt-8 rounded-lg border bg-card p-6 shadow-sm">
            <form onSubmit={form.handleOnSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-lg font-semibold text-foreground flex items-center gap-2">
                  🔐 Security Settings
                </Label>
                <p className="text-sm text-muted-foreground">
                  Keep your account secure with a strong passphrase
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassphrase" className="text-sm font-medium">
                    Current Passphrase
                  </Label>
                  <Input
                    id="currentPassphrase"
                    name="currentPassphrase"
                    type="password"
                    placeholder="••••••••"
                    required
                    className={form.errors.currentPassphrase?.hasError ? 'border-destructive focus-visible:ring-destructive' : ''}
                    value={form.values.currentPassphrase || ''}
                    onChange={form.handleOnChange}
                  />
                  {form.errors.currentPassphrase?.hasError && (
                    <p className="text-sm text-destructive font-medium">
                      {form.errors.currentPassphrase?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassphrase" className="text-sm font-medium">
                    New Passphrase
                  </Label>
                  <Input
                    id="newPassphrase"
                    name="newPassphrase"
                    type="password"
                    placeholder="••••••••"
                    required
                    className={form.errors.newPassphrase?.hasError ? 'border-destructive focus-visible:ring-destructive' : ''}
                    value={form.values.newPassphrase || ''}
                    onChange={form.handleOnChange}
                  />
                  {form.errors.newPassphrase?.hasError && (
                    <p className="text-sm text-destructive font-medium">
                      {form.errors.newPassphrase?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="verifyPassphrase" className="text-sm font-medium">
                    Confirm New Passphrase
                  </Label>
                  <Input
                    id="verifyPassphrase"
                    name="verifyPassphrase"
                    type="password"
                    placeholder="••••••••"
                    required
                    className={form.errors.verifyPassphrase?.hasError ? 'border-destructive focus-visible:ring-destructive' : ''}
                    value={form.values.verifyPassphrase || ''}
                    onChange={form.handleOnChange}
                  />
                  {form.errors.verifyPassphrase?.hasError && (
                    <p className="text-sm text-destructive font-medium">
                      {form.errors.verifyPassphrase?.message}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Form state indicators */}
              <div className="rounded-md bg-muted/50 p-3 space-y-2">
                <h4 className="text-sm font-medium text-foreground">Form State</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${form.isDirty ? 'bg-amber-500' : 'bg-gray-300'}`} />
                    <span className="text-muted-foreground">Dirty: {form.isDirty ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${form.isDisabled ? 'bg-red-500' : 'bg-green-500'}`} />
                    <span className="text-muted-foreground">Disabled: {form.isDisabled ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${form.isSubmitting ? 'bg-blue-500' : 'bg-gray-300'}`} />
                    <span className="text-muted-foreground">Submitting: {form.isSubmitting ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${form.isSubmitted ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className="text-muted-foreground">Submitted: {form.isSubmitted ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>

              {/* Success message */}
              {(form.isSubmitted || submitMessage) && (
                <Alert variant="success">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    {submitMessage || 'Your passphrase has been updated successfully!'}
                  </AlertDescription>
                </Alert>
              )}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={form.isDisabled || form.isSubmitting}
                  className="flex-1 sm:flex-none min-w-[140px]"
                >
                  {form.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Submit'
                  )}
                </Button>
                
                <Button 
                  type="button"
                  variant="outline"
                  size="lg" 
                  onClick={handleFormReset}
                  disabled={form.isSubmitting || (!form.isDirty && !submitMessage)}
                  className="flex-1 sm:flex-none min-w-[140px]"
                  title="Reset all form fields to their initial values"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset Form
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
