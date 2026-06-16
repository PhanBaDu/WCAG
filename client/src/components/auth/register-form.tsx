'use client';

import { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Building2, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useWatch } from 'react-hook-form';
import type { FieldErrors } from 'react-hook-form';
import { z } from 'zod';
import { useRegisterMutation } from '@/hooks/use-auth';
import { RegisterRoleSelect } from '@/components/auth/register-role-select';
import { useRouter } from '@/i18n/routing';
import { FieldError } from '@/components/ui/field-error';
import { FieldRequiredIndicator } from '@/components/ui/field-required-indicator';
import { PasswordInput } from '@/components/ui/password-input';
import { cn } from '@/lib/utils';

type RegisterFormLabels = {
  role: string;
  roleNKT: string;
  roleNTD: string;
  name: string;
  email: string;
  password: string;
  confirm: string;
  benefitsTitle: string;
  benefit1: string;
  benefit2: string;
  submit: string;
  submitting: string;
  emailRequired: string;
  emailInvalid: string;
  passwordRequired: string;
  passwordWeak: string;
  confirmRequired: string;
  confirmMismatch: string;
  nameRequired: string;
  formAriaLabel: string;
  required: string;
  errorSummaryTitle: string;
  errorSummary: string;
  showPassword: string;
  hidePassword: string;
  fieldComplete: string;
};

type RegisterFormProps = {
  labels: RegisterFormLabels;
  defaultRole?: 'NKT' | 'NTD';
};

function getDescribedBy(hasError: boolean, errorId: string) {
  return hasError ? errorId : undefined;
}

export function RegisterForm({ labels, defaultRole = 'NKT' }: RegisterFormProps) {
  const router = useRouter();
  const [showValidationSummary, setShowValidationSummary] = useState(false);

  const registerSchema = useMemo(
    () =>
      z
        .object({
          role: z.enum(['NKT', 'NTD']),
          name: z.string().min(1, labels.nameRequired),
          email: z
            .string()
            .min(1, labels.emailRequired)
            .email(labels.emailInvalid),
          password: z
            .string()
            .min(1, labels.passwordRequired)
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, labels.passwordWeak),
          confirmPassword: z.string().min(1, labels.confirmRequired),
        })
        .refine((values) => values.password === values.confirmPassword, {
          message: labels.confirmMismatch,
          path: ['confirmPassword'],
        }),
    [labels]
  );

  type RegisterFormValues = z.infer<typeof registerSchema>;

  const {
    register,
    control,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitted },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      role: defaultRole,
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const role = useWatch({ control, name: 'role' });
  const name = useWatch({ control, name: 'name' });
  const email = useWatch({ control, name: 'email' });
  const password = useWatch({ control, name: 'password' });
  const confirmPassword = useWatch({ control, name: 'confirmPassword' });

  const roleComplete = registerSchema.shape.role.safeParse(role).success;
  const nameComplete = registerSchema.shape.name.safeParse(name).success;
  const emailComplete = registerSchema.shape.email.safeParse(email).success;
  const passwordComplete = registerSchema.shape.password.safeParse(password).success;
  const confirmComplete =
    registerSchema.shape.confirmPassword.safeParse(confirmPassword).success &&
    confirmPassword === password;

  const { mutate: registerUser, isPending } = useRegisterMutation();

  const onSubmit = (values: RegisterFormValues) => {
    setShowValidationSummary(false);

    registerUser(
      {
        email: values.email,
        password: values.password,
        role: values.role,
        fullName: values.role === 'NKT' ? values.name : undefined,
        companyName: values.role === 'NTD' ? values.name : undefined,
      },
      {
        onSuccess: () => {
          router.push('/jobs');
        },
      }
    );
  };

  const onInvalid = (fieldErrors: FieldErrors<RegisterFormValues>) => {
    setShowValidationSummary(true);

    if (fieldErrors.name) {
      setFocus('name');
      return;
    }

    if (fieldErrors.email) {
      setFocus('email');
      return;
    }

    if (fieldErrors.password) {
      setFocus('password');
      return;
    }

    if (fieldErrors.confirmPassword) {
      setFocus('confirmPassword');
    }
  };

  const validationSummaryId = 'register-validation-summary';
  const fieldErrors = [
    errors.name?.message,
    errors.email?.message,
    errors.password?.message,
    errors.confirmPassword?.message,
  ].filter(Boolean);
  const hasFieldErrors = fieldErrors.length > 0;

  return (
    <form
      className="space-y-4"
      noValidate
      aria-label={labels.formAriaLabel}
      onKeyDown={(event) => {
        if (event.key !== 'Enter' || event.defaultPrevented) {
          return;
        }

        const target = event.target;
        if (!(target instanceof HTMLElement)) {
          return;
        }

        if (target.tagName === 'BUTTON' && (target as HTMLButtonElement).type === 'submit') {
          return;
        }

        if (target.id === 'role' || target.getAttribute('role') === 'combobox') {
          return;
        }

        if (target.tagName === 'INPUT') {
          event.preventDefault();
        }
      }}
      onSubmit={handleSubmit(onSubmit, onInvalid)}
    >
      {showValidationSummary && isSubmitted && hasFieldErrors && (
        <div
          id={validationSummaryId}
          role="alert"
          aria-live="assertive"
          className="rounded-none border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
        >
          <p className="font-medium">{labels.errorSummaryTitle}</p>
          <p className="mt-1">{labels.errorSummary}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {errors.name?.message && <li>{errors.name.message}</li>}
            {errors.email?.message && <li>{errors.email.message}</li>}
            {errors.password?.message && <li>{errors.password.message}</li>}
            {errors.confirmPassword?.message && <li>{errors.confirmPassword.message}</li>}
          </ul>
        </div>
      )}

      <RegisterRoleSelect
        control={control}
        label={labels.role}
        roleNKT={labels.roleNKT}
        roleNTD={labels.roleNTD}
        required={labels.required}
        complete={roleComplete}
        completeLabel={labels.fieldComplete}
      />

      <div className="gov-field">
        <label htmlFor="name" className="text-sm font-medium">
          {labels.name}
          <FieldRequiredIndicator
            complete={nameComplete}
            requiredLabel={labels.required}
            completeLabel={labels.fieldComplete}
          />
        </label>
        <div className="gov-input-wrap">
          <input
            id="name"
            type="text"
            autoComplete={role === 'NKT' ? 'name' : 'organization'}
            aria-required="true"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={getDescribedBy(Boolean(errors.name), 'name-error')}
            className={cn(
              'gov-input h-12 w-full rounded-lg px-4 text-base',
              errors.name ? 'border-destructive' : undefined
            )}
            {...register('name')}
          />
        </div>
        {errors.name?.message && <FieldError id="name-error" message={errors.name.message} />}
      </div>

      <div className="gov-field">
        <label htmlFor="email" className="text-sm font-medium">
          {labels.email}
          <FieldRequiredIndicator
            complete={emailComplete}
            requiredLabel={labels.required}
            completeLabel={labels.fieldComplete}
          />
        </label>
        <div className="gov-input-wrap">
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-required="true"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={getDescribedBy(Boolean(errors.email), 'register-email-error')}
            className={cn(
              'gov-input h-12 w-full rounded-lg px-4 text-base',
              errors.email ? 'border-destructive' : undefined
            )}
            {...register('email')}
          />
        </div>
        {errors.email?.message && (
          <FieldError id="register-email-error" message={errors.email.message} />
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="gov-field">
          <label htmlFor="password" className="text-sm font-medium">
            {labels.password}
            <FieldRequiredIndicator
              complete={passwordComplete}
              requiredLabel={labels.required}
              completeLabel={labels.fieldComplete}
            />
          </label>
          <PasswordInput
            id="password"
            autoComplete="new-password"
            placeholder={labels.password}
            aria-required="true"
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby={getDescribedBy(Boolean(errors.password), 'register-password-error')}
            showPasswordLabel={labels.showPassword}
            hidePasswordLabel={labels.hidePassword}
            className={errors.password ? 'border-destructive' : undefined}
            {...register('password')}
          />
          {errors.password?.message && (
            <FieldError id="register-password-error" message={errors.password.message} />
          )}
        </div>
        <div className="gov-field">
          <label htmlFor="confirmPassword" className="text-sm font-medium">
            {labels.confirm}
            <FieldRequiredIndicator
              complete={confirmComplete}
              requiredLabel={labels.required}
              completeLabel={labels.fieldComplete}
            />
          </label>
          <PasswordInput
            id="confirmPassword"
            autoComplete="new-password"
            placeholder={labels.confirm}
            aria-required="true"
            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            aria-describedby={getDescribedBy(
              Boolean(errors.confirmPassword),
              'confirm-password-error'
            )}
            showPasswordLabel={labels.showPassword}
            hidePasswordLabel={labels.hidePassword}
            className={errors.confirmPassword ? 'border-destructive' : undefined}
            {...register('confirmPassword')}
          />
          {errors.confirmPassword?.message && (
            <FieldError id="confirm-password-error" message={errors.confirmPassword.message} />
          )}
        </div>
      </div>

      <button
        type="submit"
        className="gov-primary-button h-11 w-full text-sm font-medium"
        aria-busy={isPending}
        disabled={isPending}
      >
        {isPending ? labels.submitting : labels.submit}
      </button>

      <div className="rounded-2xl bg-muted/40 p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">{labels.benefitsTitle}</p>
        <ul className="mt-2 space-y-2">
          <li className="flex gap-2">
            <Users className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {labels.benefit1}
          </li>
          <li className="flex gap-2">
            <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {labels.benefit2}
          </li>
        </ul>
      </div>
    </form>
  );
}
